import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function AlreadyHaveLabelLink({
  path,
  children,
  linkText,
}: {
  path: string;
  children: string;
  linkText: string;
}) {
  return (
    <View style={styles.row}>
      <Text>{children}</Text>
      <Link href={`../${path}`} style={styles.link}>
        {linkText}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 12,
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
  },
  link: {
    color: "#D61D23",
    textDecorationLine: "underline",
  },
});
