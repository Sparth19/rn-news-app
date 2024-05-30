import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-devsettings/withAsyncStorage';
import AppNavigator from './src/navigators/AppNavigator';

const NEWS_API_KEY = process.env.NEWS_API_KEY;

const App: React.FC = () => {
  console.log(NEWS_API_KEY);
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
