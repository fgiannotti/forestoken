import * as React from 'react';
import {useState, useMemo} from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import CountrySelect from "../countrySelect";
import Button from "@mui/material/Button";

const documentos = ['DNI', 'LE', 'LC'];
const paises = null;

interface State {
    password: string;
    showPassword: boolean;
}

export default function DatosGenerales(props: { setActiveStep: (value: (((prevState: number) => number) | number)) => void }) {

    const [value, setValue] = React.useState<string | null>(documentos[0]);
    const [valor, setValor] = React.useState<string | null>(paises);
    const [inputValue, setInputValue] = React.useState('');

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
    });

    const changeHandler = value => {
        setValue(value)
    }

    const changeHandlerPaises = valor => {
        setValor(valor)
    }

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value});
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const pais = useMemo(() => countryList().getData(), [])

    function handleNextForm() {
       props.setActiveStep(1);
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
                    Datos Generales
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
                    options={documentos}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Selecciona un tipo de documento"/>}
                />
                <TextField
                    required
                    color='secondary'
                    id="outlined-nombre"
                    label="Ingrese su nombre"
                    helperText="Nombre"
                />
                <TextField
                    required
                    id="outlined-apellidos"
                    label="Ingrese su apellido"
                    helperText="Apellidos"
                />
                <TextField
                    required
                    id="outlined-apellidos"
                    sx={{width: '28ch'}}
                    label="Ingresa el número de tu Documento"
                    helperText="Número de Documento"
                />
                <TextField
                    required
                    id="outlined-apellidos"
                    label="juan@ejemplo.com"
                    helperText="¿Cuál es tu dirección de correo electrónico?"
                />
                <FormControl sx={{m: 1, width: '30ch'}} variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">Ingrese su contraseña</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Ingrese su contraseña"
                    />
                </FormControl>
                <FormControl sx={{m: 1, width: '50ch'}} variant="outlined">
                    <FormLabel id="demo-radio-buttons-group-label">¿Qué tipo de productor sos?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="Individuo (Monotributista, responsable inscripto)" control={<Radio />} label="Individuo(Monotributista, responsable inscripto)" />
                        <FormControlLabel value="Tipo empresa" control={<Radio />} label="Tipo empresa" />
                    </RadioGroup>
                </FormControl>
                <CountrySelect/>
                <Button onClick={handleNextForm} type="submit">next</Button>
            </Box>
    );
}