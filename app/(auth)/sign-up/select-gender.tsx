import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Link } from "expo-router";
// import { Link } from "expo-router";
import SignUpHeader from "@/components/RedHeader";

export default function SelectGender() {
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "",
        }}
      />
      <SignUpHeader hasBack={true} path={"/sign-up/donated-before"}>
        Step 3/3:
      </SignUpHeader>
      <Text>SelectGender</Text>
      <Link href="/(user)/home">Select Gender</Link>
    </View>
  );
}

const styles = StyleSheet.create({});
