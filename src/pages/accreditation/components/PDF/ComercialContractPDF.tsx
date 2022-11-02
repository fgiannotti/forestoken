import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import img from 'src/client/assets/Forestoken-logo.png';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
  },
  main: {
    padding: 10,
    marginHorizontal: 100,
  },
  title: {
    fontSize: 24,
    textAlign: 'justify',
    color: '#6320EE',
    paddingVertical: 20,
  },
  subtitle: {
    paddingVertical: 10,
    fontSize: 18,
    textAlign: 'justify',
    color: '#6320EE',
    alignItems: 'center',
  },
  text: {
    paddingVertical: 15,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
});

const SaleContractPDF = ({ values }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.main}>
          <Text style={styles.title}>Contrato Comercial</Text>
          <Text style={styles.subtitle}>
            Forestoken <Image src={img.src} style={styles.image} />
          </Text>
          <Text style={styles.subtitle}>Tokenización de activos físicos</Text>
          <Text style={styles.text}>
            Mediante este documento el productor {values.firstName}{' '}
            {values.lastName} cede los derechos de explotación de las{' '}
            {values.quantity} toneladas de madera en rollos a Forestoken, quien
            se compromete a entregar {values.quantity} criptopinos, manteniendo
            el valor de sus activos, resguardarlo ante eventualidades y
            permitirle disponer del mismo cuando lo desee.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default SaleContractPDF;
