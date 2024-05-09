import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";

const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
};

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

  const [inputFocused, setInputFocused] = useState(false);

  return (
    <View
      style={[
        styles.inputBlock,
        {
          shadowColor: inputFocused ? "#000" : "",
          shadowOffset: inputFocused
            ? { width: 0, height: 2 }
            : { width: 0, height: 0 },
          shadowOpacity: inputFocused ? 0.25 : 0,
          shadowRadius: inputFocused ? 4 : 0,
          elevation: inputFocused ? 5 : 0,
          marginTop: inputFocused ? -5 : 0,
        },
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
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
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
    // elevation: 5,
    backgroundColor: "white",
  },
});
