import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeArea() {
  return <SafeAreaView style={styles.safeArea} />;
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#D61D23",
  },
});
