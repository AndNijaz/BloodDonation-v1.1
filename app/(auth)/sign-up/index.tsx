import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import SignUpHeader from "@/components/SignUpHeader";
import { Stack } from "expo-router";

export default function SignUp() {
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Register",
        }}
      />
      <SignUpHeader>Register</SignUpHeader>
      <Text>SignUp</Text>
      <Link href="/sign-up/choose-bloodtype">Choose BloodType</Link>
    </View>
  );
}

const styles = StyleSheet.create({});
