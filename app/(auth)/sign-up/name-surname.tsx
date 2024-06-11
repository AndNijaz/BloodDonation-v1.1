import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/app/context/AuthProvider";

import RedHeader from "@/components/RedHeader";
import InputRow from "@/components/InputRow";
import Button from "@/components/Button";
import Subheader from "@/components/Subheader";

import { isEmpty } from "../../../Utils/checkEmpty";

export default function inputNameSurname() {
  const { session, loading } = useAuth();

  const router = useRouter();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [errors, setErrors] = useState<{ name: boolean; surname: boolean }>({
    name: false,
    surname: false,
  });

  const checkIsEmpty = () => {
    setErrors({
      name: isEmpty(name),
      surname: isEmpty(surname),
    });
  };

  const handleContinue = useCallback(async () => {
    checkIsEmpty();

    if (!isEmpty(name) && !isEmpty(surname)) {
      if (session) {
        try {
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
          }
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      }
      router.push("/(auth)/sign-up/choose-bloodtype");
    }
  }, [name, surname, session, router]);

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
          error={errors.name}
        />
        {errors.name && <Text style={styles.errorText}>Name is required</Text>}

        <InputRow
          value={surname}
          setValue={setSurname}
          placeholder="Last Name"
          icon="account-circle-outline"
          error={errors.surname}
        />
        {errors.surname && (
          <Text style={styles.errorText}>Surname is required</Text>
        )}
      </View>

      <Button onPress={handleContinue} text="Continue" />
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
