import { View, Text, StyleSheet } from "react-native";
import React from "react";
import DatePart from "./DatePart";

export default function DateRow({
  dateArr,
  position,
  isFocused,
  children,
}: any) {
  let classes = [styles.dateRow];

  if (position === "top") {
    classes.push(styles.grayedDateRowTop);
    // classes = [...classes, styles.grayedDateRowTop, styles.grayedDateRowTopTop];
  } else if (position === "topTop") {
    classes.push(styles.grayedDateRowTopTop);
  } else if (position === "bottom") {
    classes.push(styles.grayedDateRowBottom);
  } else if (position === "bottomBottom") {
    classes.push(styles.grayedDateRowBottomBottom);
  }
  // console.log(...children);
  return (
    <View style={[styles.dateRow, ...classes]}>
      {/* {dateArr.map((date: any) => (
        <DatePart isFocused={isFocused} key={date}>
          {date}
        </DatePart>
      ))} */}
      {children.map((date: any) => (
        <DatePart isFocused={isFocused} key={date}>
          {date}
        </DatePart>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
