import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import RedHeader from "@/components/RedHeader";

export default function ChooseBloodtype() {
  const [bloodType, setBloodType] = useState("");

  const handleContinue = () => {
    console.log("BloodType:", bloodType);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your blood type:</Text>
      <RNPickerSelect
        onValueChange={(value: string) => setBloodType(value)}
        items={[
          { label: "A+", value: "A+" },
          { label: "A-", value: "A-" },
          { label: "B+", value: "B+" },
          { label: "B-", value: "B-" },
          { label: "AB+", value: "AB+" },
          { label: "AB-", value: "AB-" },
          { label: "O+", value: "O+" },
          { label: "O-", value: "O-" },
        ]}
        value={bloodType}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: "Select blood type...", value: null }}
      />

      <Link href={"./donated-before"}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          Continue
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingStart: 48,
    paddingRight: 48,
    alignItems: "center",
    height: "100%",
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
  title: {
    fontSize: 18,
    marginBottom: 32,
    color: "#161616",
  },
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
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF5733",
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
