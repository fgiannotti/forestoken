// ./src/pages/[id].tsx
import withTransition from 'src/client/HOC/withTransition';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { fetch } from 'src/shared/utils/fetch';
import Layout from 'src/client/layouts/dashboard';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import CustomizedDialogs from './components/Modal';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';

const notifyLoading = () => toast.loading('Procesando...');
const notifySuccess = (msg) => {
  toast.remove();
  toast.success(msg);
};
const notifyError = (msg) => {
  toast.remove();
  toast.error(msg);
};

const Accreditation = ({ accreditation }) => {
  const [open, setOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = (path) => {
    setSelectedPath(path);
    setOpen(true);
  };

  const handleApprove = () => {
    notifyLoading();
    axios
      .put(`/accreditations/${accreditation.id}/approve`, {})
      .then((response) => {
        console.log(response);
        notifySuccess('Acreditación aprobada.');
      })
      .catch((error) => {
        console.log(error);
        notifyError('Error al aprobar acreditación.');
      });
  };

  const handleReject = () => {
    notifyLoading();
    axios
      .put(`/accreditations/${accreditation.id}/reject`, {})
      .then((response) => {
        console.log(response);
        notifySuccess('Acreditación rechazada.');
      })
      .catch((error) => {
        console.log(error);
        notifyError('Error al rechazar acreditación.');
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
      })
      .catch((error) => {
        console.log(error);
        notifyError('Error al emitir los tokens.');
      });
  };

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xs={12}>
          <h1>Acreditación #{accreditation.id}</h1>
          <List disablePadding>
            <ListItem>
              <ListItemText
                primary="Nombre"
                secondary={accreditation.firstName || 'No indicado'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Apellido"
                secondary={accreditation.lastName || 'No indicado'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Mail"
                secondary={accreditation.email || 'No indicado'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Tipo de árbol"
                secondary={accreditation.typeOfWood || 'No indicado'}
              />
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
              <ListItemText
                primary="Fecha de emisión"
                secondary={accreditation.date || 'No indicado'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Teléfono de contacto"
                secondary={accreditation.phone || 'No indicado'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Contrato de compraventa"
                secondary={accreditation.pathSaleContract || 'No indicado'}
              />
              <Button
                color="secondary"
                onClick={() =>
                  handleButtonClick(accreditation.pathSaleContract)
                }
              >
                Ver
              </Button>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Boleta de depósito"
                secondary={accreditation.pathDeposit || 'No indicado'}
              />
              <Button
                color="secondary"
                onClick={() => handleButtonClick(accreditation.pathDeposit)}
              >
                Ver
              </Button>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Contrato comercial"
                secondary={accreditation.pathComercialContract || 'No indicado'}
              />
              <Button
                color="secondary"
                onClick={() =>
                  handleButtonClick(accreditation.pathComercialContract)
                }
              >
                Ver
              </Button>
            </ListItem>
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
          <CustomizedDialogs
            open={open}
            handleClose={handleClose}
            path={selectedPath}
          />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Link href="/admin">
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
          </Link>
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(
  async (ctx) => {
    const id = ctx.query.id;

    const accreditation = await fetch(`/accreditations/admin/${id}`);
    return { accreditation };
  },
);

export default withTransition(Accreditation);
