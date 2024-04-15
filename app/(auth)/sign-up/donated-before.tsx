import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import RedHeader from "@/components/RedHeader";
import Subheader from "@/components/Subheader";
import NewButton from "@/components/NewButton";
import { Stack, useRouter } from "expo-router";
import { useSignUp } from "@/app/context/sign-up-context";
import RNPickerSelect from "react-native-picker-select";

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

  const { signUpData, updateLastTimeDonated, updateNextTimeDonated } =
    useSignUp();

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const isValidDay = (day, month, year) => {
    if (!day || !month || !year) return true; // Allow empty fields
    const maxDays = [
      31,
      isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    return day >= 1 && day <= maxDays[month - 1];
  };

  const isValidMonth = (month) => {
    if (!month) return true; // Allow empty field
    return month >= 1 && month <= 12;
  };

  const isValidYear = (year) => {
    if (!year) return true; // Allow empty field
    const currentYear = new Date().getFullYear();
    return /^\d{4}$/.test(year) && year >= 1950 && year <= currentYear;
  };

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

    if (!isValidDay(day, month, year)) {
      setError("Please enter a valid day for the selected month and year.");
      return;
    }

    if (!isValidMonth(month)) {
      setError("Please enter a valid month (1-12).");
      return;
    }

    if (!isValidYear(year)) {
      setError(
        "Please enter a valid four-digit year between 1900 and the current year."
      );
      return;
    }

    const currentDate = new Date();

    updateLastTimeDonated(`${year}-${month}-${day}`);
    console.log(`${year}-${month}-${day}`);
    updateNextTimeDonated(
      `${month < 10 ? year : year + 1}-${
        month == 10 ? 1 : month == 11 ? 2 : month + 2
      }-${day}`
    );
    console.log(
      `${month < 10 ? year : year + 1}-${
        month == 10 ? 1 : month == 11 ? 2 : month + 2
      }-${day}`
    );

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
        <Subheader>Did you donate blood before?</Subheader>
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
            onPress={() => setDonated(true)}
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
            onPress={() => setDonated(false)}
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

        {donated && <Subheader>If so, when?</Subheader>}
        {donated && (
          <View style={styles.datePicker}>
            <RNPickerSelect
              style={{
                inputIOS: styles.picker,
                inputAndroid: styles.picker,
                iconContainer: styles.picker,
              }}
              onValueChange={(value: string) => setLastDonationMonth(value)}
              items={generateItemsArray(1, 12)}
              value={lastDonationMonth}
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Month", value: null }}
            />

            <RNPickerSelect
              style={{
                inputIOS: styles.picker,
                inputAndroid: styles.picker,
                iconContainer: styles.picker,
              }}
              onValueChange={(value: string) => setLastDonationDay(value)}
              items={generateItemsArray(1, 31)}
              value={lastDonationDay}
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Day", value: null }}
            />
            <RNPickerSelect
              style={{
                inputIOS: styles.picker,
                inputAndroid: styles.picker,
                iconContainer: styles.picker,
              }}
              onValueChange={(value: string) => setLastDonationYear(value)}
              items={generateItemsArray(
                1900,
                new Date().getFullYear()
              ).reverse()}
              value={lastDonationYear}
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Year", value: null }}
            />
          </View>
        )}
        {donated && <Subheader>(Provide at least month and year)</Subheader>}
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
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
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
  picker: {
    borderWidth: 1,
    borderColor: "#D93F33",
    borderRadius: 8,
    padding: 16,
    color: "#D93F33",
    fontSize: 24,
    textAlign: "center",
  },
});

export default DonationHistory;
