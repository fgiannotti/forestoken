import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Avatar } from '@mui/material';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Balance() {
  return (
    <div style={{marginBottom: "10px"}}>
      <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
        Balance
      </Typography>
      <Paper style={styles.paper}>
        <div style={styles.div}>
          <Avatar sx={styles.avatar} variant="rounded">
            <AccountBalanceWalletIcon  sx={{height:'100'}}/>
          </Avatar>
          <div>
            <Typography component="p" variant="h4">
              $12,000.00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              al 15 de Septiembre, 2022
            </Typography>
          </div>
        </div>
        <div style={{display: "flex", justifyContent: "end"}}>
          <Link
            href="src/client/components/Balance"
            onClick={preventDefault}
            style={styles.link}
          >
            VER BALANCE
          </Link>
        </div>
      </Paper>
    </div>
  );
}

const styles = {
  title: {
    fontWeight: '400',
    fontSize: '1.5rem',
    color: 'gray'
  },
  paper: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  div: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  avatar: {
    backgroundColor: "#78B982",
    marginRight: "10px",
    height: "70px",
    width: "70px"
  },
  link: {
    marginTop: "auto",
    textDecoration: "none",
    fontWeight: '600',
    fontSize: '0.8rem',
    color:"primary"
  },
}
