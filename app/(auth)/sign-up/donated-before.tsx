import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { RadioButton } from "react-native-paper";
import { useRouter } from "expo-router";
import RedHeader from "@/components/RedHeader";
import { TouchableOpacity } from "react-native";

const DonationHistory = ({}) => {
  const [donated, setDonated] = useState("");
  const [lastDonation, setLastDonation] = useState("");
  const [lastDonationMonth, setLastDonationMonth] = useState("");
  const [lastDonationYear, setLastDonationYear] = useState("");

  const router = useRouter();

  const handleDonationChange = (value: string) => {
    setDonated(value);
    setLastDonation("");
    setLastDonationMonth("");
    setLastDonationYear("");
  };

  const handleLastDonationChange = (text: string) => {
    const value = text.replace(/[^0-9]/g, "");
    setLastDonation(value);

    if (value.length === 2) {
      setLastDonationMonth(value);
      setLastDonationYear("");
    } else if (value.length === 4) {
      setLastDonationYear(value.slice(2));
    } else {
      setLastDonationMonth("");
      setLastDonationYear("");
    }
  };

  const handleProceed = () => {
    if (donated === "") {
      alert("Please answer whether you have donated blood before.");
      return;
    }

    if (
      donated === "yes" &&
      (lastDonationMonth === "" || lastDonationYear === "")
    ) {
      alert("Please enter the month and year of your last donation.");
      return;
    }

    router.push("/(auth)/sign-up/select-gender");
  };

  return (
    <View style={styles.container}>
      <RedHeader hasBack={true}>Step 4/5</RedHeader>

      <Text style={styles.title}>About yourself</Text>
      <Text style={styles.question}>Did you donate blood before?</Text>
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={handleDonationChange} value={donated}>
          <View style={styles.radioButton}>
            <Text style={styles.radioText}>Yes</Text>
            <RadioButton value="yes" color={"#FF0000"} />
          </View>
          <View style={styles.radioButton}>
            <Text style={styles.radioText}>No</Text>
            <RadioButton value="no" color={"#FF0000"} />
          </View>
        </RadioButton.Group>
      </View>

      {donated === "yes" && (
        <>
          <Text style={styles.question}>If so, when?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={lastDonation}
              onChangeText={handleLastDonationChange}
              maxLength={2}
              keyboardType="number-pad"
            />
            <Text style={styles.label}>/</Text>
            <TextInput
              style={styles.input}
              value={lastDonationMonth}
              onChangeText={(text) => setLastDonationMonth(text.toUpperCase())}
              maxLength={3}
              keyboardType="default"
            />
            <Text style={styles.label}>/</Text>
            <TextInput
              style={styles.input}
              value={lastDonationYear}
              onChangeText={handleLastDonationChange}
              maxLength={2}
              keyboardType="number-pad"
            />
          </View>
        </>
      )}

      {/* <Button title="PROCEED" onPress={handleProceed} color="#FF0000" /> */}
      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        Proceed
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF5733",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF0000",
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioText: {
    fontSize: 16,
    color: "#000000",
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    padding: 5,
    width: 50,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: "#000000",
    marginHorizontal: 5,
  },
});

export default DonationHistory;
