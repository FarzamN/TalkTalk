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
} from 'react-native';
import React, {useState, useRef, useContext, useCallback} from 'react';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomButtton from '../../components/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useForm} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {baseurl} from '../../constants/Url';
import Loader from '../../components/Loader';
import {AuthContext} from '../../context/Context';
import SpeechQuestion from '../../components/Card/SpeechQuestion';
import CustomBottomTab from '../../navigation/CustomBottomTab';
import BackButton from '../../components/Buttons/BackButton';
import CategoryPicker from '../../components/DropDown/CategoryPicker';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../components/Header/Header';

const StartCounter = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(true);
  const {socialId} = useContext(AuthContext);
  const {items, values, item} = useContext(AuthContext);
  const [randomQuestions, setRandomQuestions] = useState({});

  const [loading, setLoading] = useState(false);

  const get_random_question = async data => {
    setLoading(true);
    try {
      let base_url = `${baseurl}/get_random_question.php`;
      let formData = new FormData();
      formData.append(
        'token',
        'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      );
      formData.append('id', values);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (!response.ok) {
        // throw new Error(responseData.message);
      }
      if (responseData.status === true) {
        console.log('ZZZXXX : ', responseData);
        setRandomQuestions(responseData);
      } else {
        //   navigation.navigate('CodeVerification', {
        //     data,
        //     otp: Math.random() * 35823949,
        //   });
        // setVisible(true);
        // setError(responseData.message);
      }
    } catch (error) {
      // alert(error.message);
      console.log('error ', error);
      // setVisible(true);
      // setError(error.message);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      get_random_question();
    }, []),
  );

  const getQuestion = item.filter((item, index) => {
    return item.value == values;
  });

  // console.log(randomQuestions.colors_data)

  return (
    //  loading ? (
    //   <Loader />
    // ) :

    <ImageBackground
      style={[{flex: 1}]}
      source={require('../../assets/background.png')}>
      <ScrollView style={styles.container}>
        <View style={{height: 'auto'}}>
          {/* <View style={styles.headerImageContainer}>
                    <BackButton onPress={() => navigation.goBack()} />
                    <Image source={require('../../assets/title_logo.png')} />
                </View> */}
          <Header visible={true} />
        </View>

        <CategoryPicker
          items={items}
          placeholder={getQuestion?.[0]?.label}
          disabled={true}
          Textstyle={{color: Colors.gradientColor1}}
          arrowStyle={{
            backgroundColor: Colors.background,
            color: Colors.background,
          }}
        />

        <SpeechQuestion
          TextStyle={{fontSize: 22}}
          questionVisible={true}
          question={randomQuestions?.data?.question}
          comma={true}
          onPress={get_random_question}
          style={{paddingTop: loading ? 0 : 30}}
          nextQuestionView={{paddingTop: 20}}
          loading={loading}
        />
        <CustomButtton
          onPress={() =>
            navigation.navigate('Speech', {
              questions: randomQuestions.data.question,
              colors: randomQuestions.colors_data,
            })
          }
          // onPress={() => navigation.navigate('Speech')}
          containerStyle={styles.containerStyle}
          title="START TIMER"
        />

        {/* <View style={styles.bottomTabContainer}>
                <CustomBottomTab />
            </View> */}
        {/* <SpeechQuestion question={'What is the day that stricks out in your memory and why is it significant to you?'} /> */}
        <View
          style={{
            height: 100,
          }}></View>
      </ScrollView>
    </ImageBackground>
  );
};

export default StartCounter;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // borderRadius : Platform.OS == 'ios' ? 50 : 0,
  },
  headerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
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
    fontSize: 35,
    color: 'white',
    alignSelf: 'flex-start',
    fontFamily: 'ComicNeue-Regular',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 25,
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
    marginBottom: '5%',
    marginTop: 50,
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
    transform: [{translateX: 100}],
  },
  Signin: {
    fontSize: 15,
    color: 'white',
    paddingHorizontal: 8,
    fontFamily: 'ComicNeue-Bold',
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
