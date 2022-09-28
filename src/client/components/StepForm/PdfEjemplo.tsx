import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import DocuPDF from '../PDF/DocuPDF';
import WebView from '../PDF/WebView';
import { Button } from '@mui/material';

function App({ values }) {
  const [poema, setPoema] = React.useState('');
  const [verWeb, setVerWeb] = React.useState(false);
  const [verPDF, setVerPDF] = React.useState(false);
  function fetchPoema() {
    fetch('https://www.poemist.com/api/v1/randompoems')
      .then((response) => response.json())
      .then((data) => {
        setPoema(data[0]);
        console.log(data[0]);
      });
  }

  React.useEffect(() => {
    fetchPoema();
  }, []);

  const Menu = () => (
    <nav
      style={{
        display: 'flex',
        borderBottom: '1px solid black',
        paddingBottom: '5px',
        justifyContent: 'space-around',
      }}
    >
      <Button
        color={'primary'}
        onClick={() => {
          setVerWeb(!verWeb);
          setVerPDF(false);
        }}
      >
        {verWeb ? 'Ocultar Web' : 'Ver Web'}
      </Button>
      <Button
        color={'primary'}
        onClick={() => {
          setVerPDF(!verPDF);
          setVerWeb(false);
        }}
      >
        {verPDF ? 'Ocultar PDF' : 'Ver PDF'}
      </Button>
      <PDFDownloadLink
        document={<DocuPDF poema={poema} values={values} />}
        fileName="poema.pdf"
      >
        <Button color={'primary'}>Descargar PDF</Button>
      </PDFDownloadLink>
    </nav>
  );

  return (
    <div>
      <Menu />
      {poema ? (
        <>
          {verWeb ? <WebView poema={poema} values={values} /> : null}
          {verPDF ? (
            <PDFViewer style={{ width: '100%', height: '90vh' }}>
              <DocuPDF poema={poema} values={values} />
            </PDFViewer>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export default App;
