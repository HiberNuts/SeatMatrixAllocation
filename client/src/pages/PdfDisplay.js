import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import PdfDcoument from "../utils/BookletPDF/generatorPdf";
import { useLocation, useParams } from "react-router";
import { useState, useEffect } from "react";
import { backendURL } from "../backendurl";


const PdfDisplay = (props) => {
  const [collegedata, setcollegeData] = useState();
  const getCollegeInfo = async () => {
    fetch(`${backendURL}/collegeData`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setcollegeData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCollegeInfo();
  }, []);
  if (collegedata) {
    return (
      <PDFViewer style={{ height: "1000px" }}>
        <PDFViewer  width="100%" height="1000px">
        <PdfDcoument collegedata={collegedata}/>
      </PDFViewer>
      </PDFViewer>
    );
  } else {
    return null;    
  }
 
};

export default PdfDisplay;
