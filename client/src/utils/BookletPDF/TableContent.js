import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import Courses from "./data.js";

const styles = StyleSheet.create({
  container: {
    margin: "5px",
    // padding:"5px",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    flexDirection: "row",
    borderBottomColor: "black",
    backgroundColor: "white",
    color: "black",
    fontSize: "8px",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
    height: 20,
    textAlign: "center",
    flexGrow: 1,
  },
  courseName: {
    width: "36%",
  },
  common: {
    width: "12%",
    borderRightColor: "black",
  },
});
const TableContent = ({ collegeData }) => {
 
  const rows = collegeData?.Booklet.CourseDetails?.map((item, index) => (
    <View style={styles.container}>
      <Text style={styles.common}>{index+1}</Text>
      <Text style={styles.common}>{item.courseCode}</Text>
      <Text style={styles.courseName}>{item.courseName.label}</Text>
      <Text style={styles.common}>{item.intake}</Text>
      <Text style={styles.common}>{item.year}</Text>
      <Text style={styles.common}>{item.accredation.label}</Text>
      <Text style={styles.common}>{item.accUpto?item.accUpto:"-"}</Text>


      




      {/* <Text style={styles.common}>{item.courseCode}</Text>
      <Text style={styles.courseName}>{item.courseName}</Text> */}
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default TableContent;
