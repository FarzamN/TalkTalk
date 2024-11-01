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
  Platform,
  StatusBar
} from 'react-native';
import React, { useState, useRef, useContext } from 'react';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomButtton from '../../components/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { CropPickerModal } from '../../components/CropPickerModal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useForm } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomBottomTab from '../../navigation/CustomBottomTab';
import { AuthContext } from '../../context/Context';
import { baseurl, ProfileUrl } from '../../constants/Url';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header/Header';

const Profile = ({ navigation }) => {
  const { userDetails, token, setUserDetails, setToken } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfrimPassword] = useState(true);

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log('userDetail ', userDetails);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: userDetails?.name,
      username: userDetails?.username,
      email: userDetails?.email,
      number: userDetails?.phone,
      password: userDetails?.password,
      confirmPassword: userDetails?.password,
    },
  });

  console.log('value ', value);

  const onSubmit = async data => {
    setLoading(true);
    try {
      let base_url = `${baseurl}/edit_profile.php`;
      let formData = new FormData();
      formData.append('user_id', userDetails.user_id);
      formData.append('phone', data.number);
      formData.append('name', data.name);
      formData.append('username', data.username);
      formData.append('password', data.password);
      formData.append(
        'token',
        'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      );
      value !== false &&
        formData.append('avatar', {
          name: 'Profileimage',
          uri: value.path,
          type: value.mime,
        });

      // formData.append('username', data.username);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      console.log('asasdasdsdasd ', responseData);

      if (!response.ok) {
        // throw new Error(responseData.message);
      }
      if (responseData.status === true) {
        console.log(responseData);
        setUserDetails(responseData.data);
        // navigation.navigate('CodeVerification', {otp: Math.random()});
        const userDetail = JSON.stringify(responseData);
        console.log('userDetail ', userDetail);
        await AsyncStorage.setItem('userdetail', userDetail);
        setToken(responseData.data.user_id);
        // navigation.navigate('CodeVerification', {otp: Math.random()});
      } else {
        // setVisible(true);
        // setError(responseData.message);
      }
    } catch (error) {
      // setVisible(true);
      // setError(error.message);
    }
    setLoading(false);
  };

  console.log('userDetails ', userDetails);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setValue(image);
      setVisible(false);
    });
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setValue(image);
      setVisible(false);
    });
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
        style={[{ flex: 1 }, styles.container]}
        source={require('../../assets/background.png')}>
        <View style={{ flex: 6 }}>

          <View>
            {/* <Image
              style={styles.image}
              source={require('../../assets/talktalk.png')}
            /> */}
            <Header />

          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setVisible(true)}
              style={{}}>
              {value === false ? (
                <>
                  {userDetails.avatar ? (
                    <Image
                      style={styles.imagePickerContainer}
                      source={{ uri: ProfileUrl + '/' + userDetails?.avatar }}
                    />
                  ) : (
                    <Image
                      style={styles.imagePickerContainer}
                      source={require('../../assets/image.png')}
                    />
                  )}
                </>
              ) : (
                <Image
                  source={{ uri: value.path }}
                  style={[styles.imagePickerContainer]}
                />
              )}
            </TouchableOpacity>

            <Text style={styles.headerText}>{userDetails?.name}</Text>
          </View>
          <ScrollView>
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
                // onSubmitEditing={() => userNameRef.current.focus()}
                keyboardType="default"
                placeholder="Enter your full name"
                placeholderTextColor={'white'}
              />

              <FontAwesome style={styles.nameicon} name="user" size={18} />
            </View>

            {errors.name && (
              <Text style={styles.error}>{errors.name.message} </Text>
            )}

            {/* <View style={styles.smallbox}>
              <Input
                style={{ width: 285 }}
                control={control}
                name="username"
                rules={{
                  required: '*Username is required',
                  pattern: { message: '*Enter Username' },
                }}
                ref={e => (userNameRef.current = e)}
                onSubmitEditing={() => emailRef.current.focus()}
                keyboardType="default"
                placeholder="Enter your Username"
                placeholderTextColor={'white'}
              />

              <FontAwesome style={styles.nameicon} name="user" size={18} />
            </View>
            {errors.username && (
              <Text style={styles.error}>{errors.username.message} </Text>
            )} */}

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
                // ref={e => (numberRef.current = e)}
                // onSubmitEditing={() => passwordRef.current.focus()}
                keyboardType="number-pad"
                placeholder="Enter your Phone Number"
                placeholderTextColor={'white'}
              />

              <FontAwesome style={styles.nameicon} name="phone" size={20} />
            </View>
            {errors.number && (
              <Text style={styles.error}>{errors.number.message} </Text>
            )}

            {userDetails.social_id ? null : (
              <View style={styles.smallbox}>
                <Input
                  style={{ width: 250 }}
                  control={control}
                  name="password"
                  rules={{
                    //  required: '*Password is required',
                    minLength: {
                      value: 8,
                      message: '*Password too short (minimum length is 8)',
                    },
                    maxLength: {
                      value: 16,
                      message: '*Password too long (maximum length is 16)',
                    },
                  }}
                  // ref={e => (passwordRef.current = e)}
                  // onSubmitEditing={() => confirmPasswordRef.current.focus()}
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
            )}
            {errors.password && (
              <Text style={styles.error}>{errors.password.message} </Text>
            )}
            {userDetails.social_id ? null : (
              <View style={styles.smallbox}>
                <Input
                  style={{ width: 250 }}
                  control={control}
                  name="confirmPassword"
                  rules={{
                    //  required: '*Password is required',
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
                  // ref={e => (confirmPasswordRef.current = e)}
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
            )}
            {errors.confirmPassword && (
              <Text style={styles.error}>
                {errors.confirmPassword.message}{' '}
              </Text>
            )}

            <CustomButtton
              containerStyle={styles.containerStyle}
              title="Save"
              onPress={handleSubmit(onSubmit)}
              style={styles.enabledButton}
              textStyle={styles.enabledButtonText}
            />

            <CropPickerModal
              isVisible={visible}
              onClose={() => setVisible(false)}
              onImageLibraryPress={openGallery}
              onCameraPress={openCamera}
            />
          </ScrollView>
        </View>
        {/* <View style={styles.bottomTabContainer}>
          <CustomBottomTab />
        </View> */}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imagePickerContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 1,
    marginBottom: 18,
  },
  container: {
    flex: 1,

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
    fontSize: 25,
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'ComicNeue-Regular',
    marginBottom: 10,
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
  bottomTabContainer: {
    width: '100%',
    marginBottom: 25,
    marginTop: 10,
    alignSelf: 'center',
  },
});
