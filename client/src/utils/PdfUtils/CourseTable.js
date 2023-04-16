import { View, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#3778C2",
  },
});

const CourseTable = ({ collegeData }) => {
  return (
    <View style={styles.tableContainer}>
      <TableHeader />
      <TableContent collegeData={collegeData} />
    </View>
  );
};

export default CourseTable;
