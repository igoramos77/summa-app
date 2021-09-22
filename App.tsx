import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';


import theme from './src/global/styles/theme';

import AppRouts from './src/routs/app.routs';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if(!fontsLoaded) {
    return (<AppLoading />)
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRouts />
      </NavigationContainer>
    </ThemeProvider>
  );
}