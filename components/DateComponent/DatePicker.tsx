import React from "react";
import { StyleSheet, Pressable } from "react-native";

import DateRow from "./DateRow";

import { month } from "../../Utils/dates";

export default function DatePicker({
  onClick,
  day,
  mont,
  year,
  style = {},
}: any) {
  return (
    <Pressable style={[styles.datePicker, style]} onPress={() => onClick()}>
      {/* <DateRow position="topTop">{[day, month(mont, 2), year]}</DateRow>
      <DateRow position="top">{[day, month(mont, 1), year]}</DateRow> */}
      <DateRow isFocused={true}>{[day, month(mont), year]}</DateRow>
      {/* <DateRow position="bottom">{[day, month(mont, -1), year]}</DateRow> */}
      {/* <DateRow position="bottomBottom">{[day, month(mont, -2), year]}</DateRow> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  datePicker: {
    marginBottom: 16,
  },
});
