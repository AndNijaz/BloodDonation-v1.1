import React from "react";
import { StyleSheet, Text } from "react-native";

export default function DatePart({ children, isFocused }: any) {
  return (
    <Text style={[styles.dateLabel, isFocused ? styles.dateLabelFocus : null]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  dateLabel: {
    fontSize: 24,
    fontWeight: "normal",
  },
  dateLabelFocus: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
