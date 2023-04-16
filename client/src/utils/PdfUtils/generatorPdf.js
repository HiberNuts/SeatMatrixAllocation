import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import Logo from "../../layout/logo/Logo";
// Create styles
import Courses from "./data";
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
    height: "100%",
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  Logo: {
    width: "100px",
    height: "100px",
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
    fontWeight: "bold",
    color: "black",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5px",
  },

  Field: {
    fontSize: "18px",
  },
  decl: {
    fontWeight: "extralight",
    fontSize: "12px",
  },
  box: {
    border: "1px solid black",
    width: "300px",
    height: "100px",
  },
});
const PdfDcoument = () => {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View styles={styles.Center}>
            <Image style={styles.Logo} src={LogoDark2x} />
            <Text style={styles.HeaderText}>Tamil Nadu Engineering Association</Text>
          </View>
          <View styles={styles.Center}>
            <View style={{ display: "flex" }}>
              <Text style={styles.Field} src={LogoDark2x}>
                College Name: Government college of Technology
              </Text>
            </View>
            <View>
              <Text style={styles.Field} src={LogoDark2x}>
                College Code: 2005
              </Text>
              <Text style={styles.Value} src={LogoDark2x}></Text>
            </View>
          </View>
          <CourseTable />
          <View>
            <Text style={styles.decl}>
              We, declare that I have thoroughly reviewed and verified all seat allocation matrix for TNEA. I have
              ensured that all seats have been allocated appropriately and that no further changes will be made to the
              allocation matrix without proper authorization from the relevant authorities. I take full responsibility
              for any errors or omissions that may have occurred during the verification process and certify that all
              changes made to the matrix were necessary and within the scope of the project/task/assignment.
            </Text>
          </View>
          <View>
            <Text style={styles.box}></Text>
            <Text style={styles.decl}>Principal Signature</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfDcoument;
