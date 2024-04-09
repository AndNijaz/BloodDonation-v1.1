import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const days = ["01", "02", "03", "04", "05", "06", "07"];
const months = ["January", "February", "March", "April", "May", "June"];
const years = ["2022", "2023", "2024", "2025", "2026"];

export default function Nesto() {
  const [selectedDay, setSelectedDay] = useState(days[2]); // Default: 03
  const [selectedMonth, setSelectedMonth] = useState(months[4]); // Default: May
  const [selectedYear, setSelectedYear] = useState(years[2]); // Default: 2024

  const handleDaySelect = (day) => setSelectedDay(day);
  const handleMonthSelect = (month) => setSelectedMonth(month);
  const handleYearSelect = (year) => setSelectedYear(year);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => handleDaySelect(day)}
            style={[
              styles.item,
              {
                backgroundColor:
                  day === selectedDay ? "#FF69B4" : "transparent",
              },
            ]}
          >
            <Text style={{ color: day === selectedDay ? "white" : "black" }}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.column}>
        {months.map((month) => (
          <TouchableOpacity
            key={month}
            onPress={() => handleMonthSelect(month)}
            style={[
              styles.item,
              {
                backgroundColor:
                  month === selectedMonth ? "#FF69B4" : "transparent",
              },
            ]}
          >
            <Text
              style={{ color: month === selectedMonth ? "white" : "black" }}
            >
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.column}>
        {years.map((year) => (
          <TouchableOpacity
            key={year}
            onPress={() => handleYearSelect(year)}
            style={[
              styles.item,
              {
                backgroundColor:
                  year === selectedYear ? "#FF69B4" : "transparent",
              },
            ]}
          >
            <Text style={{ color: year === selectedYear ? "white" : "black" }}>
              {year}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  item: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
