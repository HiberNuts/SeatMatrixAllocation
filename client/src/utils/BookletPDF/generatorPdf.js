import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import Logo from "../../layout/logo/Logo";
import LogoDark2x from "../../images/logo-dark2x.png";
import TableContent from "./TableContent";
import CourseTable from "./CourseTable";
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    border: "2px solid black",
    // margin:"15px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "90%",
    // width:"90%"
    // margin:"auto",
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
  clgHeaderText: {
    fontSize: "12px",
    color: "black",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5px",
    marginBottom: "5px",
    padding: "5px",
  },
  subHeaderText: {
    fontSize: "15px",
    color: "black",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5px",
  },

  Field: {
    fontSize: "15px",
    marginLeft:"auto",
    marginRight:"auto",
    textAlign:"center",
    width: "50%",
    marginBottom:"5px"
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
  sectionTitle:{
    fontSize: "12px",
    padding: "5px",
    justifyContent:"center",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    width:"100%",
    textAlign:"center",
    flexDirection: "column",
    alignSelf: "center",
    border: "2px solid black",
    
  } ,
  row: {
    flexDirection: "row",
    alignItems: "center",
    // border: "2px solid black",
  },
  description: {
    border: "1px solid black",
    padding: "5px",
    fontSize: "10px",
    width: "50%",
  },
  cell: {
    border: "1px solid black",
    padding: "5px",
    fontSize: "10px",
    width: "50%",
  },
  tableContainer: {
    flexDirection: "col",
    flexWrap: "wrap",
    margin: "5px",
  },
  flexBox:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding:''
  
  },
  sign:{
    fontSize: "15px",
    color: "blue",
    padding: "5px",
    position: "fixed",
    left: 0,
    bottom: 0,
    height:"200px",
    // marginLeft: "100%",
    // marginRight: "auto",
    margin: "5px",
    textAlign:"right"
  }
});
 
const PdfDcoument = ({ collegedata })=> {
  const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View styles={styles.Center}>
        <Image style={styles.Logo} src={LogoDark2x} />
        <Text style={styles.HeaderText}>TAMIL NADU ENGINNERING ADMISSION 2023</Text>
        <Text style={styles.subHeaderText}>DIRECTORATE OF TECHNICAL EDUCATION</Text>
        <Text style={styles.subHeaderText}>BOOKLET INFORMATION</Text>
        <Text style={styles.clgHeaderText}>{collegedata?.ccode}-{collegedata?.can}</Text>
        <Text style={styles.sectionTitle}> COLLEGE INFORMATION</Text>
        <View style={styles.flexBox}>
          {/* Basic Information */}
        <View style={styles.tableContainer}>
       <View style={styles.row}>
      <Text style={styles.description}>Principal Name</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Personal.PrincipalName}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Email</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Personal.Email}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Phone</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Personal.PhoneNumber}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Website</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Personal.Website}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Number</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Personal.PhoneNumber}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Taluk</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Personal.Taluk}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>District</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Personal.District}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Address</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Personal.Address}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Pincode</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Personal.Pincode}</Text>
      </View>
        </View>
        <View style={styles.tableContainer}>
       <View style={styles.row}>
      <Text style={styles.description}>Bank</Text>
      <Text style={styles.description}>{collegedata?.Booklet.BankDetails.Bank1.Name}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Account Number</Text>
      <Text style={styles.description}>{collegedata?.Booklet.BankDetails.Bank1.AccNo}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Autonomous</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Personal.Autonomous?"Yes":"No"}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Minory</Text>
      <Text style={styles.description}>{["NM", "CENTRAL GOVT", "GOVT", "GOVT AIDED", "UNIV"].includes(collegedata?.Category)?"No":"Yes"}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Distance from Headquaters</Text>
      <Text style={styles.description}>{collegedata.Booklet.Infrastructure.DHQ}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Nearest Railway Station</Text>
      <Text style={styles.description}>{collegedata.Booklet.Infrastructure.railway}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Distance from Railway</Text>
      <Text style={styles.description}>{collegedata.Booklet.Infrastructure.DRS}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>NACC Status</Text>
      <Text style={styles.description}>{collegedata.Booklet.Personal.NACC.Status?"Yes":"No"}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>NACC Grade</Text>
      <Text style={styles.description}>{collegedata.Booklet.Personal.NACC.Grade?collegedata.Booklet.Personal.NACC.Grade:"-"}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>NACC Valid Upto</Text>
      <Text style={styles.description}>{collegedata.Booklet.Personal.NACC.ValidUpto?collegedata.Booklet.Personal.NACC.Grade:"-"}</Text>
      </View>
        </View>
        </View>
        
        <Text style={styles.sectionTitle}> HOSTEL FEES AND FACILITIES</Text>
        <View style={styles.flexBox}>
          {/* Basic Information */}
        <View style={styles.tableContainer}>
          <Text style={styles.Field}> Boys </Text>
       <View style={styles.row}>
      <Text style={styles.description}>Accomodation available</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.acc.boys?"Yes":"No"}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Hostel stay type</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.htype.boys}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Mess Type</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.mess.boys}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Mess Bill (Rs./Month)</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.bill.boys}</Text>
      </View>
      
      <View style={styles.row}>
      <Text style={styles.description}>Room Rent (Rs./Month)</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.rent.boys}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Electricity Bill (Rs./Year)</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.elec.boys}</Text>
      </View>
        </View>
        <View style={styles.tableContainer}>
          <Text style={styles.Field}> Girls </Text>
       <View style={styles.row}>
      <Text style={styles.description}>Accomodation available</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.acc.girls?"Yes":"No"}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Hostel stay type</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.htype.girls}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Mess Type</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.mess.girls}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Mess Bill (Rs./Month)</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.bill.girls}</Text>
      </View>
      
      <View style={styles.row}>
      <Text style={styles.description}>Room Rent (Rs./Month)</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.rent.girls}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Electricity Bill (Rs./Year)</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.elec.girls}</Text>
      </View>
        </View>
        </View>
        <View style={styles.flexBox}>
          {/* Basic Information */}
        <View style={styles.tableContainer}>
          
       <View style={styles.row}>
      <Text style={styles.description}>Caution Deposit</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.caution}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Establishment Fee(Rs./Year)</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.estab}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.description}>Admission Fee(Rs./Year)</Text>
      <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.adm}</Text>
      </View>
        </View>
        <View style={styles.tableContainer}>
          
          <View style={styles.row}>
         <Text style={styles.description}>Transport Facility</Text>
         <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.transport?"Yes":"No"}</Text>
         </View>
         <View style={styles.row}>
         <Text style={styles.description}>Min Transport Fee</Text>
         <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.mintrans}</Text>
         </View>
         <View style={styles.row}>
         <Text style={styles.description}>Max Transport Fee</Text>
         <Text style={styles.description}>{collegedata?.Booklet.Infrastructure.maxtrans}</Text>
         </View>
           </View>
  
        </View>
        </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <View>
       <Text style={styles.sectionTitle}> LIST OF COURSES OFFERED</Text>    
        <CourseTable collegeData={collegedata}></CourseTable> 
      </View>  
      <View style={styles.sign}> 
        <Text >
          Signature of Head of Institute (with seal)
        </Text>
        <Text>
          Date: {currentDate}
        </Text>
      </View>
       
    </Page>
  </Document>
);
}

export default PdfDcoument;
