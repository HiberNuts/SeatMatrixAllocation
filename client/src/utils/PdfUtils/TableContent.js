import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import Courses from "./data.js";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // borderBottomColor: "black",
    // borderBottomWidth: 1,
    borderBottomColor: "black",
    backgroundColor: "white",
    color: "black",
    fontSize: "10px",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
    height: 20,
    textAlign: "center",
    flexGrow: 1,
  },
  courseName: {
    width: "30%",
  },
  common: {
    borderRightColor: "black",
    alignItems: "center",
  },
});
const TableContent = () => {
  const rows = Courses.map((item, index) => (
    <View style={styles.container}>
      <Text style={styles.common}>{index}</Text>
      <Text style={styles.courseName}>{item.courseName.label}</Text>
      <Text style={styles.common}>{item.courseCode}</Text>
      <Text style={styles.common}>{item.accredation.label}</Text>
      <Text style={styles.common}>{item.intake}</Text>
      <Text style={styles.common}>{item.Govt}</Text>
      <Text style={styles.common}>{item.Surrender}</Text>
      <Text style={styles.common}>{item.Management}</Text>
      <Text style={styles.common}>{item.SWS}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default TableContent;
