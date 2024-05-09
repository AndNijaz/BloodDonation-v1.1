import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Picker } from "react-native";
import RedHeader from "@/components/RedHeader";
import Subheader from "@/components/Subheader";
import NewButton from "@/components/NewButton";
import { Stack, useRouter } from "expo-router";
import { useSignUp } from "@/app/context/sign-up-context";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-date-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import DateTimePicker from "@react-native-community/datetimepicker";

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function generateItemsArray(start: number, end: number) {
  const items = [];
  for (let i = start; i <= end; i++) {
    items.push({ label: `${i}`, value: `${i}` });
  }
  return items;
}

const DonationHistory = ({}) => {
  const [donated, setDonated] = useState(false); // Changed to boolean for toggle state
  const [lastDonationDay, setLastDonationDay] = useState(""); // State for last donation day
  const [lastDonationMonth, setLastDonationMonth] = useState(""); // State for last donation month
  const [lastDonationYear, setLastDonationYear] = useState(""); // State for last donation year
  const [error, setError] = useState(""); // State for error message
  const router = useRouter();

  const { signUpData, updateLastTimeDonated, updateNextTimeDonated }: any =
    useSignUp();

  const handleProceed = () => {
    setError("");
    const initialDate = new Date(1900, 0, 1);
    if (!donated) {
      updateLastTimeDonated(
        `${initialDate.getFullYear()}-${
          initialDate.getMonth() + 1
        }-${initialDate.getDate()}`
      );
    }

    if (
      donated &&
      (!lastDonationDay || !lastDonationMonth || !lastDonationYear)
    ) {
      setError("Please enter the day, month, and year of your last donation.");
      return;
    }

    const day = parseInt(lastDonationDay, 10);
    const month = parseInt(lastDonationMonth, 10);
    const year = parseInt(lastDonationYear, 10);

    updateLastTimeDonated(`${year}-${month}-${day}`);

    updateNextTimeDonated(
      `${month < 10 ? year : year + 1}-${
        month == 10 ? 1 : month == 11 ? 2 : month + 2
      }-${day}`
    );

    router.push("/(auth)/sign-up/select-gender");
  };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    console.log(event);
    setDate(selectedDate);
    setShow(false);
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
              setShow: false;
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

        {donated && <Subheader marginBottom={0}>If so, when?</Subheader>}
        {donated && (
          <>
            <View
              style={[
                styles.dateRow,
                styles.grayedDateRowTop,
                styles.grayedDateRowTopTop,
              ]}
            >
              <Text style={[styles.dateLabel, styles.dateLabelNonFocus]}>
                {new Date().getDay()}
              </Text>
              <Text style={[styles.dateLabel, styles.dateLabelNonFocus]}>
                {months[new Date().getMonth()]}
              </Text>
              <Text style={[styles.dateLabel, styles.dateLabelNonFocus]}>
                {new Date().getFullYear()}
              </Text>
            </View>

            <View style={[styles.dateRow, styles.grayedDateRowTop]}>
              <Text style={[styles.dateLabel, styles.dateLabelNonFocus]}>
                {new Date().getDay()}
              </Text>
              <Text style={[styles.dateLabel, styles.dateLabelNonFocus]}>
                {months[new Date().getMonth()]}
              </Text>
              <Text style={[styles.dateLabel, styles.dateLabelNonFocus]}>
                {new Date().getFullYear()}
              </Text>
            </View>

            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>{new Date().getDay()}</Text>
              <Text style={styles.dateLabel}>
                {months[new Date().getMonth()]}
              </Text>
              <Text style={styles.dateLabel}>{new Date().getFullYear()}</Text>
            </View>

            <View style={[styles.dateRow, styles.grayedDateRowBottom]}>
              <Text style={[styles.dateLabel, styles.dateLabelNonFocus]}>
                {new Date().getDay()}
              </Text>
              <Text style={[styles.dateLabel, styles.dateLabelNonFocus]}>
                {months[new Date().getMonth()]}
              </Text>
              <Text style={[styles.dateLabel, styles.dateLabelNonFocus]}>
                {new Date().getFullYear()}
              </Text>
            </View>

            <View
              style={[
                styles.dateRow,
                styles.grayedDateRowBottom,
                styles.grayedDateRowBottomBottom,
              ]}
            >
              <Text style={[styles.dateLabel, styles.dateLabelNonFocus]}>
                {new Date().getDay()}
              </Text>
              <Text style={[styles.dateLabel, styles.dateLabelNonFocus]}>
                {months[new Date().getMonth()]}
              </Text>
              <Text style={[styles.dateLabel, styles.dateLabelNonFocus]}>
                {new Date().getFullYear()}
              </Text>
            </View>
          </>
        )}

        {donated && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            // is24Hour={true}
            onChange={() => onChange}
            display="spinner"
            style={{ borderRadius: 12 }}
            // dateFormat="day month year"
            // maximumDate={new Date(new Date().getDate() + 1)}
          />
        )}
        {donated && (
          <Subheader marginBottom={32}>
            (Provide at least month and year)
          </Subheader>
        )}

        {/* ANDROID */}

        {/* ------------- */}

        {/* IOS */}

        {/* ------------- */}
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
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  toggleText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  inputContainer: {
    marginTop: 20,
  },

  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  datePicker: {
    flexDirection: "row",
    gap: 12,
    marginEnd: 48,
    marginLeft: 48,
    marginBottom: 24,
  },

  dateRow: {
    position: "relative",
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 8,
    borderColor: "#DBDBDB",
    backgroundColor: "#f3f3f3",
    zIndex: 10,
  },
  dateLabel: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dateLabelNonFocus: {
    fontSize: 24,
    fontWeight: "normal",
  },
  grayedDateRowTop: {
    position: "relative",
    top: 10,
    transform: [{ scale: 0.9 }],
    opacity: 0.7,
    zIndex: 5,
  },
  grayedDateRowTopTop: {
    top: 30,
    transform: [{ scale: 0.8 }],
    opacity: 0.5,
    zIndex: 1,
  },
  grayedDateRowBottom: {
    position: "relative",
    top: -10,
    transform: [{ scale: 0.9 }],
    opacity: 0.7,
    zIndex: 5,
  },
  grayedDateRowBottomBottom: {
    top: -30,
    transform: [{ scale: 0.8 }],
    opacity: 0.5,
    zIndex: 1,
  },
});

export default DonationHistory;
