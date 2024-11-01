import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile/Profile';
import AccountSettings from '../screens/Account/AccountSettings';
import SpeechSelection from '../screens/Home/SpeechSelection';
import CustomBottomTab from './CustomBottomTab';
import Levels from '../screens/Account/Levels';
import Speech from '../screens/Home/Speech';
import Statistics from '../screens/Account/Statistics';
import StartCounter from '../screens/Home/StartCounter';
import Colors from '../constants/Colors';

// ICONS

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserInfo from '../screens/Profile/UserInfo';
import Notification from '../screens/Notification/Notification';
import ProgressBar from '../screens/Profile/ProgressBar';
import SelectionType from '../screens/Home/SelectionType';
import { AuthContext } from '../context/Context';





const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();




export const hideTabBarComponents = ['ProductDetails'];
const HomeStackNavigation = () => {
  return (
    <HomeStack.Navigator initialRouteName="SelectionType">
      <HomeStack.Screen
        name="SelectionType"
        component={SelectionType}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
      <HomeStack.Screen
        name="SpeechSelection"
        component={SpeechSelection}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />

      <HomeStack.Screen
        name="Speech"
        component={Speech}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
      <HomeStack.Screen
        name="startcounter"
        component={StartCounter}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />

      {/* <HomeStack.Screen 
            name="Profile"
            component={Profile}
            options={{headerShown: false,}}/>  */}

      {/* <HomeStack.Screen 
            name="Level"
            component={Levels}
            options={{headerShown: false,}}/>  */}
    </HomeStack.Navigator>
  );
};
const AccountStackNavigation = ({ navigation }) => {
  return (
    <AccountStack.Navigator initialRouteName="AccountSettings">
      <AccountStack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{ headerShown: false, animation: 'slide_from_right' }}
        tabBarOptions={{
          tabBarHideOnKeyboard: true,
        }}
      />

      <AccountStack.Screen
        name="Level"
        component={Levels}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />

      <AccountStack.Screen
        name="Statistics"
        component={Statistics}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
    </AccountStack.Navigator>
  );
};
const ProfileStackNavigation = () => {
  return (
    <AccountStack.Navigator initialRouteName="AccountSettings">
      <AccountStack.Screen
        name="UserInfo"
        component={UserInfo}
        options={{ headerShown: false, animation: 'slide_from_right' }}
        tabBarOptions={{
          tabBarHideOnKeyboard: true,
        }}
      />
      <AccountStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
      <AccountStack.Screen
        name="ProgressBar"
        component={ProgressBar}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
    </AccountStack.Navigator>
  );
};

const NotificationStackNavigation = () => {
  return (
    <AccountStack.Navigator initialRouteName="AccountSettings">
      <AccountStack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false, animation: 'slide_from_right' }}
        tabBarOptions={{
          tabBarHideOnKeyboard: true,
        }}
      />
      {/* <AccountStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <AccountStack.Screen
        name="ProgressBar"
        component={ProgressBar}
        options={{headerShown: false, animation: 'slide_from_right'}}
      /> */}
      {/* <Notification /> */}
    </AccountStack.Navigator>
  );
};

const BottomTabNavigation = () => {


  const { notificationCount } =
    useContext(AuthContext);


  const defaultTabNavOptions = {
    tabBarStyle: {
      position: 'absolute',
      backgroundColor: '#3E3C3C',
      borderRadius: 50,
      // width: '90%',
      bottom: 10,
      borderWidth: 0,
      borderColor: 'red',
      marginHorizontal: 20,
      paddingHorizontal: 15,
      height: 60,
    },
  };
  return (
    <Tab.Navigator
      screenOptions={{
        ...defaultTabNavOptions,
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigation}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarVisible: false,
          tabBarLabel: () => {
            return null;
          },

          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Feather
                name="home"
                size={27}
                color={focused ? 'white' : 'grey'}
              />
              {focused && (
                <Text
                  style={{
                    alignSelf: 'center',
                    marginLeft: 5,
                    fontSize: 15,
                    fontFamily: 'ComicNeue-Bold',
                    color: 'white',
                  }}>
                  Home
                </Text>
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigation}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name="user-circle-o"
                size={27}
                color={focused ? 'white' : 'grey'}
              />
              {focused && (
                <Text
                  style={{
                    alignSelf: 'center',
                    marginLeft: 5,
                    fontSize: 15,
                    fontFamily: 'ComicNeue-Bold',
                    justifyContent: 'center',
                    color: 'white',
                  }}>
                  Profile
                </Text>
              )}
            </View>
          ),
          headerShown: false,
          // animation: 'slide_from_right',
        }}
      />

      <Tab.Screen
        name="AccountNotificationStack"
        component={NotificationStackNavigation}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused, color, size }) => (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'relative',
                }}>
                {!focused && (
                  notificationCount > 0 && <View
                    style={{
                      borderRadius:
                        Math.round(
                          Dimensions.get('window').width +
                          Dimensions.get('window').height,
                        ) / 2,
                      width: 16,
                      zIndex: 20,
                      height: 16,
                      backgroundColor: '#f00',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      top: -3,
                      right: -2,
                    }}>
                    <Text
                      style={{
                        position: 'absolute',
                        top: -1,
                        color: '#fff',
                        fontSize: 12,
                      }}>
                      {notificationCount}
                    </Text>
                  </View>
                )}
                <Ionicons
                  name="notifications-outline"
                  size={27}
                  color={focused ? 'white' : 'grey'}
                />

                {focused && (
                  <>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginLeft: 0,
                        fontSize: 15,
                        fontFamily: 'ComicNeue-Bold',
                        justifyContent: 'center',
                        color: 'white',
                      }}>
                      Notification
                    </Text>
                    {notificationCount > 0 &&

                      <View
                        style={{
                          borderRadius:
                            Math.round(
                              Dimensions.get('window').width +
                              Dimensions.get('window').height,
                            ) / 2,
                          width: 16,
                          height: 16,
                          backgroundColor: '#f00',
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          top: -6,
                          zIndex: 20,
                          right: '92%',
                        }}>
                        <Text
                          style={{
                            position: 'absolute',
                            top: -1,
                            color: '#fff',
                            fontSize: 12,
                          }}>
                          {notificationCount}
                        </Text>
                      </View>}
                  </>
                )}
              </View>
            </>
          ),
          headerShown: false,
          // animation: 'slide_from_right',
        }}
      />

      <Tab.Screen
        name="AccountSettingsStack"
        component={AccountStackNavigation}
        options={{
          tabBarLabel: () => {
            return null;
          },

          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                color={focused ? 'white' : 'grey'}
                name="ios-settings-sharp"
                size={27}
              />
              {focused && (
                <Text
                  style={{
                    alignSelf: 'center',
                    marginLeft: 5,
                    fontSize: 15,
                    fontFamily: 'ComicNeue-Bold',
                    color: 'white',
                  }}>
                  Settings
                </Text>
              )}
            </View>
          ),
          headerShown: false,
          // animation: 'slide_from_right',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;