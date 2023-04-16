import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import PdfDcoument from "../utils/PdfUtils/generatorPdf";

const PdfDisplay = () => {
  return (
    <div>
      <PdfDcoument />
    </div>
  );
};

export default PdfDisplay;
