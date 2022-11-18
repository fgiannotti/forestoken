import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ProducerType } from '../../../server/entities/producerType.enum';

export default function GeneralData(props: {
  setForm: (value: ((prevState: any) => any) | any) => void;
  setActiveStep: (value: ((prevState: number) => number) | number) => void;
}) {
  const [formData, setFormData] = React.useState({}); // guardas un estado, para cambiar el estado es haciendo setForm, cada vez q se produzca un cambio en el form, va a vovler a renderizar tdo lo que este dentro
  const today = new Date().toLocaleString('es-AR'); // yyyy-mm-dd

  function handleChange(e) {
    //escucha de console log todos los inputs que lo llama en el onChange
    const { name, value } = e.target;
    setFormData((prevState: any) => ({ ...prevState, [name]: value })); //obtenes el estado anterior a ser cambiado, funcion anonima ()=>{} y las llaves es el objeto
    // los corchetes van porque represtan cualquier key que tenga name como etiqueta del componente.
  }

  function handleSubmit(e) {
    console.log(e);
    e.preventDefault(); //en el tag formulario con type submit cuando le doy click te redirecciona a tu pagina + ?,
    props.setActiveStep(1);
    props.setForm((prevState) => ({ ...prevState, datosGenerales: formData }));
  }

  return (
    <Box
      component="form"
      sx={styles.form}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Typography variant="h3" gutterBottom>
        Datos Generales
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={styles.divider}>
          <TextField
            required
            onChange={handleChange}
            name="nombre"
            color="secondary"
            id="outlined-nombre"
            label="Ingrese su nombre"
            helperText="Nombre"
          />
          {console.log(formData)}
          <br />
          <TextField
            required
            onChange={handleChange}
            name="apellido"
            color="secondary"
            id="outlined-apellidos"
            label="Ingrese su apellido"
            helperText="Apellidos"
          />
          <br />
          <TextField
            required
            onChange={handleChange}
            name="fechaNacimiento"
            color="secondary"
            id="date"
            type="date"
            defaultValue={today}
            InputLabelProps={{
              shrink: true,
            }}
            helperText="Fecha de Nacimiento"
          />
          <br />
          <TextField
            required
            onChange={handleChange}
            name="nroDocumento"
            color="secondary"
            id="outlined-documento"
            label="Ingrese su DNI"
            helperText="Número de Documento"
          />
          <br />
          <FormControl
            sx={{ m: 1, width: '50ch' }}
            color="secondary"
            variant="outlined"
          >
            <FormLabel id="demo-radio-buttons-group-label">
              ¿Qué tipo de productor sos?
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="tipoProductor"
              onChange={handleChange}
            >
              <FormControlLabel
                value={ProducerType.Individuo}
                control={<Radio required />}
                label="Individuo"
              />
              <FormControlLabel
                value={ProducerType.Empresa}
                control={<Radio required />}
                label="Empresa"
              />
            </RadioGroup>
          </FormControl>
          <Button color="secondary" type="submit">
            Siguiente
          </Button>
        </div>
      </div>
    </Box>
  );
}

const styles = {
  form: {
    '& > :not(style)': { m: 1 },
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    mt: '40px',
  },
  divider: {
    display: 'flex',
    flexDirection: 'column' as const,
    margin: '50px',
  },
  input: {
    margin: '10px',
  },
};
