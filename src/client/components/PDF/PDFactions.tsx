import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import { Button } from '@mui/material';

function PDFactions({ PDFdoc }) {
  const [verPDF, setVerPDF] = React.useState(false);

  const Menu = () => (
    <div
      style={{
        display: 'flex',
        borderTop: '1px solid black',
        paddingTop: '5px',
        marginTop: '15px',
        justifyContent: 'space-around',
      }}
    >
      <Button
        color={'primary'}
        onClick={() => {
          setVerPDF(!verPDF);
        }}
      >
        {verPDF ? 'Ocultar PDF' : 'Ver PDF'}
      </Button>
      <PDFDownloadLink
        document={PDFdoc}
        fileName="Contrato Compra Venta Forestoken.pdf"
      >
        <Button color={'primary'}>Descargar PDF</Button>
      </PDFDownloadLink>
    </div>
  );

  return (
    <div>
      <Menu />
      <>
        {verPDF ? (
          <PDFViewer style={{ width: '100%', height: '90vh' }}>
            {PDFdoc}
          </PDFViewer>
        ) : null}
      </>
    </div>
  );
}

export default PDFactions;
