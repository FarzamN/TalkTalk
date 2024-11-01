import {Text, ImageBackground} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = ({navigation}) => {
  return (
    <ImageBackground
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      source={require('../assets/background.png')}>
      <LottieView
        style={{
          width: 300,
          height: 300,
        }}
        source={require('../assets/lotties/loader.json')}
        autoPlay
        loop
        speed={0.7}
      />
    </ImageBackground>
  );
};

export default Loader;
