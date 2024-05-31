import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as StoreProvider} from 'react-redux';
import 'react-native-devsettings/withAsyncStorage';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StoreProvider store={store}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </StoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
