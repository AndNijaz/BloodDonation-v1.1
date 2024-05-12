import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function DatePart({ children, isFocused }: any) {
  return (
    <Text style={[styles.dateLabel, isFocused ? styles.dateLabelFocus : {}]}>
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
