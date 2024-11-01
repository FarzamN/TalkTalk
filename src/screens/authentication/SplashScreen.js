import { View, Text, StatusBar, Image } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../../context/Context';
import { useNavigation } from '@react-navigation/native';
import AuthStack from '../../navigation/AuthStack';
import BottomTabNavigation from '../../navigation/BottomTabNavigation';



const SplashScreen = ({ navigation }) => {

  const { isSignin, setIsSignin, loading } = useContext(AuthContext);

  useEffect(() => {
    getData()

  }, [])

  const getData = async () => {



    // try {
    //   const value = await AsyncStorage.getItem('Videoseen')
    //   if(value !== null && value === 'yes' ) {
    //    //console.log('async value', value)
    //    navigation.navigate('Main');
    //   }else{
    //     setTimeout(()=>{
    //       AsyncStorage.setItem('Videoseen','yes')
    //       navigation.navigate('Main');
    //      },7000)
    //   }
    // } catch(e) {
    //   // error reading value
    // }
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
      <StatusBar backgroundColor={'black'} barStyle={"light-content"} />
      <Image
        source={require('../../components/img/mygiphy.gif')}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  )
}

export default SplashScreen