import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
  AppState,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomButtton from '../../components/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
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
import CurrentStreak from '../../components/CurrentStreak';
import RNLocation from 'react-native-location';
import {useFocusEffect} from '@react-navigation/native';

const SelectionType = ({navigation}) => {
  const {userDetails, token, notificationCount, setNotificationCount} =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [occasions, setOccasions] = useState([]);
  const [userid, setuserid] = useState();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [currentLongitude, setCurrentLongitude] = useState('...');

  const [currentLatitude, setCurrentLatitude] = useState('...');

  const get_notifications_count = async () => {
    try {
      let base_url = `${baseurl}/count_notifications.php`;
      let formData = new FormData();
      formData.append('user_id', userDetails.user_id);
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
        setNotificationCount(responseData.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const get_occasions = async data => {
    setLoading(true);
    try {
      let base_url = `${baseurl}/get_occasions.php`;
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
        setOccasions(responseData.data);
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

  useEffect(() => {
    get_notifications_count();
    get_occasions();
    permission();
    setuserid(token);
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      get_notifications_count();
    }, []),
  );

  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission given');
        GetLocationNew();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const Active = async () => {
    setLoading(true);
    try {
      let base_url = `${baseurl}/insert_location_for_active_user.php`;

      let ActiveForm = new FormData();

      ActiveForm.append('user_id', userDetails.user_id);
      ActiveForm.append('long', currentLongitude);
      ActiveForm.append('lat', currentLatitude);
      ActiveForm.append(
        'token',
        'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      );
      const response = await fetch(base_url, {
        method: 'post',
        body: ActiveForm,
      });

      const responseData = await response.json();
      console.log('ActiveAPI', responseData.Message);
    } catch (error) {
      alert('Active error', error.message);
    }
    setLoading(false);
  };

  const GetLocationNew = () => {
    RNLocation.getLatestLocation().then(latestLocation => {
      setCurrentLongitude(latestLocation.longitude);
      setCurrentLatitude(latestLocation.latitude);
      console.log('userDetails=>', userDetails);
      // setTimeout(() => {
      //     console.log("test", userDetails)
      //     Active()
      // }, 10000);
    });
    RNLocation.configure({
      distanceFilter: 100, // Meters
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 5000, // Milliseconds
    });
  };

  const _handleAppStateChange = async nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      const userdetailasync = await AsyncStorage.getItem('userdetail');
      console.log(userdetailasync);

      // TODO SET USERS ONLINE STATUS TO TRUE
    } else {
      const userdetailasync = await AsyncStorage.getItem('userdetail');
      console.log(userdetailasync);
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  return loading ? (
    <Loader />
  ) : (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={styles.container}
        source={require('../../assets/background.png')}>
        <StatusBar barStyle={'light-content'}></StatusBar>
        <View style={{alignSelf: 'center'}}>
          <Image
            style={styles.image}
            source={require('../../assets/talktalk_login.png')}
          />
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: '25%',
            }}>
            {occasions.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    item.occasion != 'Random Questions'
                      ? alert('coming soon.')
                      : navigation.navigate('SpeechSelection')
                  }
                  key={index}
                  style={styles.image2}>
                  <Image
                    style={{height: '100%'}}
                    source={{uri: ProfileUrl + '/' + item.image}}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.question}>QUESTIONS FOR EVERY OCCASION</Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default SelectionType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    aspectRatio: 1 / 1,
    marginTop: '10%',
    alignSelf: 'center',
  },
  image2: {
    width: '45%',
    aspectRatio: 1 / 1,
    marginTop: '10%',
  },
  question: {
    textAlign: 'center',
    fontFamily: 'ComicNeue-Bold',
    color: 'white',
    fontSize: 20,
    marginTop: '3%',
  },
});
