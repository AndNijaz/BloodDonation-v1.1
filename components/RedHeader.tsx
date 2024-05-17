import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RedHeader({
  children,
  hasBack,
}: {
  children: string;
  hasBack?: boolean;
}) {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <LinearGradient
      colors={["#D61D23", "#EB7C83"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.headerContainer}
    >
      {hasBack && (
        <Pressable onPress={handleBack} style={styles.linkText}>
          <MaterialCommunityIcons
            name="arrow-left-bold-circle-outline"
            size={32}
            color="white"
          />
        </Pressable>
      )}

      <Text style={styles.headerText}>{children}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomRightRadius: 90,
    borderBottomLeftRadius: 90,
    padding: 24,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 200,
  },
  linkText: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "white",
    fontSize: 16,
  },
  headerText: {
    color: "white",
    fontSize: 44,
    marginBottom: 12,
  },
});
