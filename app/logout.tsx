import { View, Text } from "@/components/Themed";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";

export default function Logout() {
  return (
    <View>
      <Text>logout</Text>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
