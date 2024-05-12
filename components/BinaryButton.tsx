import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

export default function BinaryButton({
  stateVariable,
  onPressFunction,
  text,
  negative = false,
}: any) {
  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: (negative ? !stateVariable : stateVariable)
            ? "white"
            : "#D9D9D9",
          borderColor: (negative ? !stateVariable : stateVariable)
            ? "#F8B5BC"
            : "#D9D9D9",
          borderWidth: (negative ? !stateVariable : stateVariable) ? 2 : 0,
        },
      ]}
      onPress={onPressFunction}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: (negative ? !stateVariable : stateVariable)
              ? "#D61D23"
              : "black",
          },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 0,
    backgroundColor: "#D9D9D9",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingEnd: 24,
    borderRadius: 18,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});
