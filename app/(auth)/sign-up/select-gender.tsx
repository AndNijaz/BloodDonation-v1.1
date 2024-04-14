import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import { ScrollView } from "react-native";
import { FlatList } from "react-native";

function generateItemsArray(start: number, end: number) {
  const items = [];
  for (let i = start; i <= end; i++) {
    items.push({ label: `${i}`, value: `${i}` });
  }
  return items;
}

export default function SelectGender() {
  const [gender, setGender] = useState("");
  const [surgery, setSurgery] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [birth, setBirth] = useState(false);

  const [lastSurgeryDay, setLastSurgeryDay] = useState(""); // State for last donation day
  const [lastSurgeryMonth, setLastSurgeryMonth] = useState(""); // State for last donation month
  const [lastSurgeryYear, setLastSurgeryYear] = useState(""); // State for last donation year

  const [lastAlcoholDay, setLastAlcoholDay] = useState(""); // State for last donation day
  const [lastAlcoholMonth, setLastAlcoholMonth] = useState(""); // State for last donation month
  const [lastAlcoholYear, setLastAlcoholYear] = useState(""); // State for last donation year

  const [lastBirthDay, setLastBirthDay] = useState(""); // State for last donation day
  const [lastBirthMonth, setLastBirthMonth] = useState(""); // State for last donation month
  const [lastBirthYear, setLastBirthYear] = useState(""); // State for last donation year

  const { signUpData, updateGender } = useSignUp();

  const { session } = useAuth();

  const router = useRouter();

  async function handleFinish() {
    updateGender(gender);

    if (session) {
      // Update profile
      const { data, error } = await supabase
        .from("profiles")
        .update({
          first_name: signUpData.firstName,
          last_name: signUpData.lastName,
          blood_type: signUpData.bloodType,
          gender: signUpData.gender,
          last_time_donated: signUpData.lastTimeDonated,
          next_time_donated: signUpData.nextTimeDonated,

          // lastDonationDate: "NewLastDonationDate",
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

        <View style={styles.buttonsContainer}>
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: gender === "Male" ? "white" : "#D9D9D9",
                borderColor: gender === "Male" ? "#F8B5BC" : "#D9D9D9",
                borderWidth: gender === "Male" ? 2 : 0,
              },
            ]}
            onPress={() => setGender("Male")}
          >
            <Text
              style={[
                styles.buttonText,
                { color: gender === "Male" ? "#D61D23" : "black" },
              ]}
            >
              Male
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: gender === "Female" ? "white" : "#D9D9D9",
                borderColor: gender === "Female" ? "#F8B5BC" : "#D9D9D9",
                borderWidth: gender === "Female" ? 2 : 0,
              },
            ]}
            onPress={() => setGender("Female")}
          >
            <Text
              style={[
                styles.buttonText,
                { color: gender === "Female" ? "#D61D23" : "black" },
              ]}
            >
              Female
            </Text>
          </Pressable>
        </View>

        {gender !== "" && (
          <>
            <Subheader>Have you had surgery recently?</Subheader>
            <View style={styles.buttonsContainer}>
              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: surgery ? "white" : "#D9D9D9",
                    borderColor: surgery ? "#F8B5BC" : "#D9D9D9",
                    borderWidth: surgery ? 2 : 0,
                  },
                ]}
                onPress={() => setSurgery(true)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: surgery ? "#D61D23" : "black" },
                  ]}
                >
                  Yes
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: !surgery ? "white" : "#D9D9D9",
                    borderColor: !surgery ? "#F8B5BC" : "#D9D9D9",
                    borderWidth: !surgery ? 2 : 0,
                  },
                ]}
                onPress={() => setSurgery(false)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: surgery ? "#D61D23" : "black" },
                  ]}
                >
                  No
                </Text>
              </Pressable>
            </View>
            {surgery && <Subheader>If so, approximately when?</Subheader>}
            {surgery && (
              <View style={styles.datePicker}>
                <RNPickerSelect
                  style={{
                    inputIOS: styles.picker,
                    inputAndroid: styles.picker,
                    iconContainer: styles.picker,
                  }}
                  onValueChange={(value: string) => setLastSurgeryMonth(value)}
                  items={generateItemsArray(1, 12)}
                  value={lastSurgeryMonth}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{ label: "Month", value: null }}
                />

                <RNPickerSelect
                  style={{
                    inputIOS: styles.picker,
                    inputAndroid: styles.picker,
                    iconContainer: styles.picker,
                  }}
                  onValueChange={(value: string) => setLastSurgeryDay(value)}
                  items={generateItemsArray(1, 31)}
                  value={lastSurgeryDay}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{ label: "Day", value: null }}
                />
                <RNPickerSelect
                  style={{
                    inputIOS: styles.picker,
                    inputAndroid: styles.picker,
                    iconContainer: styles.picker,
                  }}
                  onValueChange={(value: string) => setLastSurgeryYear(value)}
                  items={generateItemsArray(
                    1900,
                    new Date().getFullYear()
                  ).reverse()}
                  value={lastSurgeryYear}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{ label: "Year", value: null }}
                />
              </View>
            )}
            <Subheader>
              Have you consumed alcohol in the last eight hours?
            </Subheader>
            <View style={styles.buttonsContainer}>
              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: alcohol ? "white" : "#D9D9D9",
                    borderColor: alcohol ? "#F8B5BC" : "#D9D9D9",
                    borderWidth: alcohol ? 2 : 0,
                  },
                ]}
                onPress={() => setAlcohol(true)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: alcohol ? "#D61D23" : "black" },
                  ]}
                >
                  Yes
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: !alcohol ? "white" : "#D9D9D9",
                    borderColor: !alcohol ? "#F8B5BC" : "#D9D9D9",
                    borderWidth: !alcohol ? 2 : 0,
                  },
                ]}
                onPress={() => setAlcohol(false)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: alcohol ? "#D61D23" : "black" },
                  ]}
                >
                  No
                </Text>
              </Pressable>
            </View>
          </>
        )}

        {gender === "Female" && (
          <>
            <Subheader>Have you given recently?</Subheader>
            <View style={styles.buttonsContainer}>
              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: birth ? "white" : "#D9D9D9",
                    borderColor: birth ? "#F8B5BC" : "#D9D9D9",
                    borderWidth: birth ? 2 : 0,
                  },
                ]}
                onPress={() => setBirth(true)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: birth ? "#D61D23" : "black" },
                  ]}
                >
                  Yes
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: !birth ? "white" : "#D9D9D9",
                    borderColor: !birth ? "#F8B5BC" : "#D9D9D9",
                    borderWidth: !birth ? 2 : 0,
                  },
                ]}
                onPress={() => setBirth(false)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: birth ? "#D61D23" : "black" },
                  ]}
                >
                  No
                </Text>
              </Pressable>
            </View>
            {birth && <Subheader>If so, approximately when?</Subheader>}
            {birth && (
              <View style={styles.datePicker}>
                <RNPickerSelect
                  style={{
                    inputIOS: styles.picker,
                    inputAndroid: styles.picker,
                    iconContainer: styles.picker,
                  }}
                  onValueChange={(value: string) => setLastBirthMonth(value)}
                  items={generateItemsArray(1, 12)}
                  value={setLastBirthMonth}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{ label: "Month", value: null }}
                />

                <RNPickerSelect
                  style={{
                    inputIOS: styles.picker,
                    inputAndroid: styles.picker,
                    iconContainer: styles.picker,
                  }}
                  onValueChange={(value: string) => setLastBirthDay(value)}
                  items={generateItemsArray(1, 31)}
                  value={lastBirthDay}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{ label: "Day", value: null }}
                />
                <RNPickerSelect
                  style={{
                    inputIOS: styles.picker,
                    inputAndroid: styles.picker,
                    iconContainer: styles.picker,
                  }}
                  onValueChange={(value: string) => setLastBirthDay(value)}
                  items={generateItemsArray(
                    1900,
                    new Date().getFullYear()
                  ).reverse()}
                  value={lastBirthYear}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{ label: "Year", value: null }}
                />
              </View>
            )}
          </>
        )}
      </View>

      <NewButton onSubmit={handleFinish}>Finish</NewButton>
    </View>
  );
}

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
    // flex: 1,
    // backgroundColor: "red",
    // overflow: "scroll",
    // flex: 1,
    paddingTop: 64,
    // paddingTop: 48,
    alignItems: "center",
    paddingStart: 48,
    paddingRight: 48,
    // marginBottom: 48,
    // paddingBottom: 148,
    // borderWidth: 2,
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
  //
});
