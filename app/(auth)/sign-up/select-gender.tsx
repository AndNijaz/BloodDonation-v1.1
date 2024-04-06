import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SelectGender() {
  return (
    <View>
      <Stack.Screen options={{ title: "Select Gender" }} />
      <Text>SelectGender</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
