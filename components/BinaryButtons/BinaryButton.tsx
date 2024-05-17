import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

export default function BinaryButton({
  stateVariable,
  onPressFunction,
  text,
  negative = false,
}: any) {
  const stylingCondition = negative ? !stateVariable : stateVariable;

  return (
    <Pressable
      style={[styles.button, stylingCondition ? styles.buttonTrue : null]}
      onPress={onPressFunction}
    >
      <Text
        style={[styles.buttonText, stylingCondition ? styles.textTrue : null]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    backgroundColor: "#D9D9D9",
    borderColor: "#D9D9D9",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingEnd: 24,
    borderRadius: 18,
  },
  buttonTrue: {
    backgroundColor: "white",
    borderColor: "#F8B5BC",
    borderWidth: 2,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  textTrue: {
    color: "#D61D23",
  },
});
