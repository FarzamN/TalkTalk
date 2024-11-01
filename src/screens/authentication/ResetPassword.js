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
import React, { useRef, useState } from 'react';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomButtton from '../../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm } from 'react-hook-form';
import { baseurl } from '../../constants/Url';
import Loader from '../../components/Loader';

const ForgotPassword = ({ navigation, route }) => {
  const { email } = route.params;
  console.log('email ', email);
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfrimPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    console.log(data.newpassword);
    setLoading(true);
    try {
      let base_url = `${baseurl}/forgot_password.php`;
      let formData = new FormData();
      formData.append('email', email);
      formData.append('password', data.newpassword);
      formData.append(
        'token',
        'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      );
      // formData.append('username', data.username);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      console.log(response);
      const responseData = await response.json();

      console.log(responseData);
      if (!response.ok) {
        // throw new Error(responseData.message);
      }
      if (responseData.status === true) {
        navigation.navigate('Login');

        // navigation.navigate('CodeVerification', {otp: Math.random()});
      } else {
        console.log(responseData.message);

        // setVisible(true);
        // setError(responseData.message);
      }
    } catch (error) {
      console.log(error.message);
      alert('Something went wrong!')
      // setVisible(true);
      // setError(error.message);
    }
    setLoading(false);
  };

  const confirmPasswordRef = useRef();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  return loading ? (
    <Loader />
  ) : (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../assets/background.png')}>
        <View style={styles.container}>
          <View style={styles.headerImageContainer}>
            <Image source={require('../../assets/talktalk_logo.png')} />
            {/* <Image source={require('../../assets/title_logo.png')} /> */}
          </View>

          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View>
              {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back"
            style={styles.backIcon}
            size={25}/>
            </TouchableOpacity> */}

              <Text style={styles.headerText}>Reset Password</Text>
              <View style={styles.inputContainer}>
                <View style={styles.smallbox}>
                  <Input
                    style={{ width: '155%' }}
                    control={control}
                    autoFocus={true}
                    name="newpassword"
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
                    onSubmitEditing={() => confirmPasswordRef.current.focus()}
                    secureTextEntry={showPassword}
                    keyboardType="default"
                    placeholder="Enter New Password"
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
                {errors.newpassword && (
                  <Text style={styles.error}>
                    {errors.newpassword.message}{' '}
                  </Text>
                )}
                <View style={styles.smallbox}>
                  <Input
                    style={{ width: '155%' }}
                    control={control}
                    name="confirmpassword"
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
                          value === watch('newpassword') ||
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
                {errors.confirmpassword && (
                  <Text style={styles.error}>
                    {errors.confirmpassword.message}{' '}
                  </Text>
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
                You have an account?
              </Text>
              <TouchableOpacity>
                <Text
                  style={styles.Signin}
                  onPress={() => navigation.navigate('Login')}>
                  SignIn
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

    justifyContent: 'space-between',
    // borderRadius : Platform.OS == 'ios' ? 50 : 0,
    paddingTop: Platform.OS == 'ios' ? 10 : 0
  },

  headerText: {
    fontSize: 35,
    color: 'white',
    alignSelf: 'flex-start',
    fontFamily: 'ComicNeue-Italic',
    marginLeft: 20,
    marginBottom: 30,
  },
  headerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 30,
  },
  inputContainer: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 280,
    marginLeft: 15,
    marginRight: 15,
  },
  smallbox: {
    marginVertical: 10,
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
    width: '97%',
    alignSelf: 'center',
    marginTop: '14%',
  },
  Signin: {
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
