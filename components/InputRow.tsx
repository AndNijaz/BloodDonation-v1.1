import { StyleSheet, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";

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

  return (
    <View style={styles.inputBlock}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={24} color="#D93F33" />
      </View>
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={(e) => handleChange(e)}
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
    elevation: 5,
  },
});
