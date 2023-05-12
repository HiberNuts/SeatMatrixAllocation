import { View, StyleSheet, Text } from "@react-pdf/renderer";
import React from "react";

const borderColor = "#3778C2";
const styles = StyleSheet.create({
  container: {
    margin: "5px",
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
    fontWeight:"bold",

  },
  common: {
    width: "12%",
    fontWeight:"bold",
    borderRightColor: "black",
  },
});
const TableHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.common}>Sl.No</Text>
      <Text style={styles.common}>Course Code</Text>
      <Text style={styles.courseName}>Course Name</Text>
      <Text style={styles.common}>Intake</Text>
      <Text style={styles.common}>Start Year</Text>
      <Text style={styles.common}>Accredation</Text>
      <Text style={styles.common}>NBA Valid upto</Text>
    </View>
  );
};

export default TableHeader;
