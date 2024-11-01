import React, { createContext, useCallback, useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = props => {
  // const getData = async () => {

  //   const valuedetails = await AsyncStorage.getItem('userDetails')
  //   const parseUserDetails = JSON.parse(valuedetails)
  //   if (parseUserDetails != null) {
  //     setUserDetails(parseUserDetails)
  //     setIsSignin(true)
  //     setRole(parseUserDetails.role)

  //   }

  // }

  // useEffect(() => {
  //   getData();

  // }, [])

  // const [role, setRole] = useState()
  // const [userDetails, setUserDetails] = useState([])

  const [isSignin, setIsSignin] = useState(false);
  const [bottomState, setBottomState] = useState('Home');
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [background, setBackground] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [startTime, setStartTime] = useState(null);

  const [notificationCount, setNotificationCount] = useState();

  const [endTime, setEndTime] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [values, setValues] = useState(null);
  const [socialId, setSocialId] = useState();
  const [token, setToken] = useState();

  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([
    { label: '30s - 1 Minute', value: '0.50,1' },
    { label: '1 - 2 Minutes', value: '1,2' },
    { label: '2 - 3 Minutes', value: '2,3' },
    { label: '4 - 6 Minutes', value: '4,6' },
    // { label: '5 - 7 minutes', value: '5,7' },
    { label: 'Enter Custom Times', value: 'Enter Custom Times' },
    // { label: '8 - 10 minutes', value: '8,10' },
    // { label: 'Enter Custom Times', value: 'Enter Custom Times' },
  ]);
  const [item, setItem] = useState([
    { label: 'Science', value: 'sci' },
    { label: 'Math', value: 'math' },
    { label: 'English', value: 'eng' },
    { label: 'Computer', value: 'comp' },
  ]);




  const formatNumber = number => `0${number}`.slice(-2);
  const getRemaining = time => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
  };
  const { mins, secs } = getRemaining(remainingSecs);

  const loginStatus = useCallback(async () => {
    setLoading(true);
    try {
      const userdetailasync = await AsyncStorage.getItem('userdetail');
      if (userdetailasync !== null) {
        setIsSignin(true);
        const parseUserDetail = JSON.parse(userdetailasync);
        console.log('parseUserDetail ', parseUserDetail);
        setUserDetails(parseUserDetail?.data);
        setToken(parseUserDetail.data.user_id);
      }
    } catch (e) {
      console.log(e, 'Auth.js');
    }
    setLoading(false);
  }, []);
  useEffect(
    () => {
      loginStatus();
    },
    [loginStatus, token],
    isSignin,
  );

  return (
    <AuthContext.Provider
      value={{
        isSignin,
        bottomState,
        setIsSignin,
        setBottomState,
        setRemainingSecs,
        remainingSecs,
        isActive,
        setIsActive,
        background,
        setBackground,
        formatNumber,
        getRemaining,
        mins,
        secs,
        open1,
        setOpen1,
        open,
        setOpen,
        value,
        setValue,
        values,
        setValues,
        items,
        setItems,
        item,
        setItem,
        userDetails,
        setUserDetails,
        socialId,
        setSocialId,
        token,
        setToken,
        loading,
        setLoading,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        visible,
        setVisible,
        notificationCount,
        setNotificationCount
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};