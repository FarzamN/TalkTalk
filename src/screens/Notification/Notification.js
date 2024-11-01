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
    FlatList,
  } from 'react-native';
  import React, { useState, useRef, useContext, useCallback } from 'react';
  import Colors from '../../constants/Colors';
  import Input from '../../components/Input';
  import Fontisto from 'react-native-vector-icons/Fontisto';
  import CustomButtton from '../../components/CustomButton';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import ImagePicker, { cleanSingle } from 'react-native-image-crop-picker';
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
  import AccountCard from '../../components/Card/AccountCard';
  import { useFocusEffect } from '@react-navigation/native';
  import InputWithoutValidation from '../../components/InputWithoutValidation';
  
  const Notification = ({ navigation }) => {
    const { userDetails, token, setUserDetails, setToken, setNotificationCount } =
      useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(true);
    const [confirmPassword, setConfrimPassword] = useState(true);
    const [occasions, setOccasions] = useState([]);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(false);
    const [NewData, setNewData] = useState([]);
    console.log(NewData);
    const [OldData, setOldData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingStatement, setLoadingStatement] = useState(false);
    const [mission, setMission] = useState('');
  
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors, isValid },
    } = useForm({
      mode: 'all',
    });
  
    const get_occasions = async data => {
      setLoading(true);
      try {
        let base_url = `${baseurl}/get_all_notification.php`;
        let formData = new FormData();
        formData.append(
          'user_id', userDetails.user_id);
        formData.append(
          'token',
          'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
        );
        const response = await fetch(base_url, {
          method: 'post',
          body: formData,
        });
        const responseData = await response.json();
        console.log(responseData, 'cjheck');
        if (responseData.status === true) {
          setNewData(responseData.data);
  
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
    const UpdateNotification = async data => {
      try {
        let base_url = `${baseurl}/update_notification.php`;
        let formData = new FormData();
        formData.append(
          'user_id', userDetails.user_id);
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
  
          setNotificationCount("0")
        } else {
          alert('Something went wrong!');
  
        }
      } catch (error) {
      }
    };
  
    const onSubmit = async data => {
      setLoadingStatement(true);
      try {
        let base_url = `${baseurl}/get_all_notification.php`;
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
        get_occasions();
        UpdateNotification();
      }, []),
    );
  
    console.log('miss', mission);
  
    return loading ? (
      <Loader />
    ) : (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          style={[{ flex: 1 ,  }]}
          source={require('../../assets/background.png')}>
          <ScrollView style={styles.container}>
            <View>
  
              <View style={{ flex: 6 }}>
                <Header />
                <View style={{ marginLeft: 22, fontSize: 20 }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 22,
                      fontFamily: 'ComicNeue-Bold',
                    }}>
                    All Notifications
                  </Text>
                </View>
              </View>
              <FlatList
                data={NewData}
                keyExtractor={item => {
                  return item.id;
                }}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.containerWrap}>
                      {/* <View style={styles.HeaderLeftImageView}>
                    <Image
                      style={styles.HeaderLeftImage}
                      source={require('../../assets/image.png')}
                    />
                  </View> */}
                      <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <View>
                          <Text
                            style={{
                              color: '#FFF',
                              fontSize: 20,
                              fontFamily: 'ComicNeue-Bold',
                            }}>
                            {item.title}
                          </Text>
                          <Text style={{ color: '#FFF', fontSize: 15 }}>
                            {item.description}
                          </Text>
                          <Text
                            style={{
                              marginTop: 20,
                              color: '#FFF',
                              fontSize: 15,
                              fontFamily: 'ComicNeue-Regular',
                            }}>
                            {item.created_at}
                          </Text>
                        </View>
                        {/* <View>
                           
                          </View> */}
                      </View>
                    </View>
                  );
                }}
              />
  
  
            </View>
            <View
            style={{
              height : 100,
            }}
            >

            </View>
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  };
  
  export default Notification;
  
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
      marginBottom: 0,
      borderRadius: Platform.OS == 'ios' ? 50 : 0,
    },
  
    containerWrap: {
      // flex: 1,
  
      width: 'auto',
      height: 'auto',
      padding: 15,
      // backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
  
      // marginRight: 20,
      marginHorizontal: 10,
      marginTop: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#FFFF',
    },
  });