import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import coin from 'src/client/assets/Criptopino.png';
import Image from 'next/image';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Avatar } from '@mui/material';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const Balance = ({ money, tokens }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
        Balance
      </Typography>
      <Paper sx={styles.paper}>
        <div style={styles.div}>
          <Avatar sx={styles.avatar} variant="rounded">
            <AccountBalanceWalletIcon sx={styles.icon} />
          </Avatar>
          <div>
            <Typography component="p" variant="h4">
              {tokens}{' '}
              <Image src={coin.src} alt="coin" width={26} height={26} />
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              {money} al{' '}
              {new Date().toLocaleDateString('es-AR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Typography>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
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
};

export default Balance;

const styles = {
  title: {
    fontWeight: '400',
    fontSize: '1.5rem',
    color: 'gray',
  },
  paper: {
    padding: 2,
    display: 'flex',
    flexDirection: ['column', 'row'] as ['column', 'row'],
    justifyContent: 'space-between',
  },
  div: {
    display: 'flex',
    flexDirection: 'row' as const,
  },
  avatar: {
    backgroundColor: '#78B982',
    marginRight: '10px',
    height: ['35px', '70px'],
    width: ['35px', '70px'],
    marginTop: ['0', 'auto'],
    marginBottom: ['0', 'auto'],
  },
  icon: {
    fontSize: ['1.5rem', '2.5rem'],
  },
  link: {
    marginTop: 'auto',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.8rem',
    color: 'primary',
  },
};
