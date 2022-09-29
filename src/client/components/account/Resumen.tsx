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
            sx={styles.form}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h3" gutterBottom>
                Resumen
            </Typography>
            <br/>
            <div style={styles.divider}>
            <TextField
                id="controllable-states-demo"
                color='secondary'
                label="Nombre"
                InputProps={{
                    readOnly: true,
                }}
                sx={styles.input}
            />
            <TextField
                id="controllable-states-demo"
                color='secondary'
                label="Apellido"
                InputProps={{
                    readOnly: true,
                }}
                sx={styles.input}
            />
            <TextField
                id="controllable-states-demo"
                color='secondary'
                label="Número de DNI"
                InputProps={{
                    readOnly: true,
                }}
                sx={styles.input}
            />
            <TextField
                id="date"
                color='secondary'
                label="Fecha de nacimiento"
                defaultValue={today}
                sx={{ width: 220, margin: '10px' }}
                InputProps={{
                    readOnly: true,
                }}
            />
            </div>
            <br/>
            <Typography variant="h5" gutterBottom>Ubicacion</Typography>
            <div style={styles.divider}>
            <TextField
                id="controllable-states-demo"
                color='secondary'
                label="Provincia"
                InputProps={{
                    readOnly: true,
                }}
                sx={styles.input}
            />
            <TextField
                id="controllable-states-demo"
                color='secondary'
                label="Ciudad"
                InputProps={{
                    readOnly: true,
                }}
                sx={styles.input}
            />
            <TextField
                id="controllable-states-demo"
                color='secondary'
                label="Código postal"
                InputProps={{
                    readOnly: true,
                }}
                sx={styles.input}
            />
            <TextField
                id="controllable-states-demo"
                color='secondary'
                label="Dirección"
                InputProps={{
                    readOnly: true,
                }}
                sx={styles.input}
            />
            </div>
            <br/>
            <Typography variant="h5" gutterBottom>Tributo</Typography>
            <div style={styles.divider}>
            <TextField
                id="controllable-states-demo"
                color='secondary'
                label="Condición impositiva"
                InputProps={{
                    readOnly: true,
                }}
                sx={styles.input}
            />
            <TextField
                id="controllable-states-demo"
                color='secondary'
                label="Persona politicamente expuesta"
                InputProps={{
                    readOnly: true,
                }}
                sx={styles.input}
            />
            <TextField
                id="controllable-states-demo"
                color='secondary'
                label="Sujeto regulado"
                InputProps={{
                    readOnly: true,
                }}
                sx={styles.input}
            />
            </div>
            <br/>
            <Button color='secondary' onClick={handleNextForm} type="submit">Enviar form</Button>
        </Box>
    );
}

const styles = {
    form: {
        '& > :not(style)': {m: 1},
        display: 'flex',
        flexDirection: 'column',
        height:'100%',
        mt:'40px',
    },
    divider: {
        display: 'flex',
        flexDirection: 'row',
    },
    input:{
        margin:'10px',
    }
};