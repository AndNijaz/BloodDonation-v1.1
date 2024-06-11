import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useRouter, Stack } from "expo-router";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/app/context/AuthProvider";

import { Picker } from "@react-native-picker/picker";
import RedHeader from "@/components/RedHeader";
import Subheader from "@/components/Subheader";

import { BLOODTYPES } from "../../../constants/Constats";

import Button from "@/components/Button";
import SafeArea from "@/components/SafeArea";

export default function ChooseBloodtype() {
  const { session, loading } = useAuth();
  const router = useRouter();

  const [bloodType, setBloodType] = useState<string>(BLOODTYPES[0].value);

  const handleContinue = async () => {
    if (session) {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .update({ blood_type: bloodType })
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.log("Error updating profile:", error.message);
        } else {
          console.log("Profile updated successfully:", data);
          router.push("/(auth)/sign-up/donated-before");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Bloodtype",
        }}
      />

      <SafeArea />

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
            onValueChange={(itemValue) => setBloodType(itemValue)}
          >
            <Picker.Item label="Select Blood Type" value="" enabled={false} />
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

      <Button onPress={handleContinue} text="Continue" />
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
    marginBottom: 16,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: "#D93F33",
    borderRadius: 8,
    padding: 8,
    width: "70%",
  },
});
