import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Colors, FONTS, FONT_SIZE} from './src/themes/AppTheme';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.text}>Hello world</Text>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.Poppins700,
    fontSize: FONT_SIZE.large,
    color: Colors.black,
  },
});
