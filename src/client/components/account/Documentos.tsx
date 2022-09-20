import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import ImageUploader from "../ImageUploader";

export default function Documentos(props: { setActiveStep: (value: (((prevState: number) => number) | number)) => void }) {

    function handleNextForm() {
        props.setActiveStep(4);
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
            <Typography variant="h3" gutterBottom>Verificación de documentos</Typography>
            <br/>
            <Typography variant="h7" gutterBottom>Para verificar tu identidad, necesitamos
                dos imagenes de tu DNI(frente y dorso). Sólo las necesitamos por motivos de seguridad
            y verificación de tu identidad</Typography>
            <br/>
            <br/>
            <Typography variant="h8" gutterBottom>Imagén del frente de tu DNI</Typography>
            <ImageUploader/>
            <Typography variant="h8" gutterBottom>Imagén del dorso de tu DNI</Typography>
            <ImageUploader/>
            <br/>
            <Button onClick={handleNextForm} type="submit">next</Button>
        </Box>
    );
}