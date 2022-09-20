import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Verificacion(props: { setActiveStep: (value: (((prevState: number) => number) | number)) => void }) {

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {m: 1},
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h3" gutterBottom>
                santi
            </Typography>
        </Box>
    );
}