import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Platform
} from 'react-native';
import React, { useState, useRef, useContext } from 'react';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomButtton from '../../components/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useForm } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { baseurl } from '../../constants/Url';
import Loader from '../../components/Loader';
import { AuthContext } from '../../context/Context';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAccount = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfrimPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const { socialId, setUserDetails, setToken } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  const socialRegister = async (data) => {
    var noti_token = await AsyncStorage.getItem('onesignaltoken')

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
      formData.append('notification_token', noti_token);
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

  };

  const onSubmit = async data => {
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
        navigation.navigate('CodeVerification', {
          data,
          otp: responseData.data.OTP,
        });
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
  };

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const userNameRef = useRef();
  const numberRef = useRef();


  return loading ? (
    <Loader />
  ) : (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={[{ flex: 1, backgroundColor: 'black', justifyContent: 'space-between' }, styles.container]}
        source={require('../../assets/background.png')}>
        <View >


          <ScrollView style={[{}]} >
            <View >
              <Header />
              {/* <View style={styles.headerImageContainer}>
            <Image source={require('../../assets/talktalk_logo.png')} />
            <Image source={require('../../assets/title_logo.png')} />
          </View> */}
              <Text style={styles.headerText}>Create Account</Text>


              <View style={styles.smallbox}>
                <Input
                  style={{ width: 285 }}
                  control={control}
                  autoFocus={true}
                  name="name"
                  rules={{
                    required: '*Name is required',
                    pattern: { message: '*Enter full name' },
                  }}
                  onSubmitEditing={() => userNameRef.current.focus()}
                  keyboardType="default"
                  placeholder="Enter your full name"
                  placeholderTextColor={'white'}
                />

                <FontAwesome style={styles.nameicon} name="user" size={18} />
              </View>

              {errors.name && (
                <Text style={styles.error}>{errors.name.message} </Text>
              )}


              {errors.username && (
                <Text style={styles.error}>{errors.username.message} </Text>
              )}

              {socialId ? null : (
                <>
                  <View style={styles.smallbox}>
                    <Input
                      style={{ width: 285 }}
                      control={control}
                      name="email"
                      rules={{
                        required: '*Email is required',
                        pattern: {
                          value: /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/,
                          message: '*Enter a valid Email',
                        },
                      }}
                      ref={e => (emailRef.current = e)}
                      onSubmitEditing={() => numberRef.current.focus()}
                      keyboardType="email-address"
                      placeholder="Enter your Email Address"
                      placeholderTextColor={'white'}
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
                </>
              )}

              <View style={styles.smallbox}>
                <Input
                  style={{ width: 285 }}
                  control={control}
                  name="number"
                  rules={{
                    required: '*Phone Number is required',
                    pattern: {
                      value:
                        // eslint-disable-next-line no-useless-escape
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                      message: '*Enter a valid Phone Number',
                    },
                  }}
                  ref={e => (numberRef.current = e)}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  keyboardType="number-pad"
                  placeholder="Enter your Phone Number"
                  placeholderTextColor={'white'}
                />

                <FontAwesome style={styles.nameicon} name="phone" size={20} />
              </View>
              {errors.number && (
                <Text style={styles.error}>{errors.number.message} </Text>
              )}

              {socialId ? null : (
                <>
                  <View style={styles.smallbox}>
                    <Input
                      style={{ width: 250 }}
                      control={control}
                      name="password"
                      rules={{
                        required: '*Password is required',
                        minLength: {
                          value: 8,
                          message: '*Password too short (minimum length is 8)',
                        },
                        maxLength: {
                          value: 16,
                          message: '*Password too long (maximum length is 16)',
                        },
                      }}
                      ref={e => (passwordRef.current = e)}
                      onSubmitEditing={() => confirmPasswordRef.current.focus()}
                      secureTextEntry={showPassword}
                      keyboardType="default"
                      placeholder="Enter your Password"
                      placeholderTextColor={'white'}
                    />

                    <Fontisto style={styles.nameicon} name="locked" size={18} />
                    <TouchableOpacity
                      onPress={() => setShowPassword(prevCheck => !prevCheck)}
                      style={styles.icon}>
                      <Ionicons
                        size={20}
                        color={Colors.iconColor}
                        name={showPassword ? 'eye-off' : 'eye'}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text style={styles.error}>{errors.password.message} </Text>
                  )}

                  <View style={styles.smallbox}>
                    <Input
                      style={{ width: 250 }}
                      control={control}
                      name="confirmPassword"
                      rules={{
                        required: '*Password is required',
                        minLength: {
                          value: 8,
                          message: '*Password too short (minimum length is 8)',
                        },
                        maxLength: {
                          value: 16,
                          message: '*Password too long (maximum length is 16)',
                        },
                        validate: {
                          positive: value =>
                            value === watch('password') ||
                            'The passwords do not match',
                        },
                      }}
                      ref={e => (confirmPasswordRef.current = e)}
                      onSubmitEditing={handleSubmit(onSubmit)}
                      secureTextEntry={confirmPassword}
                      keyboardType="default"
                      placeholder="Confirm your Password"
                      placeholderTextColor={'white'}
                    />

                    <Fontisto style={styles.nameicon} name="locked" size={18} />
                    <TouchableOpacity
                      onPress={() => setConfrimPassword(prevCheck => !prevCheck)}
                      style={styles.icon}>
                      <Ionicons
                        size={20}
                        color={Colors.iconColor}
                        name={confirmPassword ? 'eye-off' : 'eye'}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {errors.confirmPassword && (
                <Text style={styles.error}>
                  {errors.confirmPassword.message}{' '}
                </Text>
              )}

              <CustomButtton
                containerStyle={styles.containerStyle}
                title="Continue"
                onPress={handleSubmit(socialId ? socialRegister : onSubmit)}
                style={styles.enabledButton}
                textStyle={styles.enabledButtonText}
              />

              <View
                style={{
                  height: 30,
                  width: '100%'
                }}
              >

              </View>
            </View>

          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 10,
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: 'white',
              fontFamily: 'ComicNeue-Regular',
            }}>
            You have an account
          </Text>
          <TouchableOpacity>
            <Text
              style={styles.Signin}
              onPress={() => navigation.navigate('Login')}>
              SignIn
            </Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    // flex: 1,


  },
  headerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
  },
  smallbox: {
    paddingHorizontal: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    width: '90%',
    backgroundColor: Colors.background,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: 'white',
  },
  nameicon: {
    color: Colors.iconColor,
    position: 'absolute',
    marginLeft: 13,
  },
  headerText: {
    fontSize: 35,
    color: 'white',
    alignSelf: 'flex-start',
    fontFamily: 'ComicNeue-Regular',
    marginLeft: 20,
    marginTop: '10%',
    marginBottom: 25,
  },
  image: {
    height: 80,
    width: 88,
    alignSelf: 'flex-start',
    marginTop: 15,
    marginLeft: 20,
  },
  containerStyle: {
    width: '85%',
    alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginTop: 5,
    fontFamily: 'ComicNeue-Bold',
    marginLeft: 25,
  },
  enabledButton: {
    alignSelf: 'center',
  },
  enabledButtonText: {
    color: 'white',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 60,
    position: 'absolute',
    right: 100,
    transform: [{ translateX: 100 }],
  },
  Signin: {
    fontSize: 15,
    color: 'white',
    paddingHorizontal: 8,
    fontFamily: 'ComicNeue-Bold',
  },
});