import React, {FC, useLayoutEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, FONTS, FONT_SIZE} from '../../themes/AppTheme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {size} from '../../themes/Metrics';

const HomeScreen: FC = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: Colors.white,
      },
      headerLeft: () => <Text style={styles.headerTitle}>Latest News</Text>,
    });
  }, [navigation]);

  return <SafeAreaView style={styles.screen}></SafeAreaView>;
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontFamily: FONTS.Poppins600,
    fontSize: FONT_SIZE.medium,
    color: Colors.primary,
    marginHorizontal: size(20),
    letterSpacing: 0.2,
  },
});
