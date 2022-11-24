// ./src/pages/[id].tsx
import withTransition from 'src/client/HOC/withTransition';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { fetch } from 'src/shared/utils/fetch';
import Layout from 'src/client/layouts/dashboard';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import AccreditationListItems from '../../client/components/AccreditationListItems';
import { UserDataContext } from 'src/client/ssr/userData';

const notifyLoading = () => toast.loading('Procesando...');
const notifySuccess = (msg) => {
  toast.remove();
  toast.success(msg);
};
const notifyError = (msg) => {
  toast.remove();
  toast.error(msg);
};

const Accreditation = ({ accreditation, userData }) => {
  const router = useRouter();

  const handleApprove = () => {
    notifyLoading();
    axios
      .put(`/accreditations/${accreditation.id}/approve`, {})
      .then((response) => {
        console.log(response);
        notifySuccess('Acreditación aprobada.');
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        notifyError('Error al aprobar acreditación.');
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      });
  };

  const handleReject = () => {
    notifyLoading();
    axios
      .put(`/accreditations/${accreditation.id}/reject`, {})
      .then((response) => {
        console.log(response);
        notifySuccess('Acreditación rechazada.');
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        notifyError('Error al rechazar acreditación.');
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      });
  };

  const handleMint = () => {
    const id_user = accreditation?.userId;
    notifyLoading();
    axios
      .post(`/users/${id_user}/wallets/powrs`, {
        id_accreditation: accreditation.id,
        amount: accreditation.quantity,
      })
      .then((response) => {
        console.log(response);
        notifySuccess(`Tokens emitidos: ${accreditation.quantity}.`);
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        notifyError('Error al emitir los tokens.');
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      });
  };

  return (
    <UserDataContext.Provider value={{ user: userData }}>
      <Layout>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xs={12}>
            <h1>Acreditación #{accreditation.id}</h1>
            <List disablePadding>
              <ListItem>
                <ListItemText primary="Nombre" secondary={accreditation.firstName || 'No indicado'} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Apellido" secondary={accreditation.lastName || 'No indicado'} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Mail" secondary={accreditation.email || 'No indicado'} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Tipo de árbol" secondary={accreditation.typeOfWood || 'No indicado'} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Cantidad a tokenizar"
                  secondary={accreditation.quantity + ' tn' || 'No indicado'}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Fecha de emisión" secondary={accreditation.depositDate || 'No indicado'} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Teléfono de contacto" secondary={accreditation.phone || 'No indicado'} />
              </ListItem>
              <Divider />
              <AccreditationListItems title={'Contrato de compraventa'} path={accreditation.pathSaleContract} />
              <Divider />
              <AccreditationListItems title={'Boleta de depósito'} path={accreditation.pathDeposit} />
              <Divider />
              <AccreditationListItems title={'Contrato comercial'} path={accreditation.pathComercialContract} />
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Estado de la solicitud"
                  secondary={accreditation.state || 'No indicado'}
                  secondaryTypographyProps={{
                    fontWeight: 'bold',
                  }}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Box display={'flex'} justifyContent={'center'} gap={'1em'}>
              <Button href="/admin">Atrás</Button>
              {accreditation.state === 'Generated' && (
                <>
                  <Button variant="contained" onClick={handleApprove}>
                    Aprobar
                  </Button>
                  <Button variant="contained" onClick={handleReject}>
                    Rechazar
                  </Button>
                </>
              )}

              {accreditation.state === 'Approved' && (
                <Button variant="contained" onClick={handleMint}>
                  Emitir tokens
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        <Toaster position="top-right" />
      </Layout>
    </UserDataContext.Provider>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(async (ctx) => {
  const { userData } = ctx.req.cookies;
  const [, userId, , userImage, , userName] = userData ? userData.split('|') : [];
  if (!userId) {
    console.log('no se recibio la cookie');
  } // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id } = ctx.req.params;
  const id2 = ctx.query.id;
  let newId;
  if (id === undefined) {
    newId = id2;
  } else {
    newId = id;
  }

  const accreditation = await fetch(`/accreditations/admin/id/${newId}`);
  return {
    accreditation,
    userData: {
      user: userId,
      name: userName,
      image: userImage,
    },
  };
});

export default withTransition(Accreditation);
