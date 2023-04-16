import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import PdfDcoument from "../utils/PdfUtils/generatorPdf";
import { useLocation, useParams } from "react-router";

const PdfDisplay = (props) => {
  console.log(props.location.state);
  return (
    <div>
      <PdfDcoument collegeData={props.location.state} />
    </div>
  );
};

export default PdfDisplay;
