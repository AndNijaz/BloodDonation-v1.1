import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';

const DonationHistory = ({}) => {
  const [donated, setDonated] = useState('');
  const [lastDonation, setLastDonation] = useState('');
  const [lastDonationMonth, setLastDonationMonth] = useState('');
  const [lastDonationYear, setLastDonationYear] = useState('');

  const handleDonationChange = (value:string) => {
    setDonated(value);
    setLastDonation('');
    setLastDonationMonth('');
    setLastDonationYear('');
  };

  const handleLastDonationChange = (text:string) => {
    const value = text.replace(/[^0-9]/g, '');
    setLastDonation(value);

    if (value.length === 2) {
      setLastDonationMonth(value);
      setLastDonationYear('');
    } else if (value.length === 4) {
      setLastDonationYear(value.slice(2));
    } else {
      setLastDonationMonth('');
      setLastDonationYear('');
    }
  };

  const handleProceed = () => {
    if (donated === '') {
      alert('Please answer whether you have donated blood before.');
      return;
    }

    if (donated === 'yes' && (lastDonationMonth === '' || lastDonationYear === '')) {
      alert('Please enter the month and year of your last donation.');
      return;
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About yourself</Text>
      <Text style={styles.question}>Did you donate blood before?</Text>
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={handleDonationChange} value={donated}>
          <View style={styles.radioButton}>
            <Text style={styles.radioText}>Yes</Text>
            <RadioButton value="yes" color={'#FF0000'} />
          </View>
          <View style={styles.radioButton}>
            <Text style={styles.radioText}>No</Text>
            <RadioButton value="no" color={'#FF0000'} />
          </View>
        </RadioButton.Group>
      </View>

      {donated === 'yes' && (
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

      <Button title="PROCEED" onPress={handleProceed} color="#FF0000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    fontSize: 16,
    color: '#000000',
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    padding: 5,
    width: 50,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#000000',
    marginHorizontal: 5,
  },
});

export default DonationHistory;
