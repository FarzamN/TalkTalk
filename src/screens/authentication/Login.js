import {
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import BottomSheet from '../../components/Card/BottomSheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButtton from '../../components/CustomButton';
import {AuthContext} from '../../context/Context';
import {useForm} from 'react-hook-form';
import {
  LoginButton,
  GraphRequest,
  AccessToken,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {baseurl} from '../../constants/Url';
import Loader from '../../components/Loader';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';

const Login = ({navigation}) => {
  const {setIsSignin, setRole, setUserDetails, setSocialId, setToken} =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(true);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userAgreement, setUserAgreement] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [data, setData] = useState('');
  const [privacy, setPrivacy] = useState('');
  console.log(privacy);

  const remove_states = () => {
    Keyboard.dismiss();
    setUserAgreement(false);
    setPrivacyPolicy(false);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  const onSubmit = async data => {
    setLoading(true);
    var noti_token = await AsyncStorage.getItem('onesignaltoken');
    try {
      let base_url = `${baseurl}/signin.php`;
      let formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('notification_token', noti_token);
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

      if (!response.ok) {
        // throw new Error(responseData.message);
      }
      if (responseData.status === true) {
        setUserDetails(responseData.data);
        // navigation.navigate('CodeVerification', {otp: Math.random()});
        const userDetail = JSON.stringify(responseData);
        await AsyncStorage.setItem('userdetail', userDetail);
        setToken(responseData.data.user_id);
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

  const get_agreements = async data => {
    setLoading(true);
    try {
      let base_url = `${baseurl}/get_user_agreement.php`;
      let formData = new FormData();
      formData.append(
        'token',
        'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      );
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        setData(responseData.data);
        setLoading(false);
      } else {
        alert('Something went wrong!');
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const get_privacy = async data => {
    setLoading(true);
    try {
      let base_url = `${baseurl}/get_privacy_policy.php`;
      let formData = new FormData();
      formData.append(
        'token',
        'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      );
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        setPrivacy(responseData.data);
        setLoading(false);
      } else {
        alert('Something went wrong!');
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const passwordRef = useRef();

  const login = async accessToken => {
    setLoading(true);
    var noti_token = await AsyncStorage.getItem('onesignaltoken');

    try {
      let base_url = `${baseurl}/social_login.php`;

      let checkEmail = new FormData();

      checkEmail.append('social_id', accessToken);
      checkEmail.append('notification_token', noti_token);
      checkEmail.append(
        'token',
        'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      );
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });

      const responseData = await response.json();
      console.log(responseData, accessToken);
      if (responseData.status === true) {
        setUserDetails(responseData.data);
        const userDetail = JSON.stringify(responseData);
        await AsyncStorage.setItem('userdetail', userDetail);
        setToken(responseData.data.user_id);
      } else {
        navigation.navigate('CreateAccount');
      }
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const loginapplefirst = async (accessToken, name, email) => {
    // console.log('accessToekn', accessToken, 'name', name, 'email', email);
    setLoading(true);
    try {
      let base_url = `${baseurl}/social_login.php`;

      let checkEmail = new FormData();

      checkEmail.append('social_id', accessToken);
      checkEmail.append(
        'token',
        'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      );
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });

      const responseData = await response.json();
      console.log(responseData, accessToken);
      if (responseData.status === true) {
        setUserDetails(responseData.data);
        const userDetail = JSON.stringify(responseData);
        await AsyncStorage.setItem('userdetail', userDetail);
        setToken(responseData.data.user_id);
      } else {
        navigation.navigate('CreateAccount');
      }
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true,

      //  '999772003926-fvb4o1o25jnnla1j3gepch337d24e5am.apps.googleusercontent.com',
      // 73942764878-84ussro91sd41d2muou778dskdsr6gsd.apps.googleusercontent.com
      webClientId:
        Platform.OS === 'android'
          ? '999772003926-fvb4o1o25jnnla1j3gepch337d24e5am.apps.googleusercontent.com'
          : '73942764878-84ussro91sd41d2muou778dskdsr6gsd.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      forceCodeForRefreshToken: true,
    });
    get_privacy();
    get_agreements();
  }, []);

  const googleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (!userInfo) {
        console.log(userInfo);
      } else {
        login(userInfo.user.id);
        setSocialId(userInfo.user.id);
        // login(userInfo.user.id);
      }
    } catch (error) {
      console.log('error');
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('You cancelled the sign in.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Google sign In operation is in process');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services not available');
      } else {
        alert(
          'Something unknown went wrong with Google sign in. ' + error.message,
        );
      }
    }
    setLoading(false);
  };

  const fbLogin = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert('Your app id for `TalkTalk` is under review by Facebook.');
    }, 1000);
    // LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    //   function (result) {
    //     if (result.isCancelled) {
    //       console.log('Login cancel from facebook');
    //     } else {
    //       console.log('fb login success');
    //     }

    //     AccessToken.getCurrentAccessToken().then(data => {
    //       let accessToken = data.accessToken;
    //       // setToken(accessToken);

    //       // setFbauth(true);
    //       const responseInfoCallback = (error, result) => {
    //         if (error) {
    //           alert('Error fetching data: ' + error.toString());
    //         } else {
    //           console.log(result);
    //           // setFbUserData(result);
    //           // login(result.id);
    //         }
    //       };
    //       const infoRequest = new GraphRequest(
    //         '/me',
    //         {
    //           accessToken: accessToken,
    //           parameters: {
    //             fields: {
    //               string: 'email,name,first_name,middle_name,last_name,picture',
    //             },
    //           },
    //         },
    //         responseInfoCallback,
    //       );
    //       new GraphRequestManager().addRequest(infoRequest).start();
    //     });
    //   },
    //   function (error) {
    //     console.log('==> Login fail with error: ' + error);
    //   },
    // );
  };

  useFocusEffect(
    useCallback(() => {
      setSocialId();
      reset();
    }, []),
  );

  // APPLE AUTH

  async function iosAppleLogin() {
    // performs login request

    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      if (appleAuthRequestResponse) {
        // Display some data from the object:
        const firstAittempt = appleAuthRequestResponse.hasOwnProperty('user');
        const social_id = appleAuthRequestResponse.identityToken;
        const decoded = await jwt_decode(social_id);

        alert('Your Apple authentication id is under review.');

        // if (firstAittempt === true) {

        //   console.log('Apple id : ',decoded);
        //   // login(decoded.sub.toString());

        //   // loginapplefirst(

        //   //   decoded.sub,
        //   //   appleAuthRequestResponse.user.name,
        //   //   appleAuthRequestResponse.user.email,
        //   // );
        // } else {
        //   console.log('Apple id : ',decoded);
        //   // login(decoded.sub.toString());
        //   // login(decoded.sub);
        // }
      }
      console.log('1234');
    } else {
      console.log('not working');
    }
  }
  const modalAgreement = item => {
    if (item == 'Privacy Policy') {
      setPrivacyPolicy(!privacyPolicy);
      setUserAgreement(false);
      setToggleNotification(false);
    } else if (item == 'Notifications') {
      setToggleNotification(!toggleNotification);
      setPrivacyPolicy(false);
      setUserAgreement(false);
    } else {
      setUserAgreement(!userAgreement);
      setPrivacyPolicy(false);
      setToggleNotification(false);
    }
  };

  async function androidAppleLoggin() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert('Your Apple authentication id is under review.');
    }, 800);

    // if (appleAuthAndroid.isSupported) {
    //   try {
    //     appleAuthAndroid.configure({
    //       clientId: 'com.beyond.bottom-android',
    //       redirectUri: 'https://beyond.sassolution.org/apple/returnurl.php',
    //       scope: appleAuthAndroid.Scope.EMAIL,
    //       responseType: appleAuthAndroid.ResponseType.ALL,
    //     });

    //     const response = await appleAuthAndroid.signIn();

    //     if (response) {
    //       // Display some data from the object:
    //       const id_token = response.id_token;
    //       const firstAittempt = response.hasOwnProperty('user');
    //       const decoded = await jwt_decode(id_token);
    //       if (firstAittempt === true) {
    //         login(decoded.sub);
    //         // loginapplefirst(
    //         //   decoded.sub,
    //         //   response.user.name,
    //         //   response.user.email,
    //         // );
    //       } else {
    //         login(decoded.sub);
    //       }
    //     } //       const car = {type: 'Fiat', model: '500', color: 'white'};

    //     //       // Display some data from the object:
    //     //       const test = car.hasOwnProperty('type');
    //     //       console.log('test', test);
    //     //       // console.log('res', response);
    //     //       // const code = response.code; // Present if selected ResponseType.ALL / ResponseType.CODE
    //     //       // const id_token = response.id_token; // Present if selected ResponseType.ALL / ResponseType.ID_TOKEN
    //     //       // const responseJson = JSON.parse(response);
    //     //       // const firstAttempt = responseJson.hasOwnProperty('user');

    //     //       // console.log('method==>', responseJson.hasOwnProperty(''));
    //     //       // if (response.user) {
    //     //       //   console.log('first');
    //     //       // } else {
    //     //       //   console.log('not a first');
    //     //       // }
    //     //       // const decoded = await jwt_decode(id_token);
    //     //       // if (firstAttempt) {
    //     //       //   login(decoded.sub);
    //     //       // } else {
    //     //       //   login(decoded.sub);
    //     //       // }
    //     //       // const decoded = await jwt_decode(id_token);
    //     //       // console.log('decode13213321321', decoded.sub);

    //     //       // login(decoded.sub);
    //     //       // console.log('email:', decoded.email);
    //     //       // console.log('username:', decoded.NameI);
    //     //       // checkSocialLogin('apple', {
    //     //       //   email: decoded.email,
    //     //       // });
    //     //       // await AsyncStorage.setItem('loginStatus', 'loggedIn');
    //     //       // await AsyncStorage.setItem('loginType', 'apple');
    //     //       // setIsLoggedIn(true);
    //     //     }
    //   } catch (error) {
    //     console.log(error);
    //     if (error && error.message) {
    //       switch (error.message) {
    //         case appleAuthAndroid.Error.NOT_CONFIGURED:
    //           console.log('appleAuthAndroid not configured yet.');
    //           Toast.show('appleAuthAndroid not configured yet.', Toast.SHORT);

    //           break;
    //         case appleAuthAndroid.Error.SIGNIN_FAILED:
    //           console.log('Apple signin failed.');
    //           Toast.show('Apple signin failed.', Toast.SHORT);

    //           break;
    //         case appleAuthAndroid.Error.SIGNIN_CANCELLED:
    //           console.log('User cancelled Apple signin.');
    //           Toast.show('User cancelled Apple signin.', Toast.SHORT);
    //           break;
    //         default:
    //           break;
    //       }
    //     }
    //   }
    // } else {
    //   Toast.show('aaple login isnt supported', Toast.LONG);
    // }
  }

  return loading ? (
    <Loader />
  ) : (
    // Keyboard.dismiss
    <TouchableWithoutFeedback onPress={() => remove_states()}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/background.png')}>
        <ScrollView style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../assets/talktalk_login.png')}
          />
          <View>
            <Text style={styles.text}>Email</Text>

            <View style={styles.smallbox}>
              <Input
                style={{width: '155%'}}
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
                onSubmitEditing={() => passwordRef.current.focus()}
                keyboardType="email-address"
                placeholder="Hello@hello.com"
                placeholderTextColor={'white'}
              />

              <AntDesign
                style={{position: 'absolute', marginLeft: 15}}
                color={'white'}
                name="mail"
                size={20}
              />
            </View>
          </View>
          {errors.email && (
            <Text style={styles.error}>{errors.email.message} </Text>
          )}

          <View>
            <Text style={styles.text}>Password</Text>

            <View style={styles.smallbox}>
              <Input
                style={{width: '140%'}}
                control={control}
                autoFocus={true}
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
                onSubmitEditing={handleSubmit(onSubmit)}
                secureTextEntry={showPassword}
                keyboardType="default"
                placeholder="Password"
                placeholderTextColor={'white'}
                maxLength={20}
              />

              <EvilIcons
                style={{position: 'absolute', marginLeft: 9}}
                color={'white'}
                name="lock"
                size={30}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(prevCheck => !prevCheck)}
                style={styles.viewButton}>
                <Text style={styles.viewText}>
                  {showPassword ? 'View' : 'Hide'}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.error}>{errors.password.message} </Text>
            )}
            <View
              style={{
                flexDirection: 'row-reverse',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text
                  style={{
                    fontSize: 13,
                    alignSelf: 'flex-end',
                    marginRight: '20%',
                    marginTop: 10,
                    fontFamily: 'ComicNeue-BoldItalic',
                    color: 'white',
                  }}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <CustomButtton
            onPress={handleSubmit(onSubmit)}
            containerStyle={styles.containerStyle}
            title="LOG IN"
            style={styles.enabledButton}
            textStyle={styles.enabledButtonText}
          />

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
              Don’t have an account?
            </Text>
            <TouchableOpacity>
              <Text
                style={styles.Signup}
                onPress={() => navigation.navigate('CreateAccount')}>
                SignUp
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTVertical: 15,
              }}>
              <TouchableOpacity onPress={fbLogin} style={styles.socialIcons}>
                <Entypo
                  style={{alignSelf: 'center'}}
                  color={Colors.iconColor}
                  name="facebook"
                  size={33}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={googleLogin}
                style={styles.socialIcons}>
                <AntDesign
                  style={{alignSelf: 'center'}}
                  color={Colors.iconColor}
                  name="google"
                  size={33}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Platform.OS === 'ios'
                    ? iosAppleLogin()
                    : androidAppleLoggin();
                }}
                style={styles.socialIcons}>
                <AntDesign
                  style={{alignSelf: 'center'}}
                  color={Colors.iconColor}
                  name="apple1"
                  size={33}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => modalAgreement('User Agreement')}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'white',
                    paddingTop: 40,
                    fontFamily: 'ComicNeue-Bold',
                  }}>
                  Terms Of Use
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => modalAgreement('Privacy Policy')}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'white',
                    paddingTop: 40,
                    marginLeft: 40,
                    fontFamily: 'ComicNeue-Bold',
                  }}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 30,
              width: '100%',
            }}></View>
        </ScrollView>
        {privacyPolicy && (
          <BottomSheet
            title={'Privacy Policy'}
            text={privacy}
            onPress={() => modalAgreement('Privacy Policy')}
          />
        )}
        {userAgreement && (
          <BottomSheet
            title={'User Agreement'}
            text={data}
            onPress={() => modalAgreement('User Agreement')}
          />
        )}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // borderRadius: Platform.OS == 'ios' ? 50 : 0
  },
  image: {
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  smallbox: {
    paddingHorizontal: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    width: '85%',
    backgroundColor: Colors.background,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'white',
  },
  nameicon: {
    backgroundColor: 'red',
    position: 'absolute',
    marginLeft: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 15,
    marginLeft: 30,
    color: 'white',
    fontFamily: 'ComicNeue-Italic',
  },
  viewButton: {
    borderWidth: 1,
    borderColor: 'rgba(185, 24, 219, 1)',
    borderRadius: 10,
    width: '28%',
    paddingVertical: '2%',
    backgroundColor: 'rgba(234, 193, 242, 1)',
  },
  viewText: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  containerStyle: {
    width: '85%',
    alignSelf: 'center',
    marginTop: '10%',
  },
  Signup: {
    fontSize: 15,
    color: 'white',
    marginBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 8,
    fontFamily: 'ComicNeue-Bold',
  },
  socialIcons: {
    padding: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  error: {
    color: 'red',
    fontSize: 15,
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginTop: 5,
    fontFamily: 'ComicNeue-Bold',
  },

  enabledButton: {
    alignSelf: 'center',
  },
  enabledButtonText: {
    color: 'white',
  },
});
