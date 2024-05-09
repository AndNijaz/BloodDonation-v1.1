import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native";

export default function NewButton({
  onSubmit,
  children,
}: {
  onSubmit: () => void;
  children: string;
}) {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TouchableOpacity
      style={[styles.button, { marginTop: keyboardOpen ? 200 : "auto" }]}
      onPress={onSubmit}
    >
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 48,
    marginRight: 48,
    marginTop: "auto",
    position: "static",
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
