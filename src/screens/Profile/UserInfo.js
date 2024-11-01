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
  Dimensions,
} from 'react-native';
import React, {useState, useRef, useContext, useCallback} from 'react';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomButtton from '../../components/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker, {cleanSingle} from 'react-native-image-crop-picker';
import {CropPickerModal} from '../../components/CropPickerModal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useForm} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomBottomTab from '../../navigation/CustomBottomTab';
import {AuthContext} from '../../context/Context';
import {baseurl, ProfileUrl} from '../../constants/Url';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header/Header';
import AccountCard from '../../components/Card/AccountCard';
import {useFocusEffect} from '@react-navigation/native';
import InputWithoutValidation from '../../components/InputWithoutValidation';

const UserInfo = ({navigation}) => {
  const height = Dimensions.get('screen').height;

  const {userDetails, token, setUserDetails, setToken} =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfrimPassword] = useState(true);

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState(false);
  const [mission, setMission] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
  });

  const getMission = async data => {
    setLoading(true);
    try {
      let base_url = `${baseurl}/get_mission_statement.php`;
      let formData = new FormData();
      formData.append('user_id', userDetails.user_id);
      formData.append(
        'token',
        'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      );

      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      console.log('data', responseData);
      if (responseData.status === true) {
        setMission(responseData.data);
      } else {
        // setError(responseData.message);
      }
    } catch (error) {
      // setError(error.message);
    }
    setLoading(false);
  };

  const onSubmit = async data => {
    setLoadingStatement(true);
    try {
      let base_url = `${baseurl}/add_mission_statement.php`;
      let formData = new FormData();
      formData.append('user_id', userDetails.user_id);
      formData.append('mission_statement', mission);
      formData.append(
        'token',
        'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      );

      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        alert(responseData.message);
      } else {
        // setError(responseData.message);
      }
    } catch (error) {
      // setVisible(true);
    }
    setLoadingStatement(false);
  };
  const userNameRef = useRef();

  useFocusEffect(
    useCallback(() => {
      getMission();
    }, []),
  );

  console.log('miss', mission);

  return loading ? (
    <Loader />
  ) : (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={[{flex: 1}]}
        source={require('../../assets/background.png')}>
        <ScrollView style={styles.container}>
          <View style={{height: height * 0.86}}>
            <ScrollView nestedScrollEnabled={true} contentContainerStyle={{}}>
              <View style={{flex: 6}}>
                <Header />
                <View>
                  {userDetails.avatar ? (
                    <Image
                      style={styles.imagePickerContainer}
                      source={{uri: ProfileUrl + '/' + userDetails?.avatar}}
                    />
                  ) : (
                    <Image
                      style={styles.imagePickerContainer}
                      source={require('../../assets/image.png')}
                    />
                  )}

                  <Text style={styles.headerText}>{userDetails?.name}</Text>
                </View>
                <View style={{height: '50%', paddingVertical: 10}}>
                  <View style={styles.smallbox}>
                    <InputWithoutValidation
                      style={styles.inputs}
                      keyboardType="default"
                      placeholder="Your Status"
                      placeholderTextColor={Colors.placehorderColor}
                      multiline={true}
                      numberOfLines={10}
                      textAlignVertical={'top'}
                      value={mission}
                      onChangeText={text => setMission(text)}
                    />
                  </View>
                  <CustomButtton
                    onPress={handleSubmit(onSubmit)}
                    // onPress={() => navigation.navigate('Speech')}
                    containerStyle={styles.containerStyle}
                    title="SAVE"
                  />
                  {/* <AccountCard onPress={handleSubmit(onSubmit)} title={'Save'} /> */}

                  <View style={{marginHorizontal: 20, marginTop: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.text}>Member Since :</Text>
                      <Text style={styles.text}> Nov-2022</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <Text style={styles.text}>Highest Award :</Text>
                      <Text
                        style={[styles.text, {color: Colors.gradientColor1}]}>
                        {' '}
                        &quot;TALKER&quot;
                      </Text>
                    </View>
                  </View>
                  <AccountCard
                    onPress={() => navigation.navigate('Profile')}
                    title={'Personal Information'}
                    Icons="person"
                  />
                  <AccountCard
                    onPress={() => navigation.navigate('ProgressBar')}
                    title={'Progress/Stats'}
                    Icons="stats-chart-outline"
                  />
                  <AccountCard
                    onPress={() => alert('Coming soon.')}
                    style={{color: Colors.placehorderColor}}
                    title={'Question Packs'}
                    Icons="albums-outline"
                  />
                  <AccountCard
                    onPress={() => alert('Coming soon.')}
                    style={{color: Colors.placehorderColor}}
                    title={'Store'}
                    Icons="cash-outline"
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  imagePickerContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 1,
    marginBottom: 10,
  },
  container: {
    flex: 1,

    borderRadius: Platform.OS == 'ios' ? 50 : 0,
  },
  inputs: {
    fontFamily: 'ComicNeue-Regular',
    fontSize: 16,
    height: 70,
    paddingTop: 20,
    paddingRight: 20,
  },
  smallbox: {
    // paddingHorizontal: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    width: '90%',
    backgroundColor: Colors.background,
    borderRadius: 13,
    // borderWidth: 2,
    // borderColor: 'white',
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
    fontSize: 16,
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
    transform: [{translateX: 100}],
  },
  bottomTabContainer: {
    width: '100%',
    marginBottom: 25,
    marginTop: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: 'ComicNeue-Regular',
    color: 'white',
  },
});
