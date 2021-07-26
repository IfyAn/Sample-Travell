import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import MessagesScreen from '../screens/MessagesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Sample Travell"
      component={HomeScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
          fontWeight:'bold'
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="ios-menu"
              size={25}
              backgroundColor='ececec'
              onPress={() => navigation.openDrawer()}
            />
          </View>
        ),
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <FontAwesome 
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="ios-menu"
              size={25}
              backgroundColor='ececec'
              onPress={() => navigation.openDrawer()}
            />
          </View>
        ),
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);
const MapStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Map" component={MapScreen} />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        //headerShown: false,
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="ios-menu"
              size={25}
              backgroundColor='ececec'
              onPress={() => navigation.openDrawer()}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  // const getTabBarVisibility = (route) => {
  //   const routeName = route.state
  //     ? route.state.routes[route.state.index].name : '';
  //   if (routeName === 'Chat') {
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="house"
              color={color}
              size={size}
            />
          ),
        }}
      />
       <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={({route}) => ({
          //tabBarVisible: route.state && route.state.index === 0,
          //tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="map-marker-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
