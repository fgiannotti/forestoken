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
import { Grid, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TaxSubjectType } from '../../../server/entities/taxSubjectType.enum';

const INPUTS = [{
  name: "provincia",
  id: "outlined-provincia",
  label: "Ingresá tu provincia",
  helperText: "¿En qué provincia vivís?"
},
  {
    name: "ciudad",
    id: "outlined-ciudad",
    label: "Ingresá tu ciudad",
    helperText: "¿En qué ciudad?"
  },
  {
    name: "codigoPostal",
    id: "outlined-codigoPostal",
    label: "Ingresá tu código postal",
    helperText: "¿Cuál es tu código postal?"
  },
  {
    name: "direccion",
    id: "outlined-direccion",
    label: "Ingresá tu dirección",
    helperText: "¿Cuál es tu dirección?"
  }]

export default function PersonalData(props: {
  setActiveStep: (value: ((prevState: number) => number) | number) => void;
  setForm: any;
  handleBack: any;
}) {
  const [formData, setFormData] = React.useState({});
  const [tribute, setTribute] = React.useState('');

  const handleTribute = (event: SelectChangeEvent) => {
    setTribute(event.target.value as string);
  };

  function handleChange(e) {
    //escucha de console log todos los inputs que lo llama en el onChange
    const {name, value} = e.target;
    setFormData((prevState: any) => ({...prevState, [name]: value})); //obtenes el estado anterior a ser cambiado, funcion anonima ()=>{} y las llaves es el objeto
    // los corchetes van porque represtan cualquier key que tenga name como etiqueta del componente.
  }

  function handleSubmit(e) {
    console.log(e);
    e.preventDefault(); //en el tag formulario con type submit cuando le doy click te redirecciona a tu pagina + ?,
    props.setActiveStep(2);
    props.setForm((prevState) => ({...prevState, datosPersonales: formData}));
  }

  function handleNextForm() {
    //   props.setActiveStep(2);
  }

  return (
    <Box
      component="form"
      sx={styles.form}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Typography textAlign='center' variant="h3" gutterBottom>
        Datos Personales
      </Typography>
      <Grid container sx={{mt: '40px'}}>
        <Grid container flexDirection='column' xs={12} md={6} sx={{p: '15px'}}>
          <Typography variant="h5">
            Ubicación
          </Typography>
          {INPUTS.map((props, index) => (
            <TextField
              key={index}
              required
              onChange={handleChange}
              color="secondary"
              sx={{mt: '15px'}}
              {...props}
            />
          ))}
        </Grid>
        <Grid container flexDirection='column' xs={12} md={6} sx={{p: '15px'}}>
          <Typography variant="h5">
            Tributos
          </Typography>
          <FormControl sx={{mt: '15px'}} color="secondary">
            <InputLabel id="demo-simple-select-label">
              Seleccioná tu condición impositiva
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="tipoTributo"
              value={tribute}
              label="Seleccioná tu condición impositiva"
              onChange={(e) => {
                handleTribute(e);
                handleChange(e);
              }}
            >
              <MenuItem value={TaxSubjectType.Monotributista}>
                Monotributista
              </MenuItem>
              <MenuItem value={TaxSubjectType.ConsumidorFinal}>
                Consumidor Final
              </MenuItem>
              <MenuItem value={TaxSubjectType.ResponsableInscripto}>
                Responsable Inscripto
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{mt: '35px'}}
            color="secondary"
            variant="outlined"
          >
            <FormLabel id="radio-persona">
              ¿Sos una persona políticamente expuesta?
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="politicamenteExpuesto"
              onChange={handleChange}
            >
              <FormControlLabel value="Sí" control={<Radio required/>} label="Sí"/>
              <FormControlLabel value="No" control={<Radio required/>} label="No"/>
            </RadioGroup>
          </FormControl>
          <FormControl
            sx={{mt: '35px'}}
            color="secondary"
            variant="outlined"
          >
            <FormLabel id="radio-sujetoRegulado">¿Sos un sujeto regulado?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="sujetoRegulado"
              onChange={handleChange}
            >
              <FormControlLabel value="Sí" control={<Radio required/>} label="Sí"/>
              <FormControlLabel value="No" control={<Radio required/>} label="No"/>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3}}>
        <Button sx={{mr: 1}} color="secondary" onClick={() => props.handleBack()}>
          Anterior
        </Button>
        <Button color="secondary" onClick={handleNextForm} type="submit">
          Siguiente
        </Button>
      </Box>
    </Box>
  );
}

const styles = {
  form: {
    height: '100%',
    mt: '40px',
    width: {md: '50%'},
    maxWidth: {xs: '400px', md: '100%'},
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
