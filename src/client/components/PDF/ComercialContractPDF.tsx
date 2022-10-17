import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4E4E4',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1px solid #000',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#3388af',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#3388af',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
});

const SaleContractPDF = ({ values }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.main}>
          <Text style={styles.title}>Contrato Comercial</Text>
          <Text style={styles.subtitle}>Forestoken</Text>
          <Image
            src={'src/client/assets/Forestoken-logo.png'}
            style={styles.image}
          />
          <Text style={styles.subtitle}>Tokenización de activos físicos</Text>
          <Text style={styles.text}>
            Mediante este documento el productor cede los derechos de
            explotación de la madera a Forestoken, quien se compromete a
            mantener el valor de sus activos, resguardarlo ante eventualidades y
            permitirle disponer del mismo cuando lo desee.
          </Text>

          <View style={styles.section}>
            <Text
              style={styles.text}
              render={() =>
                `Nombre y Apellido: ${values.firstName} ${values.lastName}`
              }
              fixed
            />
          </View>

          <View style={styles.section}>
            <Text
              style={styles.text}
              render={() => `Tipo de Arbol: ${values.tipoArbol}`}
              fixed
            />
            <Text
              style={styles.text}
              render={() => `Cantidad: ${values.toneladas} tn`}
              fixed
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SaleContractPDF;
