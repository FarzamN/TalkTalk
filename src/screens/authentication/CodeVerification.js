import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform
} from 'react-native';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import CustomButtton from '../../components/CustomButton';
import Colors from '../../constants/Colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { baseurl } from '../../constants/Url';
import LottieView from 'lottie-react-native';
import Loader from '../../components/Loader';
import { AuthContext } from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header/Header';
import { useFocusEffect } from '@react-navigation/native';
import { set } from 'react-hook-form';

const CodeVerification = ({ navigation, route }) => {
  const { data, otp } = route.params;

  const [value, setValue] = useState('');
  const [myOTP, setMyOTP] = useState();
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const { setIsSignin, setUserDetails, socialId, setToken } =
    useContext(AuthContext);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const first2Str = (myOTP != null ? String(myOTP).slice(0, 4) : String(otp).slice(0, 4));
  const first2Num = Number(first2Str);
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);


  const CELL_COUNT = 4;
  const onSubmit = async () => {
    if (value == first2Num) {
      setLoading(true);
      try {
        let base_url = `${baseurl}/register.php`;
        let formData = new FormData();
        formData.append(
          'email',
          socialId ? `user.${Math.random() * 1000}@gmail.com` : data.email,
        );
        formData.append('name', data.name);
        formData.append('phone', data.number);
        formData.append('social_id', socialId ? socialId : '');
        formData.append('username', '');
        formData.append(
          'password',
          socialId ? Math.random() * 23412 : data.password,
        );
        formData.append(
          'token',
          'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
        );
        const response = await fetch(base_url, {
          method: 'post',
          body: formData,
        });
        const responseData = await response.json();
        if (!response.ok) {
          // throw new Error(responseData.message);
        }
        if (responseData.status === true) {
          setUserDetails(responseData.data);
          // navigation.navigate('CodeVerification', {otp: Math.random()});
          const userDetail = JSON.stringify(responseData);
          await AsyncStorage.setItem('userdetail', userDetail);
          setToken(responseData.data.user_id);

          // navigation.navigate('CodeVerification', {otp: Math.random()});
        } else {
          alert(responseData.message);
          // setVisible(true);
          // setError(responseData.message);
        }
      } catch (error) {
        alert(error.message);

        // setVisible(true);
        // setError(error.message);
      }
      setLoading(false);
    } else {
      alert('your otp in invalid!');
    }
  };


  const resendOtp = async () => {
    setCounter(30);
    setLoading(true);
    try {
      let base_url = `${baseurl}/verify_email.php`;
      let formData = new FormData();
      formData.append('email', data.email);
      formData.append(
        'token',
        'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      );
      // formData.append('username', data.username);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      console.log("responseData ", responseData.data)
      if (!response.ok) {
        // throw new Error(responseData.message);
      }

      if (responseData.status === true) {

        console.log("ZZZXXX : ", responseData.data.OTP);
        setMyOTP(responseData.data.OTP);
      } else {
        alert('Email is already exist!');

        // alert("else : " + responseData.data);
        // setVisible(true);
        // setError(responseData.message);
      }
    } catch (error) {
      alert(error.message);
      // setVisible(true);
      // setError(error.message);
    }
    setLoading(false);
  }

  return loading ? (
    <Loader />
  ) : (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../assets/background.png')}>
        <View style={styles.container}>
          <Header />
          {/* <View style={styles.headerImageContainer}>
            <Image source={require('../../assets/talktalk_logo.png')} />
            <Image source={require('../../assets/title_logo.png')} />
          </View> */}

          <View style={{ flex: 1, justifyContent: 'space-between', marginTop: '10%' }}>
            <View>
              {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back"
            style={styles.backIcon}
            size={25}/>
            </TouchableOpacity> */}

              {/* <Text style={styles.headerText}>
                Code Verification Your OTP {first2Str}
              </Text> */}

              <Text style={styles.text}>
                Check your email for verification code.
              </Text>
              {/* <Header onPress={() => navigation.goBack()}
    title="Verify OTP" titleStyle={styles.headerText} iconColor={Colors.iconColor}/> */}

              <View style={styles.otpContainer}>
                <CodeField
                  ref={ref}
                  {...props}
                  // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />

                <CustomButtton
                  onPress={onSubmit}
                  containerStyle={styles.containerStyle}
                  title="Continue"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginBottom: 30,
              }}>

              {counter == 0 ? (
                <>
                  <Text style={{
                    fontSize: 14,
                    color: 'white',
                    marginBottom: 10,
                    paddingTop: 10,
                    fontFamily: 'ComicNeue-Regular',
                  }}>You can resend otp now </Text>
                  <TouchableOpacity onPress={resendOtp}>
                    <Text style={styles.clickHere}>Click Here</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={{
                    fontSize: 14,
                    color: 'white',
                    marginBottom: 10,
                    paddingTop: 10,
                    fontFamily: 'ComicNeue-Regular',
                  }}>
                    You can resend otp in {counter}{' '}
                    {counter > 1 ? 'seconds' : 'second'}
                  </Text>

                </>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default CodeVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'space-between',
    // borderRadius : Platform.OS == 'ios' ? 50 : 0,
    paddingTop: Platform.OS == 'ios' ? 10 : 0
  },
  headerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
  },

  cell: {
    width: 70,
    height: 70,
    textAlignVertical: 'center',
    fontSize: 24,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    color: 'white',
    borderColor: '#C6C2C2',
    fontFamily: 'ComicNeue-Italic',
  },

  focusCell: {
    borderColor: 'grey',
  },

  headerText: {
    fontSize: 38,
    color: 'white',
    alignSelf: 'flex-start',
    fontFamily: 'ComicNeue-Italic',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginTop: 40,
    marginLeft: 15,
    marginBottom: 30,
    backgroundColor: 'rgba(186, 26, 217, 1)',
    padding: 7,
    borderRadius: 10,
  },
  containerStyle: {
    width: '95%',
    alignSelf: 'center',
    marginTop: '15%',
  },
  text: {
    fontSize: 18,
    fontFamily: 'ComicNeue-Italic',
    alignSelf: 'center',
    color: '#8D92A3',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  clickHere: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 5,
    fontFamily: 'ComicNeue-Bold',
  },

  otpContainer: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: 13,
    borderRadius: 20,
    height: 240,
    marginHorizontal: 10,
  },
});
