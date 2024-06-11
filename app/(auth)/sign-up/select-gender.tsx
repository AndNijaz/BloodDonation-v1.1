import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import { useFetch } from "@/app/Hooks/useFetch";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/app/context/AuthProvider";

import { Picker } from "@react-native-picker/picker";
import RedHeader from "@/components/RedHeader";
import Button from "@/components/Button";
import Subheader from "@/components/Subheader";

import { GENDER } from "../../../constants/Constats";
import { IMPEDIMENTS } from "../../../constants/Constats";

import { parseDateToDatabase } from "../../../Utils/dates";
import { calculateNextTimeDonate } from "../../../Utils/dates";
import { checkCanDonatedNow } from "../../../Utils/dates";
import SafeArea from "@/components/SafeArea";

const SelectGender: React.FC = () => {
  const { data } = useFetch();
  const { session } = useAuth();
  const router = useRouter();

  const [gender, setGender] = useState<string>("");
  const [lastDonationDate, setLastDonationDate] = useState<string>("");
  const [impedimentsList, setImpedimentsList] = useState(IMPEDIMENTS);
  const [selectedImpediments, setSelectedImpediments] = useState<string[]>([]);

  useEffect(() => {
    if (data && data[0].last_time_donated)
      setLastDonationDate(data[0].last_time_donated);
  }, [data]);

  async function handleFinish() {
    const today = new Date();
    const lastDonation = new Date(lastDonationDate);
    const monthsDifference = gender === "Female" ? 2 : 3;

    let nextTimeDonated;

    if (checkCanDonatedNow(lastDonation, monthsDifference)) {
      nextTimeDonated = today;
    } else {
      nextTimeDonated = calculateNextTimeDonate(lastDonation, monthsDifference);
    }

    if (session) {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .update({
            gender: gender,
            next_time_donated: parseDateToDatabase(nextTimeDonated),
          })
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error updating profile:", error.message);
        } else {
          console.log("Profile updated successfully:", data);
          router.push("/(user)/home");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  }

  const handleSetGender = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleSetImpediment = (impediment: string) => {
    setImpedimentsList((list) =>
      list.filter((imp) => imp.value !== impediment)
    );
    setSelectedImpediments((imp) => [...imp, impediment]);
  };

  const handleRemoveImpediment = (impediment: string) => {
    setSelectedImpediments((imp) => imp.filter((i) => i !== impediment));
    setImpedimentsList((list) => [
      ...list,
      IMPEDIMENTS.find((imp) => imp.value === impediment)!,
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeArea />

      <Stack.Screen options={{ headerShown: false, title: "" }} />
      <RedHeader hasBack={true}>Step 5/5:</RedHeader>

      <View style={styles.formContainer}>
        <Subheader marginBottom={Platform.OS === "ios" ? 8 : 16}>
          Select Gender
        </Subheader>
        <View
          style={[
            styles.pickerContainer,
            Platform.OS === "ios" && styles.containerIOS,
          ]}
        >
          <Picker selectedValue={gender} onValueChange={handleSetGender}>
            <Picker.Item value="" label="Gender" enabled={false} />
            {GENDER.map((g) => (
              <Picker.Item label={g.label} value={g.value} key={g.value} />
            ))}
          </Picker>
        </View>

        {gender && impedimentsList.length > 0 && (
          <>
            <Subheader marginBottom={16} textAlign={"center"}>
              Do any of these apply in the last six months
            </Subheader>
            <View style={styles.pickerContainer}>
              <Picker selectedValue="" onValueChange={handleSetImpediment}>
                <Picker.Item
                  value=""
                  label="Choose Which Applies"
                  enabled={false}
                />
                {impedimentsList.map((imp) => (
                  <Picker.Item
                    label={imp.label}
                    value={imp.value}
                    key={imp.value}
                  />
                ))}
              </Picker>
            </View>
          </>
        )}

        {selectedImpediments.length > 0 && (
          <View style={styles.impedimentContainer}>
            <View style={styles.impedimentHeader}>
              <Text>Applies:</Text>
            </View>
            {selectedImpediments.map((impediment) => (
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
      </View>

      <Button onPress={handleFinish} text="Finish" />
    </ScrollView>
  );
};

export default SelectGender;

const styles = StyleSheet.create({
  containerIOS: {
    borderWidth: 2,
    width: "100%",
    // height: "50%",
  },
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
    marginBottom: 48,
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
