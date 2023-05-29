import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import Logo from "../../layout/logo/Logo";
// Create styles
import LogoDark2x from "../../images/logo-dark2x.png";
import CourseTable from "./CourseTable";
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    border: "4px solid black",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "90%",
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  Logo: {
    width: "80px",
    height: "80px",
    objectPosition: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  Center: {
    top: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: window.innerWidth,
  },
  HeaderText: {
    fontSize: "20px",

    color: "black",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5px",
  },

  Field: {
    fontSize: "10px",
  },
  decl: {
    fontWeight: "extralight",
    fontSize: "10px",
  },
  box: {
    width: "300px",
    height: "100px",
  },
  warning: {
    color: "red",
    fontSize: "12px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
});

const PdfDcoument = ({ collegeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View styles={styles.header}>
        <Image style={styles.Logo} src={LogoDark2x} />
        <Text style={styles.HeaderText}>Directorate of Technical Education - Chennai</Text>
        <Text style={styles.HeaderText}>Tamil Nadu Engineering Admission</Text>
      </View>
      <View styles={styles.Center}>
        <View style={{ display: "flex" }}>
          <Text style={styles.Field} src={LogoDark2x}>
            College Name : <Text>{collegeData?.can}</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.Field} src={LogoDark2x}>
            College Code : <Text>{collegeData?.ccode}</Text>
          </Text>
          <Text style={styles.Value} src={LogoDark2x}></Text>
        </View>
      </View>
      <CourseTable collegeData={collegeData} />
      <View>
        <Text style={styles.decl}>
          We, declare that we have thoroughly reviewed and verified all seat allocation matrix for TNEA. We have ensured
          that all seats have been allocated appropriately and that no further changes will be made to the allocation
          matrix without proper authorization from the relevant authorities. We take full responsibility for any errors
          or omissions that may have occurred during the verification process and certify that all changes made to the
          matrix were necessary and within the scope of the project/task/assignment.
        </Text>
      </View>

      <View>
        <Text style={styles.box}></Text>
        <Text style={{ fontSize: "15px" }}>Principal Signature</Text>
      </View>
      <View>
        <Text style={styles.warning}>*Please sign this document and upload it in the documents upload section</Text>
      </View>
    </Page>
  </Document>
);

export default PdfDcoument;
