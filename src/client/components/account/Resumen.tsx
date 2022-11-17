import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { UserDto } from '../../../server/dtos/user.dto';
import { useRouter } from 'next/router';

const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

interface DocumentsProps {
  setActiveStep: (value: ((prevState: number) => number) | number) => void;
  formulario: any;
  handleBack: any;
}

export default function Resume({
                                 setActiveStep,
                                 formulario,
                                 handleBack,
                               }: DocumentsProps) {
  const router = useRouter();

  function handleSubmit(e) {
    const userDto: UserDto = {
      name: formulario.datosGenerales.nombre,
      mail: formulario.user.user.mail,
      postalCode: formulario.datosPersonales.codigoPostal,
      address: formulario.datosPersonales.direccion,
      provincia: formulario.datosPersonales.provincia,
      dateOfBirth: formulario.datosGenerales.fechaNacimiento,
      isPoliticPerson: formulario.datosPersonales.politicamenteExpuesto == 'Sí',
      isRegulatedPerson: formulario.datosPersonales.sujetoRegulado == 'Sí',
      photoUrl: formulario.user.user.photoUrl,
      dni: formulario.datosGenerales.nroDocumento,
      producerType: formulario.datosGenerales.tipoProductor,
      city: formulario.datosPersonales.ciudad,
      taxSubjectType: formulario.datosPersonales.tipoTributo,
    };
    e.preventDefault();
    axios
      .post('/users', userDto)
      .then((response) => {
        router.push('/home');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Falló el envio del formulario.', {
          theme: 'colored',
        });
      });
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={styles.form}
      autoComplete="off"
    >
      <Typography textAlign='center' variant="h3" gutterBottom>
        Resumen
      </Typography>
      <br/>
      <br/>
      <div style={styles.divider}>
        <div>
          <TextField
            id="controllable-states-demo"
            color="primary"
            label="Nombre"
            InputProps={{
              readOnly: true,
            }}
            value={formulario.datosGenerales.nombre}
            sx={styles.input}
          />
          <TextField
            id="controllable-states-demo"
            color="primary"
            label="Apellido"
            InputProps={{
              readOnly: true,
            }}
            value={formulario.datosGenerales.apellido}
            sx={styles.input}
          />
        </div>
        <div>
          <TextField
            id="controllable-states-demo"
            color="primary"
            label="Número de DNI"
            InputProps={{
              readOnly: true,
            }}
            value={formulario.datosGenerales.nroDocumento}
            sx={styles.input}
          />
          <TextField
            id="date"
            color="primary"
            label="Fecha de nacimiento"
            defaultValue={today}
            InputProps={{
              readOnly: true,
            }}
            value={formulario.datosGenerales.fechaNacimiento}
            sx={{margin: '10px'}}
          />
        </div>
      </div>
      <br/>
      <Typography variant="h5" gutterBottom>
        Ubicación
      </Typography>
      <div style={styles.divider}>
        <div>
          <TextField
            id="controllable-states-demo"
            color="primary"
            label="Provincia"
            InputProps={{
              readOnly: true,
            }}
            value={formulario.datosPersonales.provincia}
            sx={styles.input}
          />
          <TextField
            id="controllable-states-demo"
            color="primary"
            label="Ciudad"
            InputProps={{
              readOnly: true,
            }}
            value={formulario.datosPersonales.ciudad}
            sx={styles.input}
          />
        </div>
        <div>
          <TextField
            id="controllable-states-demo"
            color="primary"
            label="Código postal"
            InputProps={{
              readOnly: true,
            }}
            value={formulario.datosPersonales.codigoPostal}
            sx={styles.input}
          />
          <TextField
            id="controllable-states-demo"
            color="primary"
            label="Dirección"
            InputProps={{
              readOnly: true,
            }}
            value={formulario.datosPersonales.direccion}
            sx={styles.input}
          />
        </div>
      </div>
      <br/>
      <Typography variant="h5" gutterBottom>
        Tributo
      </Typography>
      <div style={styles.divider}>
        <TextField
          id="controllable-states-demo"
          color="primary"
          label="Condición impositiva"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosPersonales.tipoTributo}
          sx={styles.input}
        />
        <TextField
          id="controllable-states-demo"
          color="primary"
          label="Persona politícamente expuesta"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosPersonales.politicamenteExpuesto}
          sx={styles.input}
        />
        <TextField
          id="controllable-states-demo"
          color="primary"
          label="Sujeto regulado"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosPersonales.sujetoRegulado}
          sx={styles.input}
        />
      </div>
      <br/>
      <Box sx={{display: 'flex', justifyContent: 'space-around', mt: 3}}>
        <Button sx={{mr: 1}} color="secondary" onClick={() => handleBack()}>
          Anterior
        </Button>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Enviar datos
          </Button>
        </div>
      </Box>
      <ToastContainer/>
    </Box>
  );
}

const styles = {
  form: {
    '& > :not(style)': {m: 1},
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    mt: '40px',
    maxWidth: {xs: '400px', md: '100%'},
  },
  divider: {
    display: 'flex',
    flexDirection: 'row' as const,
  },
  input: {
    margin: '10px',
  },
};
