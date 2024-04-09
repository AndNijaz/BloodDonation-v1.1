import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
// import { RadioButton } from "react-native-paper";
import { useRouter } from "expo-router";
import RedHeader from "@/components/RedHeader";
import { TouchableOpacity } from "react-native";
import { useSignUp } from "@/app/context/sign-up-context";
import NewButton from "@/components/NewButton";
import { Stack } from "expo-router";
import Subheader from "@/components/Subheader";

const DonationHistory = ({}) => {
  const [donated, setDonated] = useState(false);
  const [lastDonation, setLastDonation] = useState("");
  const [lastDonationMonth, setLastDonationMonth] = useState("");
  const [lastDonationYear, setLastDonationYear] = useState("");

  const { signUpData, updateLastDonated } = useSignUp();

  const router = useRouter();

  const handleDonationChange = (value: boolean) => {
    setDonated();
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

    updateLastDonated(
      donated,
      lastDonation,
      lastDonationMonth,
      lastDonationYear
    );
  };

  console.log(signUpData);

  const handleProceed = () => {
    if (donated && (lastDonationMonth === "" || lastDonationYear === "")) {
      alert("Please enter the month and year of your last donation.");
      return;
    }

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
      </View>
      <NewButton onSubmit={handleProceed}>Proceed</NewButton>
    </View>
  );
};

const styles = StyleSheet.create({
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
    // paddingTop: 48,
    alignItems: "center",
    paddingStart: 48,
    paddingRight: 48,
  },
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
  buttonYes: {},
  buttonNo: {},
});

export default DonationHistory;
