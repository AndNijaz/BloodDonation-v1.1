import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function InputRow({
  value,
  setValue,
  placeholder,
  error,
  icon,
}: {
  value: string;
  setValue: (newValue: string) => void;
  placeholder: string;
  error?: boolean;
  icon: any;
}) {
  function handleChange(e: any) {
    setValue(e);
  }

  function handleOnFocus() {
    setInputFocused(true);
  }

  function handleOnBlur() {
    setInputFocused(false);
  }

  const [inputFocused, setInputFocused] = useState(false);

  return (
    <View
      style={[
        styles.inputBlock,
        inputFocused ? styles.focusedInputBlock : null,
      ]}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={24} color="#D93F33" />
      </View>

      <TextInput
        style={[styles.input, error && styles.errorInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={(e) => handleChange(e)}
        placeholderTextColor="gray"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBlock: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    marginTop: 0,
  },
  focusedInputBlock: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: -5,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#ECECEC",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
  iconContainer: {
    borderWidth: 1.5,
    borderColor: "#D93F33",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "white",
  },
});
