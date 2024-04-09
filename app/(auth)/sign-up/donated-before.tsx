import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  TouchableOpacity,
} from "react-native";
import RedHeader from "@/components/RedHeader";
import Subheader from "@/components/Subheader";
import NewButton from "@/components/NewButton";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SafeArea from "@/components/SafeArea";

const DonationHistory = ({}) => {
  const [donated, setDonated] = useState(false); // Changed to boolean for toggle state
  const [lastDonationDay, setLastDonationDay] = useState(""); // State for last donation day
  const [lastDonationMonth, setLastDonationMonth] = useState(""); // State for last donation month
  const [lastDonationYear, setLastDonationYear] = useState(""); // State for last donation year
  const [error, setError] = useState(""); // State for error message
  const router = useRouter();

  const handleDonationChange = (value) => {
    setDonated(value);
    if (!value) {
      // Reset last donation date if the toggle is set to "No"
      setLastDonationDay("");
      setLastDonationMonth("");
      setLastDonationYear("");
      setError(""); // Clear error message
    }
  };

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
        "Please enter a valid four-digit year between 1950 and the current year."
      );
      return;
    }

    router.push("/(auth)/sign-up/select-gender");
  };

  return (
    <View style={styles.container}>
      {/* <SafeArea /> */}
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
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonYes,
              {
                backgroundColor: donated ? "white" : "#D9D9D9",
                borderColor: donated ? "#F8B5BC" : "#D9D9D9",
                borderWidth: donated ? 2 : 0,
                // text: donated ? "white" : "#D61D23",
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
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonNo,
              {
                backgroundColor: !donated ? "white" : "#D9D9D9",
                borderColor: !donated ? "#F8B5BC" : "#D9D9D9",
                borderWidth: !donated ? 2 : 0,
                // text: donated ? "white" : "#D61D23",
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
          </TouchableOpacity>
        </View>

        {donated && <Subheader>If so, when?</Subheader>}
        {donated && (
          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <TextInput
                style={[
                  styles.input,
                  {
                    width: 50,
                    borderColor: isValidDay(
                      lastDonationDay,
                      lastDonationMonth,
                      lastDonationYear
                    )
                      ? "#ccc"
                      : "red",
                  },
                ]}
                placeholder="DD"
                value={lastDonationDay}
                onChangeText={setLastDonationDay}
                keyboardType="numeric"
                maxLength={2}
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    width: 50,
                    borderColor: isValidMonth(lastDonationMonth)
                      ? "#ccc"
                      : "red",
                  },
                ]}
                placeholder="MM"
                value={lastDonationMonth}
                onChangeText={setLastDonationMonth}
                keyboardType="numeric"
                maxLength={2}
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    width: 100,
                    borderColor: isValidYear(lastDonationYear) ? "#ccc" : "red",
                  },
                ]}
                placeholder="YYYY"
                value={lastDonationYear}
                onChangeText={setLastDonationYear}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
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
    // borderTopLeftRadius: 0,
    borderRadius: 18,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  buttonsContainer: {
    // width: "100%",
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
  },
});

export default DonationHistory;
