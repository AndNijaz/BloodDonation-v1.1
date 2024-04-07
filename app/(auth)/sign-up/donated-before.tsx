import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Link } from "expo-router";
import SignUpHeader from "@/components/SignUpHeader";

export default function DonatedBefore() {
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Donated before?",
        }}
      />
      <SignUpHeader hasBack={true} path={"/sign-up/choose-bloodtype"}>
        Step 2/3:
      </SignUpHeader>
      <Text>DonatedBefore</Text>
      <Link href="/sign-up/select-gender">Donated Before</Link>
    </View>
  );
}

const styles = StyleSheet.create({});
