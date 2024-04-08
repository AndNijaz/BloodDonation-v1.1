import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack, Link } from "expo-router";
// import { Link } from "expo-router";
import RedHeader from "@/components/RedHeader";
import { useRouter } from "expo-router";

export default function SelectGender() {
  const router = useRouter();

  function handleProceed() {
    router.push("/(user)/home");
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "",
        }}
      />
      <RedHeader hasBack={true} path={"/sign-up/donated-before"}>
        Step 5/5:
      </RedHeader>
      <Text>SelectGender</Text>
      <Link href="/(user)/home">Select Gender</Link>
      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        Proceed
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF5733",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
