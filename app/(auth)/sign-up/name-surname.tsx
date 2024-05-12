import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { supabase } from "@/lib/supabase";

// import { useSignUp } from "@/app/context/sign-up-context";
import { useAuth } from "@/app/context/AuthProvider";

import { useFetch } from "@/app/Hooks/useFetch";

import RedHeader from "@/components/RedHeader";
import InputRow from "@/components/InputRow";
import NewButton from "@/components/NewButton";
import Subheader from "@/components/Subheader";

import { isEmpty } from "../../../Utils/checkEmpty";

export default function inputNameSurname() {
  const { data } = useFetch();

  const { session, loading } = useAuth();

  // const { signUpData, updateFirstLastName }: any = useSignUp();

  const router = useRouter();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);

  useEffect(() => {
    if (
      data &&
      data.length > 0 &&
      !isEmpty(data[0].first_name) &&
      !isEmpty(data[0].last_name)
    ) {
      setName(data[0].first_name);
      setSurname(data[0].last_name);
    }
  }, [data]);

  function checkIsEmpty() {
    if (isEmpty(name)) setNameError(true);
    if (isEmpty(surname)) setSurnameError(true);
  }

  function resetErrors() {
    setNameError(false);
    setSurnameError(false);
  }

  const handleContinue = () => {
    checkIsEmpty();
    resetErrors();

    // updateFirstLastName(name, surname);

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
          console.log("Error updating profile:", error.message);
        } else {
          console.log("Profile updated successfully:", data);
          // Alert.alert("Profile updated successfully:", data);
        }
      }
    }

    updateNames();

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
        />
        {nameError && <Text style={styles.errorText}>Name is required</Text>}

        <InputRow
          value={surname}
          setValue={setSurname}
          placeholder="Last Name"
          icon="account-circle-outline"
          error={!!surnameError}
        />
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
