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
import SafeArea from "@/components/SafeArea";

export default function inputNameSurname() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);

  const router = useRouter();

  const { signUpData, updateFirstLastName } = useSignUp();

  function checkIsEmpty() {
    if (name.trim() === "") setNameError(true);

    if (surname.trim() === "") setSurnameError(true);
  }

  function resetErrors() {
    setNameError(false);
    setSurnameError(false);
  }

  const handleContinue = () => {
    checkIsEmpty();
    resetErrors();

    if (name.trim() === "" || surname.trim() === "") return;

    updateFirstLastName(name, surname);
    router.push("/(auth)/sign-up/choose-bloodtype");
  };

  return (
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
          error={!!nameError}
        ></InputRow>
        {nameError && <Text style={styles.errorText}>Name is required</Text>}

        <InputRow
          value={surname}
          setValue={setSurname}
          placeholder="Last Name"
          icon="account-circle-outline"
          error={!!surnameError}
        ></InputRow>
        {surnameError && (
          <Text style={styles.errorText}>Surname is required</Text>
        )}
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
    alignItems: "center",
    paddingStart: 48,
    paddingRight: 48,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});
