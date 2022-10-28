import React from 'react';
import Typography from '@mui/material/Typography';
import coin from 'src/client/assets/Criptopino.png';
import Image from 'next/image';
import { Paper } from '@mui/material';


const Cotizacion = ({token_price}) => {
  return (
    <>
      <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
        Cotización Actual
      </Typography>
      <Paper sx={styles.paper}>
        <Image src={coin.src} alt="coin" width={70} height={70}/>
        <div style={{marginLeft: "10px"}}>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Criptopino
          </Typography>
          <Typography component="p" variant="h4">
            {token_price}
          </Typography>
        </div>
      </Paper>
    </>
  );
}

export default Cotizacion;

const styles = {
  paper: {
    padding: 2,
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontWeight: '400',
    fontSize: '1.5rem',
    color: 'gray'
  },
  link: {
    marginTop: "10px",
    textDecoration: "none",
    fontWeight: '600',
    fontSize: '0.8rem',
    color:"primary"
  },
}