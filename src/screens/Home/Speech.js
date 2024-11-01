import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../../context/Context';
import CustomBottomTab from '../../navigation/CustomBottomTab';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {baseurl} from '../../constants/Url';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import Header from '../../components/Header/Header';

export default function Speech({route}) {
  const {
    remainingSecs,
    setRemainingSecs,
    isActive,
    setIsActive,
    background,
    setBackground,
    mins,
    secs,
    value,
    maxvalue,
    startTime,
    endTime,
    userDetails,
    item,
  } = useContext(AuthContext);
  const {questions, colors} = route.params;
  // const [loading, setLoading] = useState(false)
  console.log(secs, 'second');
  console.log(mins, 'minste');
  console.log(isActive, 'isActive');
  console.log(setIsActive, 'setIsActive');
  // console.log(secs);

  const _minTimeDisplay = startTime
    ? parseFloat(startTime)
    : parseFloat(value.split(',')?.[0]) + '';
  // const _minTimeDisplayStart = parseFloat(startTime.split(',')?.[4]) + ''
  const _maxTimeDisplay = endTime
    ? parseFloat(endTime)
    : parseFloat(value.split(',')?.[1]);
  // const _maxTimeDisplayEnd = parseFloat(endTime.split(',')?.[]) + ' Minutes'
  const _minTime = startTime
    ? parseFloat(startTime) * 60
    : parseFloat(value.split(',')?.[0]) * 60;
  const _maxTime = endTime
    ? parseFloat(endTime) * 60
    : parseFloat(value.split(',')?.[1]) * 60;
  const _meanTime = (_minTime + _maxTime) / 2;

  const _hit_streak = async () => {
    // setLoading(true);
    try {
      let base_url = `${baseurl}/add_to_streak.php`;
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

      if (!response.ok) {
        // throw new Error(responseData.message);
      }
      if (responseData.status === true) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const navigation = useNavigation();

  const [ind, setInd] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isPause, setIsPause] = useState(true);

  const IndexMethod = ind => {
    navigation.goBack();
    reset();
    // if (questions.length == ind) {
    //   navigation.navigate('SpeechSelection')
    // } else {
    //   setInd(ind)
    //   const bgColor = colors?.[ind]?.bgColor
    //   setBackground(bgColor)
    // }
  };
  const start = async () => {
    setIsActive(true);
    _hit_streak();
  };
  const reset = () => {
    setBackground('');
    setRemainingSecs(0);
    setIsActive(false);
  };
  const pause = () => {
    setIsPause(!isPause);
    if (isPause == true) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };
  const stop = async () => {
    setBackground('');
    setRemainingSecs(0);
    setIsActive(false);
    setIsPause(false);
  };
  useEffect(() => {
    let interval = null;
    // setIsActive()

    if (isActive) {
      interval = setInterval(() => {
        remainingSecs === 0 && setBackground('');
        console.log('====================================');
        console.log(_minTime);
        console.log(_maxTime);
        console.log(_meanTime);
        console.log('====================================');
        remainingSecs === _minTime - 1 && setBackground('#00c800');
        remainingSecs === _meanTime - 1 && setBackground('#ffff00');
        remainingSecs === _maxTime - 1 && setBackground('#ff0000');
        setRemainingSecs(remainingSecs => remainingSecs + 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  console.log(startTime, endTime, 'daskjn');

  {
    console.log(value, 'ZEEE');
  }

  useFocusEffect(
    useCallback(() => {
      reset();
      start();
    }, []),
  );

  return loading ? (
    <ActivityIndicator color={'black'} size={40} />
  ) : background == '' ? (
    <ImageBackground
      style={[{flex: 1}]}
      source={require('../../assets/background.png')}>
      <ScrollView style={styles.container}>
        <View
          style={{
            justifyContent: 'space-between',
            marginTop: Platform.OS === 'ios' ? 10 : null,
          }}>
          {/* <Header  /> */}
          <View>
            <View
              style={{
                // marginVertical: 20,
                backgroundColor: 'rgba(129, 127, 127, 0.5)',
                paddingHorizontal: 10,
                paddingTop: 5,
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.iconView}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={20}
                  color={Colors.gradientColor1}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>{questions}</Text>
            </View>
          </View>
          <View style={{}}>
            <View>
              <View style={styles.circle}>
                <Text style={styles.timerImage}>{`${mins} : ${secs}`}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginTop: 50,
                }}>
                <TouchableOpacity onPress={stop}>
                  <Ionicons
                    style={styles.iconImage}
                    name="refresh-circle-outline"
                    size={60}
                  />
                </TouchableOpacity>
                {/* {secs == '00' ?
                  <TouchableOpacity onPress={start}>
                    <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 100, marginRight: 3 }}>
                      <Entypo
                        style={[{ color: 'red' }]}
                        name="dot-single"
                        size={40}
                      />
                    </View>
                  </TouchableOpacity> :

                  <TouchableOpacity onPress={IndexMethod}>
                    <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 100, marginRight: 3 }}>
                      <FontAwesome
                        style={[{ color: 'red', paddingHorizontal: 11, paddingVertical: 10 }]}
                        name="square"
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                } */}
                {isPause ? (
                  <TouchableOpacity onPress={pause}>
                    <Ionicons
                      style={styles.iconImage}
                      name="pause-circle-outline"
                      size={60}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={pause}>
                    <Ionicons
                      style={styles.iconImage}
                      name="play-circle-outline"
                      size={60}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => IndexMethod(1)}>
            <LinearGradient
              colors={['rgba(129, 127, 127, 0.5)', 'rgba(129, 127, 127, 0.5)']}
              style={styles.footerContainer}>
              <Text style={styles.footerText}>NEXT QUESTION</Text>
              <Ionicons
                style={styles.forwardicon}
                name="md-chevron-forward-circle-outline"
                size={25}
              />
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.timeView}>
            {value == 'Enter Custom Times' ? (
              <Text style={styles.time}>
                {'Time : ' + startTime + ' - ' + endTime + ' Minutes'}
              </Text>
            ) : (
              <Text style={styles.time}>
                {console.log('ZAZAZA : ', _maxTimeDisplay)}

                {'Time : ' +
                  (_minTimeDisplay == '0.5' ? '30s' : _minTimeDisplay) +
                  ' - ' +
                  (_maxTimeDisplay == '1'
                    ? `${_maxTimeDisplay} Minute`
                    : `${_maxTimeDisplay} Minutes`)}
              </Text>
            )}
          </View>
          {/* <Text>{startTime}</Text>
          <Text>{endTime}</Text> */}
        </View>
        <View
          style={{
            height: 150,
          }}></View>
      </ScrollView>
    </ImageBackground>
  ) : (
    <ScrollView style={[styles.container, {backgroundColor: background}]}>
      <View style={{justifyContent: 'space-between'}}>
        <View>
          <View
            style={{
              backgroundColor: 'rgba(129, 127, 127, 0.5)',
              paddingHorizontal: 10,
              paddingTop: 5,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.iconView,
                {backgroundColor: 'rgba(0, 0, 0, 0.3)'},
              ]}>
              <MaterialIcons
                name="arrow-back-ios"
                size={20}
                color={Colors.gradientColor1}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{questions}</Text>
          </View>
        </View>
        <View style={{}}>
          <View>
            <View style={[styles.circle, {borderColor: Colors.background}]}>
              <Text
                style={[
                  styles.timerImage,
                  {color: Colors.background},
                ]}>{`${mins} : ${secs}`}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={stop}>
                <Ionicons
                  style={[styles.iconImage, {color: Colors.background}]}
                  name="refresh-circle-outline"
                  size={60}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={start}>
                <Ionicons
                  style={[styles.iconImage, { color: Colors.background }]}
                  name="play-circle-outline"
                  size={60}
                />
              </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={IndexMethod}>
                <View
                  style={{
                    borderWidth: 4,
                    borderColor: Colors.background,
                    borderRadius: 100,
                    marginRight: 3,
                  }}>
                  <FontAwesome
                    style={[
                      {
                        color: Colors.background,
                        paddingHorizontal: 11,
                        paddingVertical: 10,
                      },
                    ]}
                    name="square"
                    size={20}
                  />
                </View>
              </TouchableOpacity> */}

              {isPause == true ? (
                <TouchableOpacity onPress={pause}>
                  <Ionicons
                    style={[styles.iconImage, {color: Colors.background}]}
                    name="pause-circle-outline"
                    size={60}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={pause}>
                  <Ionicons
                    style={[styles.iconImage, {color: Colors.background}]}
                    name="play-circle-outline"
                    size={60}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => IndexMethod()}>
          <LinearGradient
            colors={['rgba(129, 127, 127, 0.5)', 'rgba(129, 127, 127, 0.5)']}
            style={styles.footerContainer}>
            <Text style={styles.footerText}>NEXT QUESTION</Text>
            <Ionicons
              style={styles.forwardicon}
              name="md-chevron-forward-circle-outline"
              size={25}
            />
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.timeView}>
          {value ? (
            <Text style={styles.time}>
              {'Time : ' +
                (_minTimeDisplay == '0.5' ? '30s' : _minTimeDisplay) +
                ' - ' +
                (_maxTimeDisplay == '1'
                  ? `${_maxTimeDisplay} Minute`
                  : `${_maxTimeDisplay} Minutes`)}
            </Text>
          ) : (
            <Text style={styles.time}>
              {'Time : ' + startTime + ' - ' + endTime + ' Minutes'}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          height: 200,
        }}></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // borderRadius : Platform.OS == 'ios' ? 50 : 0,
  },
  circle: {
    borderWidth: 8,
    borderRadius: 200,
    height: 280,
    width: 280,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'white',
    marginTop: '10%',
    borderColor: 'white',
  },
  timerImage: {
    fontFamily: 'ComicNeue-Bold',

    color: 'white',
    fontSize: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  timerStart: {
    fontFamily: 'ComicNeue-Bold',
    borderWidth: 4,
    borderRadius: 200,
    height: 280,
    width: 280,
    color: 'black',
    fontSize: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    marginTop: '10%',
    borderColor: 'black',
  },
  iconImage: {
    color: 'white',
    marginHorizontal: 2,
  },
  icons: {
    color: 'black',
    marginHorizontal: 2,
  },
  headerContainer: {
    // height: '15%',
    width: '100%',
    backgroundColor: 'rgba(129, 127, 127, 0.5)',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 12,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    paddingTop: 5,
    paddingLeft: 50,
  },
  headerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  headerText: {
    fontFamily: 'ComicNeue-Regular',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    color: 'white',
    width: '100%',
    alignSelf: 'center',
  },
  footerContainer: {
    height: 65,
    width: '75%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    borderRadius: 20,
  },
  footerText: {
    fontFamily: 'ComicNeue-Regular',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 22,
    marginHorizontal: 15,
    color: 'white',
  },
  forwardicon: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  bottomTabContainer: {
    width: '100%',
    marginBottom: 25,
    alignSelf: 'center',
  },
  iconView: {
    marginTop: 25,
    backgroundColor: Colors.background,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    aspectRatio: 1 / 1,
    borderRadius: 50,
    paddingLeft: 6,
    // marginLeft: 20,
  },
  timeView: {
    backgroundColor: 'rgba(129, 127, 127, 0.5)',
    padding: 5,
    position: 'absolute',
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: '18%',
    justifyContent: 'center',
    marginTop: 15,
    top: 16,
    right: 12,
    marginBottom: 10,
  },
  time: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 20,
    color: 'white',
  },
});
