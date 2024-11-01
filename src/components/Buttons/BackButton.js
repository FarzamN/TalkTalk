import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const BackButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.backButtonContainer, props.style]}>
            <Ionicons name="arrow-back" color={Colors.themeRed} size={30} />
        </TouchableOpacity>
    );
};

export default BackButton;

const styles = StyleSheet.create({
    backButtonContainer: {
        backgroundColor: Colors.gradientColor1,
        padding: 6,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
});