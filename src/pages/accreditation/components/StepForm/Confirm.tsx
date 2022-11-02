import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Confirm({
  handleBack,
  handleNext,
  valuesDeposit,
  valuesContract,
}) {
  const [pathDeposit, setDepositPath] = useState(undefined);
  const [pathSaleContract, setContractPath] = useState(undefined);
  const [pathComercialContract] = useState('');

  const handleSubmit = () => {
    try {
      uploadPdf(valuesDeposit?.pdf, setDepositPath);
      uploadPdf(valuesContract?.pdf, setContractPath);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pathDeposit !== undefined && pathSaleContract !== undefined) {
      saveForm();
    }
  }, [pathDeposit, pathSaleContract]);

  const uploadPdf = (file, setPath) => {
    //form data
    const formData = new FormData();
    //append
    formData.append('file', file);
    //upload
    axios
      .post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setPath(response.data.path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveForm = () => {
    const accreditationDto = {
      ...valuesContract,
      ...valuesDeposit,
      pathDeposit,
      pathSaleContract,
      pathComercialContract,
      userId: 1,
    };
    //remove pdf from object
    delete accreditationDto.pdf;
    console.log(JSON.stringify(accreditationDto));
    axios
      .post('/accreditations', accreditationDto)
      .then((response) => {
        console.log(response);
        setContractPath(undefined);
        setDepositPath(undefined);
        handleNext();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <List disablePadding>
        <ListItem>
          <ListItemText
            primary="Nombre"
            secondary={valuesContract?.firstName || 'No indicado'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Apellido"
            secondary={valuesContract?.lastName || 'No indicado'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Mail"
            secondary={valuesContract?.email || 'No indicado'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Tipo de árbol"
            secondary={valuesContract?.typeOfWood || 'No indicado'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Cantidad a tokenizar"
            secondary={valuesContract?.quantity + ' tn' || 'No indicado'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Fecha de emisión"
            secondary={valuesDeposit?.date || 'No indicado'}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Teléfono de contacto"
            secondary={valuesDeposit?.phone || 'No indicado'}
          />
        </ListItem>
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button sx={{ mr: 1 }} onClick={() => handleBack()}>
          Anterior
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Confirmar y Continuar
        </Button>
      </Box>
    </>
  );
}
