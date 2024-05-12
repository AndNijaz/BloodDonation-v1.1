import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import RedHeader from "@/components/RedHeader";
import Subheader from "@/components/Subheader";
import NewButton from "@/components/NewButton";
import { Stack, useRouter } from "expo-router";
import { useSignUp } from "@/app/context/sign-up-context";
import DatePicker from "@/components/DatePicker";

import DateTimePicker from "@react-native-community/datetimepicker";

import { parseDateToDatabase } from "../../../Utils/parseDateToDatabase";

const DonationHistory = ({}) => {
  const [donated, setDonated] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const { signUpData, updateLastTimeDonated }: any = useSignUp();

  const handleChangeDate = (event, selectedDate) => {
    console.log(selectedDate);
    setDate(selectedDate);
    setShow(false);
  };

  const handleProceed = () => {
    setError("");

    const initialDate = new Date(1900, 0, 1);

    if (!donated) updateLastTimeDonated(parseDateToDatabase(initialDate));
    else updateLastTimeDonated(parseDateToDatabase(date));

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

        <View style={styles.buttonsContainer}>
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: donated ? "white" : "#D9D9D9",
                borderColor: donated ? "#F8B5BC" : "#D9D9D9",
                borderWidth: donated ? 2 : 0,
              },
            ]}
            onPress={() => {
              setDonated(true);
              setShow(true);
            }}
          >
            <Text
              style={[
                styles.buttonText,
                { color: donated ? "#D61D23" : "black" },
              ]}
            >
              Yes
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: !donated ? "white" : "#D9D9D9",
                borderColor: !donated ? "#F8B5BC" : "#D9D9D9",
                borderWidth: !donated ? 2 : 0,
              },
            ]}
            onPress={() => {
              setDonated(false);
              setShow(false);
            }}
          >
            <Text
              style={[
                styles.buttonText,
                { color: !donated ? "#D61D23" : "black" },
              ]}
            >
              No
            </Text>
          </Pressable>
        </View>

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
  button: {
    borderWidth: 0,
    backgroundColor: "#D9D9D9",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingEnd: 24,
    borderRadius: 18,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderRadius: 18,
    marginBottom: 32,
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
  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default DonationHistory;
