import { View, StyleSheet, Text } from "@react-pdf/renderer";
import React from "react";

const borderColor = "#3778C2";
const styles = StyleSheet.create({
  container: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    flexDirection: "row",
    borderBottomColor: "black",
    backgroundColor: "white",
    color: "black",
    fontSize: "7px",
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
    width: "8%",
    borderRightColor: "black",
  },
});
const TableHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.common}>Sno</Text>
      <Text style={styles.courseName}>Course-Name</Text>
      <Text style={styles.common}>Course-Code</Text>
      <Text style={styles.common}>Accreditation</Text>
      <Text style={styles.common}>Santioned-Intake</Text>
      <Text style={styles.common}>Govt</Text>
      <Text style={styles.common}>Surrender</Text>
      <Text style={styles.common}>Management</Text>
      <Text style={styles.common}>SWS</Text>
    </View>
  );
};

export default TableHeader;
