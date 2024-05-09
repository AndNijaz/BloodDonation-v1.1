import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Subheader({
  children,
  marginBottom,
}: {
  children: string;
  marginBottom?: any;
}) {
  return (
    <Text style={[styles.subheader, { marginBottom: marginBottom }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  subheader: {
    fontSize: 18,
    color: "#161616",
  },
});
