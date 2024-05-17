import React from "react";
import { StyleSheet, View } from "react-native";

import BinaryButton from "./BinaryButton";

export default function BinaryButtons({
  stateVariable,
  onPressFunctionOne,
  onPressFunctionTwo,
  textOne,
  textTwo,
}: any) {
  return (
    <View style={styles.buttonsContainer}>
      <BinaryButton
        stateVariable={stateVariable}
        onPressFunction={onPressFunctionOne}
        text={textOne}
      />
      <BinaryButton
        stateVariable={stateVariable}
        onPressFunction={onPressFunctionTwo}
        text={textTwo}
        negative={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderRadius: 18,
    marginBottom: 32,
  },
});
