import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

// Constants
import { currencyByRupee } from './constants';

// Component
import CurrencyButton from './components/CurrencyButton';

import Snackbar from 'react-native-snackbar';

const App = (): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#FFFFFF',
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    }
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              clearButtonMode="always" // Only for iOS
              onChangeText={setInputValue}
              keyboardType="number-pad"
              placeholder="Enter amount in Rupees"
              style={styles.inputAmountField}
              placeholderTextColor="#999"
            />
          </View>
          {resultValue && (
            <Text style={styles.resultTxt}>{resultValue}</Text>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.button,
                  targetCurrency === item.name && styles.selected,
                ]}
                onPress={() => buttonPressed(item)}
              >
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Updated background color
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  resultTxt: {
    fontSize: 32,
    color: '#333', // Updated text color
    fontWeight: 'bold', // Updated font weight
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#333', // Updated text color
    fontWeight: 'bold', // Updated font weight
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Updated background color
    borderRadius: 8, // Added border radius
    paddingVertical: 8, // Added padding
    paddingHorizontal: 16, // Added padding
  },
  inputAmountField: {
    height: 40,
    width: '100%',
    paddingHorizontal: 12, // Added padding
    backgroundColor: '#fff',
    borderRadius: 4,
    fontSize: 16, // Updated font size
  },
  bottomContainer: {
    flex: 3,
    padding: 16, // Added padding
  },
  button: {
    flex: 1,
    margin: 8, // Updated margin
    height: 80, // Updated height
    borderRadius: 8,
    backgroundColor: '#4CAF50', // Updated background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#FFC107', // Updated background color
  },
});

export default App;
