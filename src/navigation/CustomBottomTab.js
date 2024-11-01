import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, { useContext } from 'react';
import Colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/Context';
import { useNavigation } from '@react-navigation/native';

const CustomBottomTab = props => {
  const navigation = useNavigation();
  const {
    setBottomState,
    bottomState,
    setRemainingSecs,
    setIsActive,
    setBackground,
    background,
  } = useContext(AuthContext);
  return (
    <View style={styles.bottomTab}>
      <TouchableOpacity
        onPress={() => {
          setRemainingSecs(0);
          setIsActive(false);
          setBackground('');
          navigation.navigate('Home');
          setBottomState('Home');
        }}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Feather
          name="home"
          size={27}
          color={bottomState === 'Home' ? 'white' : 'grey'}
        />
        {bottomState === 'Home' && (
          <Text
            style={{
              alignSelf: 'center',
              marginLeft: 5,
              fontSize: 15,
              fontFamily: 'ComicNeue-Bold',
              color: 'white',
            }}>
            Home
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
          setRemainingSecs(0);
          setIsActive(false);
          setBackground('');
          setBottomState('Profile');
        }}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome
          name="user-circle-o"
          size={27}
          color={bottomState === 'Profile' ? 'white' : 'grey'}
        />
        {bottomState === 'Profile' && (
          <Text
            style={{
              alignSelf: 'center',
              marginLeft: 5,
              fontSize: 15,
              fontFamily: 'ComicNeue-Bold',
              justifyContent: 'center',
              color: 'white',
            }}>
            Profile
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AccountSettingsStack');
          setRemainingSecs(0);
          setIsActive(false);
          setBackground('');
          setBottomState('AccountSettingsStack');
        }}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons
          color={bottomState === 'AccountSettingsStack' ? 'white' : 'grey'}
          name="ios-settings-sharp"
          size={27}
        />
        {bottomState === 'AccountSettingsStack' && (
          <Text
            style={{
              alignSelf: 'center',
              marginLeft: 5,
              fontSize: 15,
              fontFamily: 'ComicNeue-Bold',
              color: 'white',
            }}>
            Settings
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AccountNotificationStack');
          setRemainingSecs(0);
          setIsActive(false);
          setBackground('');
          setBottomState('AccountNotificationStack');
        }}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons
          color={bottomState === 'AccountNotificationStack' ? 'white' : 'grey'}
          name="ios-settings-sharp"
          size={27}
        />

        {bottomState === 'AccountNotificationStack' && (
          <>
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: 5,
                fontSize: 15,
                fontFamily: 'ComicNeue-Bold',
                color: 'white',
              }}>
              Notification
            </Text>
            <View
              style={{
                borderRadius:
                  Math.round(
                    Dimensions.get('window').width +
                      Dimensions.get('window').height,
                  ) / 2,
                width: 16,
                height: 16,
                backgroundColor: '#f00',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: -3,
                right: -2,
              }}>
              <Text
                style={{
                  position: 'absolute',
                  top: -1,
                  color: '#fff',
                  fontSize: 12,
                }}>
                1
              </Text>
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  bottomTabContainer: {
    height: 120,
    width: '100%',
    //  borderBottomWidth: 4,
    //  borderLeftWidth: 4,
    //  borderRightWidth: 4,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bottomTab: {
    backgroundColor: '#3E3C3C',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: 12,
    height: 60,
    borderRadius: 50,
    width: '90%',
    alignSelf: 'center',
    elevation: 10,
    shadowOffset: { width: 60, height: 40 },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
});