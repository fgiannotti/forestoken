import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const DocuPDF = ({ values }) => {
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  return (
    <Document>
      <Page
        size="A4"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 10,
          }}
        >
          <Text style={{ color: '#3388af', fontSize: '42px' }}>TITULO</Text>
          <Text>Nombre</Text>
          <Image
            src="https://picsum.photos/600/400"
            alt="random image"
            style={{ maxWidth: '600px', maxHeight: '400' }}
          />
          <Text>PAPA CEBOLLA BATATA </Text>
          <Text
            style={{
              color: 'gray',
              fontStyle: 'italic',
              fontSize: '10px',
            }}
          >
            {lorem}
          </Text>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="firstName"
                placeholder="Juan"
                value={values.firstName}
              />
            </Grid>
          </Grid>
          <Text style={{ textAlign: 'justify', marginTop: '22px' }}>
            {values.firstName}
            {values.lastName}
            {values.email}
            {values.tipoArbol}
            {values.toneladas}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocuPDF;
