import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeArea() {
  return <SafeAreaView style={styles.safeArea} />;
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#D61D23",
  },
});
