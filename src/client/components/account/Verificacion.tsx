import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

export default function Verificacion(props: { setActiveStep: (value: (((prevState: number) => number) | number)) => void }) {

    function handleNextForm() {
        props.setActiveStep(2);
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
            <Typography variant="h3" gutterBottom>Verificacion</Typography>
            <Typography variant="h5" gutterBottom>definir si es prioritario lo que venga aca</Typography>
            <Button onClick={handleNextForm} type="submit">next</Button>
        </Box>
    );
}