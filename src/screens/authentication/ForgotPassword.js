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
import React, { useContext, useRef, useState } from 'react';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButtton from '../../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/Context';
import { baseurl } from '../../constants/Url';
import Loader from '../../components/Loader';
import Header from '../../components/Header/Header';

const ForgotPassword = ({ navigation }) => {
  const { setIsSignin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  const onSubmit = async data => {
    setLoading(true);
    try {
      let base_url = `${baseurl}/verify_forgot_pass_email.php`;
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
      console.log(responseData.data);
      if (!response.ok) {
        // throw new Error(responseData.message);
      }
      if (responseData.status === true) {
        // navigation.navigate('CodeVerification', {
        //   data,
        //   otp: Math.random() * 35823949,
        // });
        navigation.navigate('ForgotPasswordVerification', {
          otp: responseData.data.OTP,
          email: data.email,
        });
        // console.log(responseData.data);
      } else {
        alert(responseData.message);

        // setVisible(true);
        // setError(responseData.message);
      }
    } catch (error) {
      alert(error.message);

      console.log('error ', error);
      // setVisible(true);
      // setError(error.message);
    }
    setLoading(false);
  };

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

              <Text style={styles.headerText}>Forgot Password</Text>
              <View style={styles.inputContainer}>
                <View style={styles.smallbox}>
                  <Input
                    style={{ width: '140%' }}
                    control={control}
                    autoFocus={true}
                    name="email"
                    rules={{
                      required: '*Email is required',
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: '*Enter a valid Email',
                      },
                    }}
                    keyboardType="email-address"
                    placeholder="Enter your Email"
                    placeholderTextColor={'white'}
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />

                  <MaterialCommunityIcons
                    style={styles.nameicon}
                    name="email"
                    size={20}
                  />
                </View>
                {errors.email && (
                  <Text style={styles.error}>{errors.email.message} </Text>
                )}

                <CustomButtton
                  onPress={handleSubmit(onSubmit)}
                  containerStyle={styles.containerStyle}
                  title="Submit"
                  style={styles.enabledButton}
                  textStyle={styles.enabledButtonText}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                paddingBottom: 30,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  marginBottom: 10,
                  paddingTop: 10,
                  fontFamily: 'ComicNeue-Regular',
                }}>
                Doesn&apos;t have an account
              </Text>
              <TouchableOpacity>
                <Text
                  style={styles.Signup}
                  onPress={() => navigation.navigate('CreateAccount')}>
                  SignUp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // borderRadius : Platform.OS == 'ios' ? 50 : 0,
    paddingTop: Platform.OS == 'ios' ? 10 : 0
    // justifyContent:'space-between'
  },

  headerText: {
    fontSize: 38,
    color: 'white',
    alignSelf: 'flex-start',
    fontFamily: 'ComicNeue-Italic',
    marginLeft: 25,
    marginVertical: 30,
  },
  headerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  inputContainer: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    height: 200,
    marginLeft: 15,
    marginRight: 15,
  },
  smallbox: {
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.background,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'white',
  },
  nameicon: {
    color: Colors.iconColor,
    position: 'absolute',
    marginLeft: 15,
  },
  containerStyle: {
    width: '100%',
    alignSelf: 'center',
    marginTop: '16%',
  },
  Signup: {
    fontSize: 15,
    color: 'white',
    marginBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 5,
    fontFamily: 'ComicNeue-Bold',
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginTop: 40,
    marginLeft: 15,
    marginBottom: 40,
    backgroundColor: 'rgba(186, 26, 217, 1)',
    padding: 6,
    borderRadius: 10,
  },
  error: {
    color: 'red',
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 2,
    fontFamily: 'ComicNeue-Bold',
  },

  enabledButton: {
    alignSelf: 'center',
  },
  enabledButtonText: {
    color: 'white',
  },
});
