import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';

const CustomButtton = props => {
  return props.simpleButton ? (
    <TouchableOpacity
      onPress={props.onPress}
      style={[props.containerStyle, styles.containerStyle, { backgroundColor: Colors.background, paddingVertical: 10, borderRadius: 10 }]}>
      <Text style={[styles.font, props.textStyle, { textAlign: 'center', fontFamily: 'ComicNeue-Regular' }]}>{props.title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={props.onPress}
      style={[props.containerStyle, styles.containerStyle]}>
      <LinearGradient
        colors={[Colors.gradientColor2, Colors.gradientColor1]}
        style={[styles.customButtton, props.style]}
        useAngle={true}
        angle={260}>
        <Text style={[styles.font, props.textStyle]}>{props.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButtton;

const styles = StyleSheet.create({
  customButtton: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },

  font: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'ComicNeue-BoldItalic',
  },
});
