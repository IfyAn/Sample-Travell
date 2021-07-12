import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value)=>{
      if(value==null){
        AsyncStorage.setItem('alreadylaunched', 'true');
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })

  }, [])

  if( isFirstLaunch===null){
    return null
  } else if(isFirstLaunch===true){
    routeName= 'Onboarding'
  } else {
    routeName= 'LoginScreen'
  }

 return(
     <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen 
            name='Onboarding' 
            component={OnboardingScreen} 
            options={{header:()=>null}}
        />
        <Stack.Screen 
            name='Login' 
            component={LoginScreen} 
            options={{header:()=>null}}
        />
        <Stack.Screen 
            name='Signup' 
            component={SignupScreen}
            options={({navigation})=>({
              title:"",
              headerStyle:{
                backgroundColor:'#f9fafd',
                elevation:0
              },
              headerLeft:()=>(
                <View style={{marginLeft:10}}>
                  <FontAwesome.Button name='long-arrow-left' size={25} 
                  color='#333' backgroundColor='#f9fafd' onPress={()=>navigation.navigate('Login')}
                  />
                </View>
              )
            })} 
        />
     </Stack.Navigator>
 )
}

export default AuthStack

