import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function SignUp() {
  return (
    <View>
      <Text>SignUp</Text>
      <Link href="/sign-up/choose-bloodtype">Choose BloodType</Link>
    </View>
  );
}

const styles = StyleSheet.create({});
