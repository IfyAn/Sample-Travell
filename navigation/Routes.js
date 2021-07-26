import React, {useContext, useState, useEffect} from 'react';
import { StyleSheet,  View } from 'react-native'
//import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { DrawerContent } from '../screens/DrawerContent';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Drawer = createDrawerNavigator();

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  // toggleTheme: () => {
  //   setIsDarkTheme( isDarkTheme => !isDarkTheme );
  // }

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

   if (initializing) return null;
  // if (initializing){
  //   return(
  //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  //       <LottieView source={require('../assets/36093-world-tour.json')} autoPlay loop />
  //     </View>
  //   );
  // }

  return (
    <PaperProvider theme={theme}>
    <NavigationContainer theme={theme}>
      {user ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={AppStack} />
        </Drawer.Navigator>)
      : <AuthStack />}
    </NavigationContainer>
    </PaperProvider>
  );
};

export default Routes;