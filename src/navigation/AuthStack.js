import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/authentication/Login';
import CreateAccount from '../screens/authentication/CreateAccount';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import VerifyOtp from '../screens/authentication/VerifyOtp';
import ResetPassword from '../screens/authentication/ResetPassword';
import CodeVerification from '../screens/authentication/CodeVerification';
import SpeechSelection from '../screens/Home/SpeechSelection';
import ForgotPasswordVerification from '../screens/authentication/ForgotPasswordVerification';

const MainStack = createNativeStackNavigator();
export default function AuthStack({navigation}) {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="VerifyOtp"
        component={VerifyOtp}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="CodeVerification"
        component={CodeVerification}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="SpeechSelection"
        component={SpeechSelection}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="ForgotPasswordVerification"
        component={ForgotPasswordVerification}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
}
