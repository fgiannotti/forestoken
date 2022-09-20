import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import StepContent from "@mui/material/StepContent";
import Link from "next/link";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import RequestIcon from "@mui/icons-material/RequestQuote";
import StoreIcon from "@mui/icons-material/Store";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HelpIcon from "@mui/icons-material/Help";

export default function StepAccount(props: { activeStep: number }) {

    const {activeStep} = props;

    const STEPS = [
        {
            text: 'DATOS GENERALES',
            icon: <HomeIcon />
        },
        {
            text: 'VERIFICACIÓN',
            icon: <RequestIcon />
        },
        {
            text: 'DATOS PERSONALES',
            icon: <StoreIcon />
        },
        {
            text: 'DOCUMENTACIÓN',
            icon: <AttachMoneyIcon />
        },
        {
            text: 'RESUMEN',
            icon: <HelpIcon />
        },
    ];


    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {STEPS.map((step, index) => (
                    <Step key={index}>
                        <StepLabel
                            optional={
                                index === 4 ? (
                                    <Typography variant="caption">Ultimo paso</Typography>
                                ) : null
                            }
                        >
                            {step.text}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );

}