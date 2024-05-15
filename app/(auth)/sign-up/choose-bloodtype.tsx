import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useRouter, Stack } from "expo-router";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/app/context/AuthProvider";
import { useSignUp } from "@/app/context/sign-up-context";

import { useFetch } from "@/app/Hooks/useFetch";

import { Picker } from "@react-native-picker/picker";
import RedHeader from "@/components/RedHeader";
import NewButton from "@/components/NewButton";
import Subheader from "@/components/Subheader";

import { BLOODTYPES } from "../../../constants/Constats";

import { isEmpty } from "../../../Utils/checkEmpty";

export default function ChooseBloodtype() {
  // const { data } = useFetch();

  const { session, loading } = useAuth();

  // const { signUpData, updateBloodType } = useSignUp();

  const router = useRouter();

  const [bloodType, setBloodType] = useState(BLOODTYPES[0].value);

  // useEffect(() => {
  //   if (data && data.length > 0 && !isEmpty(data[0].blood_type))
  //     setBloodType(data[0].blood_type);
  // }, [data]);

  const handleContinue = () => {
    // updateBloodType(bloodType);

    async function updateBloodType() {
      console.log(bloodType);
      if (session) {
        // Update profile
        const { data, error } = await supabase
          .from("profiles")
          .update({
            blood_type: bloodType,
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

    updateBloodType();

    router.push("/(auth)/sign-up/donated-before");
  };

  // console.log(signUpData);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Bloodtype",
        }}
      />

      <RedHeader hasBack={true}>Step 3/5:</RedHeader>

      <View style={styles.formContainer}>
        <Subheader marginBottom={Platform.OS === "ios" ? 0 : 32}>
          Please Select Your Bloodtype
        </Subheader>

        <View
          style={[
            styles.pickerContainer,
            Platform.OS === "ios" && styles.containerIOS,
          ]}
        >
          <Picker
            selectedValue={bloodType}
            onValueChange={(itemValue, itemIndex) => setBloodType(itemValue)}
            // {Platform.OS === "ios" ? mode=}
          >
            {BLOODTYPES.map((bloodtype) => (
              <Picker.Item
                label={bloodtype.label}
                value={bloodtype.value}
                key={bloodtype.value}
              />
            ))}
          </Picker>
        </View>
      </View>

      <NewButton onSubmit={handleContinue}>Continue</NewButton>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerItemIOS: {
    backgroundColor: "#D93F33",
    borderWidth: 2,
  },
  containerIOS: {
    borderWidth: 0,
    width: "100%",
    // padding: 0,
    // backgroundColor: "black",
  },
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
  pickerContainer: {
    borderWidth: 2,
    borderColor: "#D93F33",
    borderRadius: 8,
    padding: 8,
    width: "70%",
  },
});
