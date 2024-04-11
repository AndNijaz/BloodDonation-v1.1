import { View, Text } from "@/components/Themed";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";

export default function Logout() {
  return (
    <View>
      {/* ?!!! figure out logout */}
      <Button onPress={() => supabase.auth.signOut()} text="Sign Out" />

      <Text>logout</Text>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
