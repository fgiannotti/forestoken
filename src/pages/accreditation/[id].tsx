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
      .put(`/accreditation/${accreditation.id}/approve`, {})
      .then((response) => {
        console.log(response);
        notifySuccess('Acreditación aprobada');
      })
      .catch((error) => {
        console.log(error);
        notifyError('Error al aprobar acreditación');
      });
  };

  const handleReject = () => {
    notifyLoading();
    axios
      .put(`/accreditation/${accreditation.id}/reject`, {})
      .then((response) => {
        console.log(response);
        notifySuccess('Acreditación rechazada');
      })
      .catch((error) => {
        console.log(error);
        notifyError('Error al rechazar acreditación');
      });
  };

  const handleMint = () => {
    const id_user = accreditation.id_user ?? '1';
    notifyLoading();
    axios
      .post(`/users/${id_user}/wallets/powrs`, {
        id_accreditation: accreditation.id,
        amount: accreditation.quantity,
      })
      .then((response) => {
        console.log(response);
        notifySuccess(`Tokens minteados: ${accreditation.quantity}`);
      })
      .catch((error) => {
        console.log(error);
        notifyError('Error al mintear tokens');
      });
  };

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xs={12}>
          <h1>Acreditacion #{accreditation.id}</h1>
          <List disablePadding>
            <ListItem>
              <ListItemText
                primary="Nombre"
                secondary={accreditation.firstName || 'Not Provided'}
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Apellido"
                secondary={accreditation.lastName || 'Not Provided'}
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Email"
                secondary={accreditation.email || 'Not Provided'}
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Tipo de arbol"
                secondary={accreditation.typeOfWood || 'Not Provided'}
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Cantidad a tokenizar"
                secondary={accreditation.quantity + ' tn' || 'Not Provided'}
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Dia de emision"
                secondary={accreditation.date || 'Not Provided'}
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Teléfono de contacto"
                secondary={accreditation.phone || 'Not Provided'}
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Contrato de compra venta"
                secondary={accreditation.pathSaleContract || 'Not Provided'}
              />
              <Button
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
                secondary={accreditation.pathDeposit || 'Not Provided'}
              />
              <Button
                onClick={() => handleButtonClick(accreditation.pathDeposit)}
              >
                Ver
              </Button>
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText
                primary="Contrato Comercial"
                secondary={
                  accreditation.pathComercialContract || 'Not Provided'
                }
              />
              <Button
                onClick={() =>
                  handleButtonClick(accreditation.pathComercialContract)
                }
              >
                Ver
              </Button>
            </ListItem>
          </List>
          <CustomizedDialogs
            open={open}
            handleClose={handleClose}
            path={selectedPath}
          />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <h2>Acciones</h2>
          <div>
            Estado actual de la acreditacion: <b>{accreditation.state}</b>
          </div>
          <Link href="/admin">
            <Box display={'flex'} justifyContent={'center'} gap={'1em'}>
              <Button variant="contained" onClick={handleApprove}>
                Aprobar
              </Button>
              <Button variant="contained" onClick={handleReject}>
                Rechazar
              </Button>
              {accreditation.state === 'Approved' && (
                <Button variant="contained" onClick={handleMint}>
                  Mintear
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

    const accreditation = await fetch(`/accreditation/admin/${id}`);
    return { accreditation };
  },
);

export default withTransition(Accreditation);
