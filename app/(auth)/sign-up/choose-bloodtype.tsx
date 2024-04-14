import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import RedHeader from "@/components/RedHeader";
import { useRouter } from "expo-router";
import { useSignUp } from "@/app/context/sign-up-context";
import NewButton from "@/components/NewButton";
import { Stack } from "expo-router";
import InputRow from "@/components/InputRow";
import Subheader from "@/components/Subheader";
import SafeArea from "@/components/SafeArea";

export default function ChooseBloodtype() {
  const [bloodType, setBloodType] = useState("");

  const { signUpData, updateBloodType } = useSignUp();

  const router = useRouter();

  const handleContinue = () => {
    // console.log("BloodType:", bloodType);

    updateBloodType(bloodType);

    router.push("/(auth)/sign-up/donated-before");
  };

  console.log(signUpData);

  return (
    <View style={styles.container}>
      {/* <SafeArea /> */}
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Bloodtype",
        }}
      />

      <RedHeader hasBack={true}>Step 3/5:</RedHeader>

      <View style={styles.formContainer}>
        <Subheader>Please Select Your Bloodtype</Subheader>

        <RNPickerSelect
          style={{
            inputIOS: styles.picker,
            inputAndroid: styles.picker,
            iconContainer: styles.picker,
          }}
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
          useNativeAndroidPickerStyle={false}
        />
      </View>

      <NewButton onSubmit={handleContinue}>Continue</NewButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 48,
  },
  formContainer: {
    paddingTop: 64,
    // paddingTop: 48,
    alignItems: "center",
    paddingStart: 48,
    paddingRight: 48,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#D93F33",
    borderRadius: 8,
    padding: 16,
    color: "#D93F33",
    fontSize: 48,
    textAlign: "center",
  },
});
