import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import RedHeader from "@/components/RedHeader";
import InputRow from "@/components/InputRow";
import { useRouter } from "expo-router";
import { useSignUp } from "@/app/context/sign-up-context";
import NewButton from "@/components/NewButton";
import Subheader from "@/components/Subheader";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/app/context/AuthProvider";
import { useFetch } from "@/app/Hooks/useFetch";

export default function inputNameSurname() {
  // console.log("muhameeeeeeeedeeeeeeeeeeeeeeeee");
  // console.log(dataa ? dataa[0].first_name : "kurac");
  // console.log("a");
  // console.log(dataa[0]);
  // console.log("muhameeeeeeeedeeeeeeeeeeeeeeeee");

  const [name, setName] = useState();

  const { dataa } = useFetch(setName);

  const [surname, setSurname] = useState("");
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);

  const router = useRouter();

  const { session, loading } = useAuth();

  const { signUpData, updateFirstLastName }: any = useSignUp();

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

    async function updateNames() {
      if (session) {
        // Update profile
        const { data, error } = await supabase
          .from("profiles")
          .update({
            first_name: name,
            last_name: surname,
          })
          .eq("id", session.user.id)
          .single();

        if (error) {
          // Alert.alert("Error updating profile:", error.message);
        } else {
          console.log("Profile updated successfully:", data);
          // Alert.alert("Profile updated successfully:", data);
        }
      }
    }

    updateNames();
    console.log("zizonizo");
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

      <RedHeader>Step 2/5:</RedHeader>

      <View style={styles.formContainer}>
        <Subheader marginBottom={32}>Please Tell Us Your Name</Subheader>

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
