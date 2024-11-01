import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        },
        props.style,
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
      {props.visible ? (
        <Image
          style={[styles.image]}
          source={require('../../assets/randomquestions.png')}
          //   source={require('../../assets/talktalk_login.png')}
        />
      ) : (
        <Image
          style={styles.image}
          source={require('../../assets/talktalk_login.png')}
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: 90,
    aspectRatio: 1 / 1,
    marginRight: 20,
    marginTop: 10,
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
});
