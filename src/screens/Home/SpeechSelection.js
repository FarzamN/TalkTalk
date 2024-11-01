import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React, {useEffect, useContext, useCallback, useState} from 'react';
import Colors from '../../constants/Colors';
import CustomButtton from '../../components/CustomButton';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../../context/Context';
import CustomBottomTab from '../../navigation/CustomBottomTab';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {TimerInputModal} from '../../components/TimerInputModal';
import SpeechQuestion from '../../components/Card/SpeechQuestion';
import CategoryPicker from '../../components/DropDown/CategoryPicker';
import {baseurl} from '../../constants/Url';
import Loader from '../../components/Loader';
import Header from '../../components/Header/Header';

const SpeechSelection = ({navigation}) => {
  const {
    open1,
    setOpen1,
    open,
    setOpen,
    value,
    setValue,
    values,
    setValues,
    items,
    setItems,
    item,
    setItem,
    setIsActive,
    setBackground,
    setRemainingSecs,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    visible,
    setVisible,
  } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [tipOfDay, setTipOfDay] = useState('');
  const [timer, setTimer] = useState('');
  console.log(timer, '==>ddddd');
  // const [item, setItem] = useState([
  //   { label: 'Science', value: 'sci' },
  //   { label: 'Math', value: 'math' },
  //   { label: 'English', value: 'eng' },
  //   { label: 'Computer', value: 'comp' },
  // ]);

  const getTipForDay = async data => {
    setLoading(true);
    try {
      let base_url = `${baseurl}/get_tip_of_day.php`;
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

      if (!response.ok) {
        // throw new Error(responseData.message);
      }
      if (responseData.status === true) {
        console.log('ZZZ : ', responseData.data[0].tip);
        setTipOfDay(responseData.data[0].tip);
      } else {
        alert('Email is already exist!');
      }
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const getCategory = async data => {
    setLoading(true);
    try {
      let base_url = `${baseurl}/get_category_name.php`;
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

      if (!response.ok) {
        // throw new Error(responseData.message);
      }
      if (responseData.status === true) {
        await setItem(
          responseData.data.map((item, index) => {
            return {label: item.category_name, value: item.category_id};
          }),
        );
        const data = await responseData.data.map((item, index) => {
          return {label: item.category_name, value: item.category_id};
        });
        const modifiedData = await data.filter((item, index) => {
          return {label: item.category_name, value: item.category_id};
        });
        await setValues(modifiedData[0].value);

        setLoading(false);
      } else {
        console.log('Data not exist');
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTipForDay();

    if (isFocused) {
      setValues(null);
      setValue(null);
      setRemainingSecs(0);
      setIsActive(false);
      setBackground('');
      setVisible(false);
      getCategory();
    }
  }, [isFocused]);

  return loading ? (
    <Loader />
  ) : (
    <ImageBackground
      style={[{flex: 1}]}
      source={require('../../assets/background.png')}>
      <ScrollView
        style={styles.container}
        scrollEnabled={true}
        nestedScrollEnabled={true}>
        {/* <Image
          style={styles.headerImage}
          source={require('../../assets/title.png')}></Image> */}
        {/* <Header /> */}
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 30,
            },
          ]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconView}>
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color={Colors.gradientColor1}
            />
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../../assets/randomquestions.png')}
          />
        </View>

        <View style={{marginTop: '10%'}}>
          <View
            style={{
              zIndex: Platform.OS == 'ios' ? 200 : 0,
              height: open ? 250 : 80,
            }}>
            <CategoryPicker
              open={open}
              placeholder="Select Time Setting"
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onSelectItem={e => {
                {
                  setTimer(e.value);

                  e.value == 'Enter Custom Times'
                    ? setVisible(true)
                    : setVisible(false);
                  console.log(e.value);
                }
              }}
            />
          </View>

          <TimerInputModal
            isVisible={visible}
            onClose={() => setVisible(false)}
            message={message}
            onPress={() => {
              setVisible(false);
            }}
          />
          <View
            style={{
              zIndex: Platform.OS == 'ios' ? 100 : 0,
              height: open1 ? 250 : 80,
            }}>
            <CategoryPicker
              open={open1}
              value={values}
              items={item}
              setOpen={setOpen1}
              setValue={setValues}
              setItems={setItem}
            />
          </View>
          {value && (
            <CustomButtton
              onPress={() => navigation.navigate('startcounter', {timer})}
              // onPress={() => navigation.navigate('Speech')}
              containerStyle={styles.containerStyle}
              title="GENERATE"
              //simpleButton={true}
            />
          )}
        </View>
        <Text
          style={{
            fontFamily: 'ComicNeue-Regular',
            marginTop: '7%',
            textAlign: 'center',
            fontSize: 25,
            color: 'white',
          }}>
          Tip of the day
        </Text>
        <SpeechQuestion
          style={{marginTop: 15}}
          question={tipOfDay != '' ? tipOfDay : ''}
          comma={true}
        />
        <View
          style={{
            height: 120,
          }}></View>
      </ScrollView>

      {/* <View style={styles.bottomTabContainer}>
        <CustomBottomTab />
      </View> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // borderRadius : Platform.OS == 'ios' ? 50 : 0,
    paddingTop: Platform.OS == 'ios' ? 10 : 0,
  },
  box: {
    height: 'auto',
  },

  headerImage: {
    alignSelf: 'center',
    marginTop: '7%',
    marginBottom: '5%',
  },

  style: {
    backgroundColor: Colors.background,
    width: '85%',
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    borderColor: 'white',
  },

  Textstyle: {
    alignItems: 'flex-start',
    fontSize: 15,
    fontFamily: 'ComicNeue-BoldItalic',
    color: '#ffff',
  },
  image: {
    // marginTop: 15,
    marginRight: 20,
    width: 90,
    aspectRatio: 1 / 1,
  },
  iconView: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    aspectRatio: 1 / 1,
    borderRadius: 50,
    paddingLeft: 6,
    marginLeft: 20,
  },
  BorderStyle: {
    width: '85%',
    backgroundColor: Colors.background,
    borderWidth: 0,
    alignSelf: 'center',
  },
  containerStyle: {
    width: '85%',
    alignSelf: 'center',
    marginTop: '4%',
    marginBottom: '5%',
  },
  arrow: {
    height: 30,
    width: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.iconColor,
    borderRadius: 11,
  },
  bottomTabContainer: {
    height: 120,
    width: '100%',
    borderColor: Colors.border,
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default SpeechSelection;
