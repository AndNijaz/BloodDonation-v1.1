import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import RedHeader from "@/components/RedHeader";
// import RedHeader from "@/components/RedHeader";
import { Link } from "expo-router";
import InputRow from "@/components/InputRow";
import { useRouter } from "expo-router";
import { useSignUp } from "@/app/context/sign-up-context";
import NewButton from "@/components/NewButton";
import Subheader from "@/components/Subheader";
import { SafeAreaView } from "react-native";

export default function inputNameSurname() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const router = useRouter();

  const { signUpData, updateFirstLastName } = useSignUp();

  const handleContinue = () => {
    // console.log("Name:", name);
    // console.log("Surname:", surname);

    updateFirstLastName(name, surname);

    router.push("/(auth)/sign-up/choose-bloodtype");
  };

  console.log(signUpData);

  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
            title: "Name & Surname",
          }}
        />
        <RedHeader hasBack={true}>Step 2/5:</RedHeader>

        <View style={styles.formContainer}>
          <Subheader>Please Tell Us Your Name</Subheader>

          <InputRow
            value={name}
            setValue={setName}
            placeholder="Name"
            icon="account-outline"
          ></InputRow>

          <InputRow
            value={surname}
            setValue={setSurname}
            placeholder="Last Name"
            icon="account-circle-outline"
          ></InputRow>
        </View>

        <NewButton onSubmit={handleContinue}>Continue</NewButton>
      </View>
    </>
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
  safeArea: {
    backgroundColor: "#D61D23",
  },
});
