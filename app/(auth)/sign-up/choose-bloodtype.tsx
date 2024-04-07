import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import SignUpHeader from "@/components/SignUpHeader";

export default function ChooseBloodtype() {
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Choose Bloodtype",
        }}
      />

      <SignUpHeader hasBack={true} path={"/sign-up/"}>
        Step 1/3:
      </SignUpHeader>
      {/* <Text>ChooseBloodtype</Text> */}
      <Link href="/sign-up/donated-before">Choose BloodType</Link>
    </View>
  );
}

const styles = StyleSheet.create({});
