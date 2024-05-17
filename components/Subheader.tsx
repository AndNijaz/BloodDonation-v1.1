import { StyleSheet, Text } from "react-native";
import React from "react";

export default function Subheader({
  children,
  marginBottom,
  textAlign,
}: {
  children: string;
  marginBottom?: any;
  textAlign?: any;
}) {
  return (
    <Text
      style={[
        styles.subheader,
        { marginBottom: marginBottom },
        { textAlign: textAlign },
      ]}
    >
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
