import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors'

const AccountCard = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.smallbox}>
            <Text style={[styles.boxtext, props.style]}>{props.title}</Text>
            <Ionicons
                style={styles.forwardicon}
                name={props.Icons}
                size={28}
            />
        </TouchableOpacity>
    )
}

export default AccountCard

const styles = StyleSheet.create({
    forwardicon: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
       

    },
    smallbox: {
        paddingLeft: 20,
        paddingRight: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 12,
        width: '90%',
        backgroundColor: Colors.background,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: 'white',
        paddingVertical: 14,
        marginBottom: 10,
    },
    boxtext: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'ComicNeue-BoldItalic',
        textAlign: 'left',
        width: '100%',
    },
})