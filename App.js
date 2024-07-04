import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from './src/store/redux';
import { initUser } from './src/store/redux/user';
import AuthContextProvider, { AuthContext } from './src/store/context/auth-context';
import useFonts from './src/hooks/useFonts';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SplashScreen from 'expo-splash-screen';
import { HomeStackNavigator, UnAuthenticatedStackNavigator } from './src/navigation/StackNavigator';

const Navigation = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

const Root = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          authCtx.authenticate(storedToken);
          // Assuming `user` is stored as JSON and fetched similarly
          // const user = JSON.parse(await AsyncStorage.getItem('user') || null);
          // dispatch(initUser({ data: user }));
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      } finally {
        authCtx.setAuthenticating(false);
      }
    }

    async function hideSplashScreen() {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn('Error hiding splash screen:', error);
      }
    }

    fetchToken();
    hideSplashScreen();
  }, [authCtx]);

  if (authCtx.isAuthenticating) {
    return null; // Return null or loading indicator while authenticating
  } else {
    return <Navigation />;
  }
};

export default function App() {
  const { fontsLoaded, onLayoutRootView } = useFonts();

  if (!fontsLoaded) return null;

  let persistor = persistStore(store);

  return (
    <View className="flex-1 bg-white" onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthContextProvider>
            <RootSiblingParent>
              <Root />
            </RootSiblingParent>
          </AuthContextProvider>
        </PersistGate>
      </Provider>
    </View>
  );
}
