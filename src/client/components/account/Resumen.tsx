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

const today = new Date().toISOString().split('T')[0] // yyyy-mm-dd

export default function Documentos(props: { setActiveStep: (value: (((prevState: number) => number) | number)) => void }) {

    function handleNextForm() {
        props.setActiveStep(0);
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
                Resumen
            </Typography>
            <br/>
            <TextField
                id="controllable-states-demo"
                label="Nombre"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="controllable-states-demo"
                label="Apellido"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="controllable-states-demo"
                label="Tipo de documento"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="controllable-states-demo"
                label="Número de DNI"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="date"
                label="Fecha de nacimiento"
                defaultValue={today}
                sx={{ width: 220 }}
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="controllable-states-demo"
                label="Sexo"
                InputProps={{
                    readOnly: true,
                }}
            />
            <br/>
            <Typography variant="h5" gutterBottom>Ubicacion</Typography>
            <TextField
                id="controllable-states-demo"
                label="Provincia"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="controllable-states-demo"
                label="Ciudad"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="controllable-states-demo"
                label="Código postal"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="controllable-states-demo"
                label="Dirección"
                InputProps={{
                    readOnly: true,
                }}
            />
            <br/>
            <Typography variant="h5" gutterBottom>Tributo</Typography>
            <TextField
                id="controllable-states-demo"
                label="Condición impositiva"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="controllable-states-demo"
                label="Persona politicamente expuesta"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="controllable-states-demo"
                label="Sujeto regulado"
                InputProps={{
                    readOnly: true,
                }}
            />
            <br/>
            <Button onClick={handleNextForm} type="submit">next</Button>
        </Box>
    );
}