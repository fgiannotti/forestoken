import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from 'axios';

import '@react-pdf-viewer/core/lib/styles/index.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomizedDialogs({ open, handleClose, path = '' }) {
  const [blob, setBlob] = React.useState(null);

  useEffect(() => {
    const get = async () => {
      axios
        .get(`/files/${path}`, {
          headers: {
            //'Content-Type': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/pdf',
          },
        })
        .then((response) => {
          console.log(response.data);

          //base64 to file
          const base64 = response.data;
          const byteCharacters = atob(base64);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          console.log(blob);
          setBlob(blob);

          // window.open('data:application/pdf;base64, ' + response.data);
          // setBlob(response.data);

          const a = document.createElement('a');
          a.href = window.URL.createObjectURL(blob);
          a.download = 'test.pdf';
          a.click();

          // const a = document.createElement('a');
          // a.href = 'data:application/octet-stream;base64,' + response.data;
          // a.download = 'documentName.pdf';
          // a.click();

          //const blob = new Blob([response.data], { type: 'application/pdf' });
          //setBlob(blob);
        });
    };
    if (path !== '') {
      get();
    }
  }, [path]);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Visualición de documento de acreditación
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {path}
          <Typography gutterBottom>Se deberian mostrar el pdf aqui</Typography>
        </DialogContent>
        {/*{isRendered && blob && (
          <div
            style={{
              border: '1px solid rgba(0, 0, 0, 0.3)',
              height: '750px',
            }}
          >
            <iframe
              src={blob}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </div>
        )}*/}
        <iframe
          src={`data:application/pdf; ${blob}`}
          style={{
            width: '100%',
            height: '600px',
            border: 'none',
          }}
        />
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
