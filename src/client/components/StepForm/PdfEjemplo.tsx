import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const _exportPdf = () => {
  html2canvas(document.querySelector('#capture')).then((canvas) => {
    document.body.appendChild(canvas); // if you want see your screenshot in body.
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('download.pdf');
  });
};

const PdfEjemplo = () => {
  return (
    <>
      <h1>PDF</h1>
      <div id="capture">
        <p>Hello in my life</p>
        <span>How can hellp you</span>
      </div>
      <button onClick={_exportPdf}>Export PDF</button>
    </>
  );
};

export default PdfEjemplo;
