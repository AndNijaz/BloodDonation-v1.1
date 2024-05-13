import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { supabase } from "@/lib/supabase";

import { useSignUp } from "@/app/context/sign-up-context";
import { useAuth } from "@/app/context/AuthProvider";

import { useFetch } from "@/app/Hooks/useFetch";

import DateTimePicker from "@react-native-community/datetimepicker";
import RedHeader from "@/components/RedHeader";
import Subheader from "@/components/Subheader";
import NewButton from "@/components/NewButton";
import DatePicker from "@/components/DatePicker";
import BinaryButtons from "@/components/BinaryButtons";

import { parseDateToDatabase } from "../../../Utils/dates";

const DonationHistory = ({}) => {
  // const { data } = useFetch();

  const { session, loading } = useAuth();

  // const { signUpData, updateLastTimeDonated }: any = useSignUp();

  const router = useRouter();

  const [donated, setDonated] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleChangeDate = (event: any, selectedDate: any) => {
    // console.log(selectedDate);
    setDate(selectedDate);
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

  const handleProceed = () => {
    setError("");

    const initialDate = new Date(1900, 0, 1);

    let toDatabaseDate: any;
    if (!donated) toDatabaseDate = parseDateToDatabase(initialDate);
    else toDatabaseDate = parseDateToDatabase(date);

    // updateLastTimeDonated(toDatabaseDate);
    // if (!donated) updateLastTimeDonated(parseDateToDatabase(initialDate));
    // else updateLastTimeDonated(parseDateToDatabase(date));

    async function updateBloodType() {
      if (session) {
        // Update profile
        const { data, error } = await supabase
          .from("profiles")
          .update({
            last_time_donated: toDatabaseDate,
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

    router.push("/(auth)/sign-up/select-gender");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Donated Before",
        }}
      />

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

        {donated && (
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

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            onChange={handleChangeDate}
            display="spinner"
            style={{ borderRadius: 12 }}
          />
        )}

        {donated && (
          <Subheader marginBottom={32}>
            (Provide at least month and year)
          </Subheader>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      <NewButton onSubmit={handleProceed}>Proceed</NewButton>
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
