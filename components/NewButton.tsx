import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function NewButton({
  onSubmit,
  children,
}: {
  onSubmit: () => void;
  children: string;
}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onSubmit}>
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 48,
    marginRight: 48,
    marginTop: "auto",
    height: 50,
    backgroundColor: "#D61D23",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
