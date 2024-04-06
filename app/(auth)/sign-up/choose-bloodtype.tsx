import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function ChooseBloodtype() {
  return (
    <View>
      <Stack.Screen options={{ title: "Choose Bloodtype" }} />

      <Text>ChooseBloodtype</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
