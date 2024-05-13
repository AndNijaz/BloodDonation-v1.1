import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";

import DatePicker from "./DatePicker";
import { Picker } from "@react-native-picker/picker";
import { month } from "../Utils/dates";

const DATE = new Date();

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

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const YEARS = [
  DATE.getFullYear(),
  DATE.getFullYear() - 1,
  DATE.getFullYear() - 2,
];

// import { month } from "@/Utils/dates";
// mon;

export default function ImpedimentRow({
  impediment,
  day,
  month,
  year,
  onClick,
  handleRemoveImpediment,
}: any) {
  const [dan, setDan] = useState(DATE.getDate());

  return (
    <ScrollView style={styles.impedimentRow}>
      <View style={styles.header}>
        <Text style={styles.impedimentLabel}>{impediment}:</Text>
        <Pressable
          onPress={() => handleRemoveImpediment(impediment)}
          style={styles.removeButton}
        >
          <Text style={{ color: "#fff" }}>Remove</Text>
        </Pressable>
      </View>
      {/* <Text style={styles.impedimentDate}> */}
      {/* <DatePicker
          style={{ transform: [{ scale: 0.8 }] }}
          // day={new Date().getDate()}
          day={day}
          mont={month}
          year={year}
          onClick={onClick}
        /> */}
      <View style={styles.pickers}>
        <View style={styles.pickerContainer}>
          <Picker
            style={{ padding: -10 }}
            selectedValue={dan}
            onValueChange={(itemValue, itemIndex) => setDan(itemValue)}
          >
            {MONTHS.map((mont) => (
              <Picker.Item
                label={mont}
                value={mont}
                key={mont}
                style={styles.pickerItem}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={dan}
            onValueChange={(itemValue, itemIndex) => setDan(itemValue)}
          >
            {YEARS.map((mont) => (
              <Picker.Item
                label={year}
                value={year}
                key={year}
                style={styles.pickerItem}
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* </Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  pickerItem: {
    // color: "#fff",
    padding: 0,
    fontSize: 16,
  },
  pickers: {
    flexDirection: "row",
    gap: 16,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: "#D93F33",
    borderRadius: 8,
    // padding: ,
    width: "45%",
    // padding: 1,
    // fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#D93F33",
    padding: 8,
    borderRadius: 8,
  },
  impedimentDate: {
    width: "55%",
  },
  impedimentLabel: {
    // width: "20%",
  },
  impedimentRow: {
    // flexDirection: "row",
    // alignItems: "center",
    borderBottomColor: "#555",
    borderBottomWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    // backgroundColor: "#ccc",
  },
});
