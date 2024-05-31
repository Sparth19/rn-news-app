import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import NewsDetailScreen from '../screens/home/NewsDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
      <Stack.Screen name={'NewsDetailScreen'} component={NewsDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
