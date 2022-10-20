import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';

const MyDocument = () => {
  const componentRef = useRef();
  const handlePrint = () => {
    useReactToPrint({
      content: () => componentRef.current,
    });
  };

  return (
    <div>
      <h1>My Document</h1>
      <div className=" d-print-block" ref={componentRef}>
        <h1 className="center margin">Contrato de Compra Venta de Madera</h1>
        <Image
          className="logo"
          src="/src/client/assets/Forestoken-logo.png"
          width={50}
          height={50}
        />
        <table className="table">
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Empresa"
                  readOnly
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Descripción"
                  readOnly
                />
                <p className="text-sm-start mt-2">
                  Modo de uso: <br />
                  1. Abrir la aplicación oClock. <br />
                  2. Ingresar al sistema con usuario y contraseña. <br />
                  3. Clic en el boton 'Fichar Ingreso/Egreso'. <br />
                  4. Enfocar hacia el código QR. <br />
                  5. Esperar la confirmación de lectura.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="center margin">
          Para conocer más sobre nuestra herramienta visite nuestro sitio web{' '}
          <a href="https://forestoken.com">https://forestoken.com</a>
        </p>
        <a href="https://play.google.com/store">
          <img
            alt="Disponible en Google Play"
            src="https://play.google.com/intl/es-419/badges/static/images/badges/es-419_badge_web_generic.png"
            style={{ height: 63 }}
          />
        </a>
      </div>
      <button
        type="button"
        className="btn btn-primary mt-3 ms-4"
        onClick={handlePrint}
      >
        Imprimir
      </button>
    </div>
  );
};

export default MyDocument;
