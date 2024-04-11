import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack, Link } from "expo-router";
// import { Link } from "expo-router";
import RedHeader from "@/components/RedHeader";
import { useRouter } from "expo-router";
import { useSignUp } from "@/app/context/sign-up-context";
import NewButton from "@/components/NewButton";
import Subheader from "@/components/Subheader";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import SafeArea from "@/components/SafeArea";
import { useAuth } from "@/app/context/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

export default function SelectGender() {
  const [gender, setGender] = useState("");

  const { signUpData, updateGender } = useSignUp();

  const { session } = useAuth();

  const router = useRouter();

  async function handleFinish() {
    updateGender("musko");

    if (session) {
      // Update profile
      const { data, error } = await supabase
        .from("profiles")
        .update({
          first_name: signUpData.firstName,
          last_name: signUpData.lastName,
          blood_type: signUpData.bloodType,
          // lastDonationDate: "NewLastDonationDate",
          gender: signUpData.gender,
        })
        .eq("id", session.user.id)
        .single();

      if (error) {
        Alert.alert("Error updating profile:", error.message);
      } else {
        console.log("Profile updated successfully:", data);
        Alert.alert("Profile updated successfully:", data);
        // Optionally, you can update state or perform other actions here
      }
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!clear context!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    router.push("/(user)/home");
  }

  console.log(signUpData);

  return (
    <View style={styles.container}>
      {/* <SafeArea /> */}
      <Stack.Screen
        options={{
          headerShown: false,
          title: "",
        }}
      />
      <RedHeader hasBack={true} path={"/sign-up/donated-before"}>
        Step 5/5:
      </RedHeader>
      <View style={styles.formContainer}>
        <Subheader>Select Gender</Subheader>
        <RNPickerSelect
          onValueChange={(value: string) => setGender(value)}
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
          value={gender}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: "Select blood type...", value: null }}
        />
        {/* <Link href="/(user)/home">Select Gender</Link> */}
      </View>
      <NewButton onSubmit={handleFinish}>Finish</NewButton>
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
});
