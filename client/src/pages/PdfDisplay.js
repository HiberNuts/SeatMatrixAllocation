import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import PdfDcoument from "../utils/PdfUtils/generatorPdf";
import { useLocation, useParams } from "react-router";

const PdfDisplay = (props) => {
  console.log(props.location.state);
  return (
    <PDFViewer style={{ height: "1000px" }}>
      <PdfDcoument collegeData={props.location.state} />
    </PDFViewer>
  );
};

export default PdfDisplay;
