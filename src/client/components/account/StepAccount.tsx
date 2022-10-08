import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import RequestIcon from "@mui/icons-material/RequestQuote";
import StoreIcon from "@mui/icons-material/Store";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HelpIcon from "@mui/icons-material/Help";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import src from "../../assets/Forestoken-logo.png";
import MuiDrawer from "@mui/material/Drawer";

export default function StepAccount(props: { activeStep: number }) {

    const {activeStep} = props;

    const STEPS = [
        {
            text: 'DATOS GENERALES',
            icon: <HomeIcon/>
        },
        {
            text: 'DATOS PERSONALES',
            icon: <StoreIcon/>
        },
        {
            text: 'RESUMEN',
            icon: <HelpIcon/>
        },
    ];

    return (

        <MuiDrawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 300,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 300,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: [1],
                }}
            >
                <>
                    <Image src={src} alt="Forestoken" style={styles.logo} height={40} width={40}/>
                    <span style={styles.title}>Forestoken</span>
                </>
            </Toolbar>
            <Divider/>
            <List component="nav">
                <Box sx={{ml: 2, maxWidth: 400}}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {STEPS.map((step, index) => (
                            <Step key={index}
                                  sx={{
                                      '& .MuiStepLabel-root .Mui-completed': {
                                          color: 'secondary.main', // circle color (COMPLETED)
                                      },
                                      '& .MuiStepLabel-root .Mui-active': {
                                          color: 'secondary.main', // circle color (ACTIVE)
                                      },
                                  }}>
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
            </List>
        </MuiDrawer>
    );

}

const styles = {
    logo: {
        minWidth: 'auto',
        width: '50px',
        height: '50px',
    },
    title: {
        padding: '20px 10px',
        fontSize: '15px',
        color: 'text',
        fontWeight: '400',
        lineHeight: '1.2',
        display: 'table',
        margin: '0 auto'
    },
};