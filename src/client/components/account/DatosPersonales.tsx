import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const SEXO = ['Masculino', 'Femenino', 'Prefiero no decirlo'];
const TRIBUTO = ['Monotributista', 'etc', 'etc etc'];
const today = new Date().toISOString().split('T')[0] // yyyy-mm-dd

export default function DatosPersonales(props: { setActiveStep: (value: (((prevState: number) => number) | number)) => void }) {

    const [value, setValue] = React.useState<string | null>(SEXO[0]);
    const [valor, setValor] = React.useState<string | null>(TRIBUTO[0]);
    const [inputValue, setInputValue] = React.useState('');
    const [inputValor, setInputValor] = React.useState('');

    function handleNextForm() {
        props.setActiveStep(3);
    }

    function handleSubmit(e) {
        console.log(e.data);
        e.preventDefault();
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& > :not(style)': {m: 1},
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h3" gutterBottom>
                Datos Personales
            </Typography>
            <br/>
            <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={SEXO}
                sx={{width: 300}}
                renderInput={(params) => <TextField {...params} label="Sexo"/>}
            />
            <TextField
                required
                id="date"
                label="Cumpleaños"
                type="date"
                defaultValue={today}
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <br/>
            <Typography variant="h5" gutterBottom>Ubicacion</Typography>
            <TextField
                required
                id="outlined-provincia"
                label="Buenos Aires"
                helperText="¿En qué provincia vivis?"
            />
            <TextField
                required
                id="outlined-ciudad"
                sx={{width: '35ch'}}
                label="Ciudad Autónoma de Buenos Aires"
                helperText="¿En qué ciudad?"
            />
            <TextField
                required
                id="outlined-codigoPostal"
                label="Ingresa tu código postal"
                helperText="¿Cuàl es tu código postal?"
            />
            <TextField
                required
                id="outlined-direccion"
                sx={{width: '28ch'}}
                label="Ingresa tu dirección"
                helperText="¿Cuàl es tu dirección?"
            />
            <br/>
            <Typography variant="h5" gutterBottom>Tributos</Typography>
            <Autocomplete
                value={valor}
                onChange={(event: any, newValue: string | null) => {
                    setValor(newValue);
                }}
                inputValue={inputValor}
                onInputChange={(event, newInputValue) => {
                    setInputValor(newInputValue);
                }}
                id="controllable-states-demos"
                options={TRIBUTO}
                sx={{width: 300}}
                renderInput={(params) => <TextField {...params} label="Tributo"/>}
            />

            <FormControl sx={{m: 1, width: '50ch'}} variant="outlined">
                <FormLabel id="radio-persona">¿Sos una persona politicamente expuesta?</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="si" control={<Radio />} label="Si" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
            <FormControl sx={{m: 1, width: '50ch'}} variant="outlined">
                <FormLabel id="radio-sujetoRegulado">Sujeto Regulado</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="si" control={<Radio />} label="Si" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
            <br/>
            <Button onClick={handleNextForm} type="submit">next</Button>
        </Box>
    );
}