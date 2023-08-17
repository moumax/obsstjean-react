/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "./ModalSkyOfMonth.css";

function ModalSkyOfMonth(props) {
  const pdfUrl = "http://localhost:5000";

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // eslint-disable-next-line no-shadow
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const preventRightClick = (e) => {
    e.preventDefault();
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  useEffect(() => {
    document.addEventListener("contextmenu", preventRightClick);

    return () => {
      document.removeEventListener("contextmenu", preventRightClick);
    };
  }, []);

  if (!props.show) {
    return null;
  }
  return (
    <section className="modal-container">
      <Document
        className="PDFDocument"
        file={`${pdfUrl}/assets/sky/ciel.pdf`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page className="PDFPage PDFPageOne" pageNumber={pageNumber} />
      </Document>

      <div>
        <div>
          Page {pageNumber || (numPages ? 1 : "--")} sur {numPages || "--"}
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="Pre"
          >
            Prec
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Suiv
          </button>
          <button type="button" onClick={props.onClose}>
            Fermer
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModalSkyOfMonth;
