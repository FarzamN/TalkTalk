import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import Colors from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../../context/Context';
import RNRestart from 'react-native-restart';
import CustomBottomTab from '../../navigation/CustomBottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountCard from '../../components/Card/AccountCard';
import BottomSheet from '../../components/Card/BottomSheet';
import { baseurl } from '../../constants/Url';
import Loader from '../../components/Loader';
import TopSheet from '../../components/Card/TopSheet';
import Header from '../../components/Header/Header';

const AccountSettings = ({ navigation }) => {
  const { setIsSignin, setBottomState, setToken, userDetails } =
    useContext(AuthContext);
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userdetail');
      setToken(Math.random());
      setIsSignin(false);
      setBottomState('Home');
    } catch (e) {
      alert(e);
    }
  };
  const [userAgreement, setUserAgreement] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [privacy, setPrivacy] = useState('');

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
  const get_notifications = async data => {
    setLoading(true);
    try {
      let base_url = `${baseurl}/get_notifications.php`;
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
        setNotifications(responseData.data);
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
    get_agreements();
    get_privacy();
    get_notifications();
  }, []);

  const remove_states = () => {
    setUserAgreement(false);
    setPrivacyPolicy(false);
  };

  useEffect(() => {
    if (userAgreement) {
      setPrivacyPolicy(false);
    } else {
      setUserAgreement(false);
    }
  }, [userAgreement, privacyPolicy]);

  const modal_agreement = item => {
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

  return loading ? (
    <Loader />
  ) : (
    <TouchableWithoutFeedback onPress={remove_states}>
      {/* <TopSheet
        title={'User Agreement'}
        text={'text'}
      // onPress={() => modal_agreement('User Agreement')}
      /> */}

      <ImageBackground
        style={styles.container}
        source={require('../../assets/background.png')}>
        <View style={{ flex: 6 }}>
          {/* <View style={styles.headerImageContainer}>
            <Image source={require('../../assets/talktalk_logo.png')} />
            <Image source={require('../../assets/title_logo.png')} />
          </View> */}
          <Header />

          <View style={{ marginTop: '10%' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.headerText}>My Settings</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              {/* <AccountCard
              onPress={() => navigation.navigate('Statistics')}
              title={'My Points'}
            />
            <AccountCard
              onPress={() => navigation.navigate('Level')}
              title={'Statistics'}
            /> */}
              <AccountCard
                onPress={() => modal_agreement('User Agreement')}
                title={'User Agreement'}
                Icons="people-outline"
              />
              <AccountCard
                onPress={() => modal_agreement('Privacy Policy')}
                title={'Privacy Policy'}
                Icons="logo-angular"
              />

              <AccountCard
                onPress={logout}
                title={'Logout'}
                Icons="log-out-outline"
              />
            </View>
          </View>
        </View>
        {userAgreement && (
          <BottomSheet
            title={'User Agreement'}
            text={data}
            onPress={() => modal_agreement('User Agreement')}
          />
        )}
        {privacyPolicy && (
          <BottomSheet
            title={'Privacy Policy'}
            text={privacy}
            onPress={() => modal_agreement('Privacy Policy')}
          />
        )}
        {toggleNotification && (
          <TopSheet
            title={'User Agreement'}
            text={'test'}
            data={notifications}
            onPress={() => setToggleNotification(!toggleNotification)}
          />
        )}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // borderRadius : Platform.OS == 'ios' ? 50 : 0
  },
  smallbox: {
    paddingHorizontal: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    width: '85%',
    backgroundColor: Colors.background,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 40,
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'ComicNeue-Bold',
  },
  boxtext: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'ComicNeue-BoldItalic',
    textAlign: 'center',
    width: '100%',
  },
  headerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  bottomTabContainer: {
    width: '100%',
    marginBottom: 25,
    alignSelf: 'center',
  },
});