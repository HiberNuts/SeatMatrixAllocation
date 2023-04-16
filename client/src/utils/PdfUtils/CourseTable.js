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

const CourseTable = () => {
  return (
    <View style={styles.tableContainer}>
      <TableHeader />
      {/* <TableHeader /> */}
      <TableContent />
      {/* <InvoiceTableRow items={invoice.items} />
      <InvoiceTableFooter items={invoice.items} /> */}
    </View>
  );
};

export default CourseTable;
