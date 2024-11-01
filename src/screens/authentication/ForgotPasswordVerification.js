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
import React, { useState, useEffect } from 'react';
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
import Loader from '../../components/Loader';
import Header from '../../components/Header/Header';

const ForgotPasswordVerification = ({ navigation, route }) => {
  const { email, otp } = route.params;
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [myOTP, setMyOTP] = useState();
  const [counter, setCounter] = useState(30);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 4;


  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const onSubmit = async () => {
    setLoading(true);
    let final_otp = (myOTP != null ? myOTP : otp);
    if (value == final_otp) {
      navigation.navigate('ResetPassword', { email });
    } else {
      alert('your otp in invalid!');
    }
    setLoading(false);
  };


  const resendOtp = async () => {
    console.log('email : ', email);
    setCounter(30);
    setLoading(true);
    try {
      let base_url = `${baseurl}/verify_forgot_pass_email.php`;
      let formData = new FormData();
      formData.append('email', email);
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
        console.log("ZZZXXX : ", responseData.data);
        alert('Email doesnt exist!');

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

export default ForgotPasswordVerification;

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
