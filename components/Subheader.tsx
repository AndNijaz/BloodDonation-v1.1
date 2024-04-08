import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Subheader({ children }: { children: string }) {
  return <Text style={styles.subheader}>{children}</Text>;
}

const styles = StyleSheet.create({
  subheader: {
    fontSize: 18,
    marginBottom: 32,
    color: "#161616",
  },
});
