import { View, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    marginHorizontal:"5px",
    borderTop: "1px solid black",
    // minHeight:"100%",
    marginBottom: "50px",
  },
});

const CourseTable = ({ collegeData }) => {
  console.log("Here is the CourseTable", collegeData);
  return (
    <View style={styles.tableContainer}>
      <TableHeader />
      <TableContent collegeData={collegeData} />
    </View>
  );
};

export default CourseTable;
