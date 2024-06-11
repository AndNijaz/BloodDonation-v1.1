import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/app/context/AuthProvider";

import DateTimePicker from "@react-native-community/datetimepicker";
import RedHeader from "@/components/RedHeader";
import Subheader from "@/components/Subheader";
import DatePicker from "@/components/DateComponent/DatePicker";
import BinaryButtons from "@/components/BinaryButtons/BinaryButtons";
import SafeArea from "@/components/SafeArea";

import { parseDateToDatabase } from "../../../Utils/dates";
import Button from "@/components/Button";

const DonationHistory = ({}) => {
  const { session, loading } = useAuth();
  const router = useRouter();

  const [donated, setDonated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const handleChangeDate = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) setDate(selectedDate);
    setShow(false);
  };

  const handleYes = () => {
    setShow(true);
    setDonated(true);
  };

  const handleNo = () => {
    setShow(false);
    setDonated(false);
  };

  const handleProceed = async () => {
    setError("");

    const initialDate = new Date(1900, 0, 1);

    const toDatabaseDate = donated
      ? parseDateToDatabase(date)
      : parseDateToDatabase(initialDate);

    if (session) {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .update({ last_time_donated: toDatabaseDate })
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.log("Error updating profile:", error.message);
        } else {
          console.log("Profile updated successfully:", data);
          router.push("/(auth)/sign-up/select-gender");
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
          title: "Donated Before",
        }}
      />

      <SafeArea />

      <RedHeader hasBack={true}>Step 4/5</RedHeader>

      <View style={styles.formContainer}>
        <Subheader marginBottom={32}>Did you donate blood before?</Subheader>

        <BinaryButtons
          stateVariable={donated}
          onPressFunctionOne={handleYes}
          onPressFunctionTwo={handleNo}
          textOne="Yes"
          textTwo="No"
        />

        {donated && Platform.OS !== "ios" && (
          <>
            <Subheader marginBottom={16}>If so, when?</Subheader>
            <DatePicker
              day={date.getDate()}
              mont={date.getMonth()}
              year={date.getFullYear()}
              onClick={() => setShow(true)}
            />
          </>
        )}

        {(Platform.OS === "ios" || show) && donated && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            onChange={handleChangeDate}
            display="spinner"
            style={{ borderRadius: 12 }}
            maximumDate={new Date()}
          />
        )}

        {donated && (
          <Subheader marginBottom={32}>
            Provide at least correct month and year
          </Subheader>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button onPress={handleProceed} text="Proceed" />
    </View>
  );
};

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
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default DonationHistory;
