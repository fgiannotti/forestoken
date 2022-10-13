import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {InputLabel, MenuItem} from "@mui/material";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import { TaxSubjectType } from '../../../server/entities/taxSubjectType.enum';


export default function DatosPersonales(props: { setActiveStep: (value: (((prevState: number) => number) | number)) => void, setForm:any }) {

    const [formData, setFormData] = React.useState({});
    const [tribute, setTribute] = React.useState('');

    const handleTribute = (event: SelectChangeEvent) => {
        setTribute(event.target.value as string);
    };

    function handleChange(e) { //escucha de console log todos los inputs que lo llama en el onChange
        const {name, value} = e.target;
        setFormData((prevState: any) => ({...prevState, [name]: value})) //obtenes el estado anterior a ser cambiado, funcion anonima ()=>{} y las llaves es el objeto
        // los corchetes van porque represtan cualquier key que tenga name como etiqueta del componente.
    }

    function handleSubmit(e) {
        console.log(e);
        e.preventDefault(); //en el tag formulario con type submit cuando le doy click te redirecciona a tu pagina + ?,
        props.setActiveStep(2);
        props.setForm(prevState => ({...prevState, datosPersonales: formData}));
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
                <Typography variant="h3" gutterBottom>
                    Datos Personales
                </Typography>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={styles.divider}>
                        <Typography variant="h5" gutterBottom>Ubicacion</Typography>
                        <br/>
                        <TextField
                            required
                            onChange={handleChange}
                            name="provincia"
                            color='secondary'
                            id="outlined-provincia"
                            label="Buenos Aires"
                            helperText="¿En qué provincia vivis?"
                        />
                        {console.log(formData)}
                        <br/>
                        <TextField
                            required
                            onChange={handleChange}
                            name="ciudad"
                            color='secondary'
                            id="outlined-ciudad"
                            sx={{width: '35ch'}}
                            label="Ciudad Autónoma de Buenos Aires"
                            helperText="¿En qué ciudad?"
                        />
                        <br/>
                        <TextField
                            required
                            onChange={handleChange}
                            name="codigoPostal"
                            color='secondary'
                            id="outlined-codigoPostal"
                            label="Ingresa tu código postal"
                            helperText="¿Cuàl es tu código postal?"
                        />
                        <br/>
                        <TextField
                            required
                            onChange={handleChange}
                            name="direccion"
                            color='secondary'
                            id="outlined-direccion"
                            label="Ingresa tu dirección"
                            helperText="¿Cuàl es tu dirección?"
                        />
                    </div>
                    <div style={styles.divider}>
                        <Typography variant="h5" gutterBottom>Tributos</Typography>
                        <br/>
                        <FormControl fullWidth color='secondary'>
                            <InputLabel id="demo-simple-select-label">Seleccione el tipo de tributo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="tipoTributo"
                                value={tribute}
                                label="Seleccione el tipo de tributo"
                                onChange={(e) => {
                                    handleTribute(e);
                                    handleChange(e);
                                }}
                            >
                                <MenuItem value={TaxSubjectType.Monotributista}>Monotributista</MenuItem>
                                <MenuItem value={TaxSubjectType.ConsumidorFinal}>Consumidor Final</MenuItem>
                                <MenuItem value={TaxSubjectType.ResponsableInscripto}>Responsable Inscripto</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        <FormControl sx={{m: 1, width: '50ch'}} color='secondary' variant="outlined">
                            <FormLabel id="radio-persona">¿Sos una persona politicamente expuesta?</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="politicamenteExpuesto"
                                onChange={handleChange}
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <br/>
                        <FormControl sx={{m: 1, width: '50ch'}} color='secondary' variant="outlined">
                            <FormLabel id="radio-sujetoRegulado">Sujeto Regulado</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="sujetoRegulado"
                                onChange={handleChange}
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <br/>
                <Button color='secondary' onClick={handleNextForm} type="submit">Siguiente</Button>
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
    },
    divider: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        margin: '50px'
    },
    input: {
        margin: '10px'
    }
};