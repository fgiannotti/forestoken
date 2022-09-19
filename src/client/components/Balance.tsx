import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Avatar } from '@mui/material';
import { green } from '@mui/material/colors';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Balance() {
  return (
    <div style={{marginBottom: "10px"}}>
      <Typography component="h2" variant="h6" color="secondary" gutterBottom>
        Balance
      </Typography>
      <Paper style={{padding: 20, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
          <Avatar sx={{ backgroundColor: green[500], marginRight: "10px", height: "70px", width: "70px"}} variant="rounded">
            <AccountBalanceWalletIcon  />
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
            color="primary"
            href="src/client/components/Balance"
            onClick={preventDefault}
            style={{marginTop: "auto", textDecoration: "none"}}
          >
            VER BALANCE
          </Link>
        </div>
      </Paper>
    </div>
  );
}
