import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import Loader from '../components/Loader';
import { AuthContext } from '../context/Context';
import AuthStack from './AuthStack';
import BottomTabNavigation from './BottomTabNavigation';

const AppNavigationContainer = () => {
  const { isSignin, setIsSignin, loading } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!isSignin && <AuthStack />}
      {isSignin && <BottomTabNavigation />}
    </NavigationContainer>
  );
};
export default AppNavigationContainer;
