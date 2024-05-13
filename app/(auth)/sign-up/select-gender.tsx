import React, { useEffect, useReducer, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { useFetch } from "@/app/Hooks/useFetch";

import { supabase } from "@/lib/supabase";

import { useSignUp } from "@/app/context/sign-up-context";
import { useAuth } from "@/app/context/AuthProvider";

import { Picker } from "@react-native-picker/picker";
import RedHeader from "@/components/RedHeader";
import NewButton from "@/components/NewButton";
import Subheader from "@/components/Subheader";

import { GENDER } from "../../../constants/Constats";
import { IMPEDIMENTS } from "../../../constants/Constats";

import { parseDateToDatabase } from "../../../Utils/dates";
import { calculateNextTimeDonate } from "../../../Utils/dates";
import { checkCanDonatedNow } from "../../../Utils/dates";

export default function SelectGender() {
  const { data } = useFetch();

  const [gender, setGender] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");

  const [impedimentsList, setImpedimentsList] = useState(IMPEDIMENTS);
  const [selectedImpediments, setSelectedImpediments] = useState<any>([]);

  const { session } = useAuth();

  const { signUpData, updateLastTimeDonated }: any = useSignUp();

  const router = useRouter();

  useEffect(() => {
    // console.log(data[0].last_time_donated);
    setLastDonationDate(data ? data[0].last_time_donated : "");
    // console.log(data.last_time_donated);
  }, [data]);
  // console.log(lastDonationDate);
  // console.log(signUpData["last_time_donated"]);
  async function handleFinish() {
    // updateGender(gender);
    // console.log(lastDonationDate);

    let currentDate = new Date();
    let next_time_donated: any = new Date(lastDonationDate);

    // console.log(
    //   currentDate.getFullYear() === next_time_donated.getFullYear() ||
    //     Math.abs(currentDate.getMonth() - next_time_donated.getMonth()) > 3
    // );

    if (checkCanDonatedNow(next_time_donated, gender === "Female" ? 3 : 2)) {
      next_time_donated = parseDateToDatabase(new Date());
    } else {
      if (gender === "Female")
        next_time_donated = parseDateToDatabase(
          calculateNextTimeDonate(next_time_donated, 3)
        );
      else
        next_time_donated = parseDateToDatabase(
          calculateNextTimeDonate(next_time_donated, 2)
        );
    }

    // console.log(next_time_donated);

    // if (next_time_donated.getMonth())
    // if()
    // return;

    if (session) {
      // Update profile
      const { data, error } = await supabase
        .from("profiles")
        .update({
          gender: gender,
          next_time_donated: next_time_donated,
        })
        .eq("id", session.user.id)
        .single();

      if (error) {
        // Alert.alert("Error updating profile:", error.message);
      } else {
        // console.log("Profile updated successfully:", data);
        // Alert.alert("Profile updated successfully:", data);
      }
    }

    router.push("/(user)/home");
  }

  function handleSetGender(gender: any) {
    setGender(gender);
  }

  function handleSetImpediment(impediment: any) {
    // console.log(impedimentsList[0].value === impediment);
    setImpedimentsList((list) =>
      list.filter((imp) => imp.value !== impediment)
    );
    // console.log(impedimentsList);
    setSelectedImpediments((imp: any) => [...imp, impediment]);
  }

  function handleRemoveImpediment(impediment: any) {
    setSelectedImpediments((imp: any) =>
      imp.filter((imped: any) => imped !== impediment)
    );

    setImpedimentsList((list) => [
      ...list,
      IMPEDIMENTS.filter((imp: any) => imp.value === impediment)[0],
    ]);
  }

  return (
    <View style={styles.container}>
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
        <Subheader marginBottom={16}>Select Gender</Subheader>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => handleSetGender(itemValue)}
          >
            <Picker.Item value="" label="Gender" enabled={false} />
            {GENDER.map((gender) => (
              <Picker.Item
                label={gender.label}
                value={gender.value}
                key={gender.value}
              />
            ))}
          </Picker>
        </View>

        {gender && impedimentsList.length > 0 && (
          <>
            <>
              <Subheader marginBottom={16} textAlign={"center"}>
                Do any of these apply in the last six months
              </Subheader>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) =>
                    handleSetImpediment(itemValue)
                  }
                >
                  <Picker.Item
                    value=""
                    label="Choose Which Applies"
                    enabled={false}
                  />
                  {impedimentsList.map((gender) => (
                    <Picker.Item
                      label={gender.label}
                      value={gender.value}
                      key={gender.value}
                    />
                  ))}
                </Picker>
              </View>
            </>

            {selectedImpediments.length > 0 && (
              <View style={styles.impedimentContainer}>
                <View style={styles.impedimentHeader}>
                  <Text>Applies:</Text>
                </View>

                {selectedImpediments.map((impediment: any) => (
                  <View style={styles.impedimentRow} key={impediment}>
                    <Text>{impediment}</Text>
                    <Pressable
                      onPress={() => handleRemoveImpediment(impediment)}
                      style={styles.removeButton}
                    >
                      <Text style={{ color: "#fff" }}>Remove</Text>
                    </Pressable>
                  </View>
                ))}
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
  impedimentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  removeButton: {
    backgroundColor: "#D93F33",
    padding: 8,
    borderRadius: 8,
  },
  impedimentHeader: {
    borderBottomWidth: 2,
    paddingBottom: 8,
    flexDirection: "row",
    marginBottom: 8,
  },
  impedimentDateHeading: {
    paddingLeft: 16,
  },

  impedimentContainer: {
    width: "100%",
    padding: 16,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: "#D93F33",
    borderRadius: 8,
    padding: 8,
    width: "100%",
    marginBottom: 16,
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
