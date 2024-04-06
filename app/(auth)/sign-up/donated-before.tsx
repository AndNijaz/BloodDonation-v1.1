import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function DonatedBefore() {
  return (
    <View>
      <Stack.Screen options={{ title: "Donated before?" }} />
      <Text>DonatedBefore</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
