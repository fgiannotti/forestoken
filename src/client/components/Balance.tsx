import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Balance() {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="secondary" gutterBottom>
        Balance
      </Typography>
      <Typography component="p" variant="h4">
        $12,000.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        al 15 de Septiembre, 2022
      </Typography>
      <div>
        <Link
          color="primary"
          href="src/client/components/Balance"
          onClick={preventDefault}
        >
          Ver Balance
        </Link>
      </div>
    </React.Fragment>
  );
}
