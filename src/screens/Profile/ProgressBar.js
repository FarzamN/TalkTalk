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
    Platform
} from 'react-native';
import React, { useState, useRef, useContext, useEffect } from 'react';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomButtton from '../../components/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import CurrentStreak from '../../components/CurrentStreak';

const ProgressBar = ({ navigation }) => {
    const { userDetails, token, setUserDetails, setToken } =
        useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [streak, setTreak] = useState(0);
    const [longestTreak, setLongestTreak] = useState(0);
    const [positions, setPositions] = useState([]);
    console.log(userDetails)
    const avatars = ['https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000', 'https://cdn2.vectorstock.com/i/1000x1000/54/46/new-female-avatar-icon-flat-vector-18115446.jpg', 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-businessman-avatar-icon-flat-style-png-image_1917273.jpg']


    const _getStreak = async () => {
        setPositions([])
        setLongestTreak(0)
        setTreak(0)
        setLoading(true);
        try {
            let base_url = `${baseurl}/get_streak.php`;
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
            console.log("responseData ", responseData)

            if (!response.ok) {
                // throw new Error(responseData.message);
            }
            if (responseData.status === true) {
                setLoading(false);
                setTreak(responseData.current_streak)
                setLongestTreak(responseData.longest_streak)
                setPositions(responseData.position_holders)
                console.log(responseData.position_holders)
                // alert(responseData.Message);
            } else {
                // alert(responseData.Message);
                setLoading(false);

            }
        } catch (error) {
            alert(error.message);
            setLoading(false);

        }
    };

    useEffect(() => {
        _getStreak()
    }, [])

    const percentage = (streak * 100 / longestTreak).toFixed(2)
    const current_streak_percentage = (streak * 100 / 30)
    console.log('percentage', isNaN(percentage), percentage)

    return loading ? (
        <Loader />
    ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ImageBackground
                style={[{ flex: 1 }]}
                source={require('../../assets/background.png')}>

                <ScrollView style={styles.container} >

                    <View style={{ flex: 6 }}>
                        <Header />
                        <Image style={styles.position} source={require('../../assets/Poistion.png')} />
                        <View style={styles.bar}>
                            <View style={styles.card}>
                                {positions.map((item, index) => {
                                    return (

                                        // <ImageBackground imageStyle={{ borderRadius: 100, opacity: 0.8 }} source={{ uri: ProfileUrl + '/' + item.profile_pic }} style={styles.cardChild}>
                                        <ImageBackground key={index} imageStyle={{ borderRadius: 100, opacity: 0.8 }} source={{ uri: item.profile_pic ? ProfileUrl + '/' + item.profile_pic : avatars[index] }} style={styles.cardChild}>
                                            {item.user_id == userDetails.user_id &&
                                                <View  style={styles.you}>
                                                    <Text style={styles.youtext}>You</Text>
                                                </View>
                                            }
                                            <Text style={styles.text}>{item.position}</Text>
                                        </ImageBackground>
                                    )
                                })}
                            </View>
                            {/* <Image style={styles.winnerlogo} source={require('../../assets/winnerLogo.png')} /> */}
                        </View>
                        <Text style={styles.current_streak}>CURRENT STREAK</Text>

                        <CurrentStreak number={streak + ' /' + '30'} />
                        <Text style={styles.longestTreak}>LONGEST STREAK</Text>
                        <CurrentStreak style={{ width: '50%' }} number={streak + ' /' + longestTreak} />
                    </View>
                </ScrollView>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default ProgressBar;

const styles = StyleSheet.create({

    container: {
        flex: 1,

        borderRadius: Platform.OS == 'ios' ? 50 : 0,

    },
    position: {
        alignSelf: 'center',
        marginTop: '5%'
    },
    bar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        width: '100%'
    },
    card: {
        backgroundColor: '#B918DB',
        width: '70%',
        paddingVertical: 10,
        borderRadius: 20,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    cardChild: {
        backgroundColor: 'white',
        width: 40,
        aspectRatio: 1 / 1,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'white'
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    winnerlogo: {
        alignSelf: 'center',
        width: '20%',
        aspectRatio: 1 / 1,

    },
    numberView: {
        marginTop: 10,
        backgroundColor: '#D7D7D7',
        marginHorizontal: '7%',
        // paddingVertical: 15,
        borderRadius: 15,
        // width: '60%'
    },
    number: {
        paddingLeft: '20%',
        fontSize: 20,
        fontWeight: 'bold',

    },
    numberView2: {
        backgroundColor: '#F8A015',
        width: '60%',
        borderRadius: 15,
        paddingVertical: 15,

    },
    you: { width: '40%', aspectRatio: 1 / 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, position: 'absolute', right: 0, elevation: 50, overflow: 'hidden', top: 0 },
    youtext: { color: 'black', fontFamily: 'ComicNeue-Bold', fontSize: 8 },
    longestTreak: { textAlign: 'center', color: 'white', fontSize: 25, fontFamily: 'ComicNeue-Bold', marginTop: '10%', },
    current_streak: { textAlign: 'center', color: 'white', fontSize: 25, fontFamily: 'ComicNeue-Bold', marginTop: '5%', }
});
