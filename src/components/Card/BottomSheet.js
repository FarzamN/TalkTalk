import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'

const BottomSheet = (props) => {
    return (
        <View style={[{ 
            position :  Platform.OS == "ios" ? 'absolute' : 'relative',
        top:  Platform.OS == "ios" ? '10%' : '0%',
        height: Platform.OS == "ios" ? '100%' : '75%', }]}>
            <View style={styles.MainView}>
                <TouchableOpacity onPress={props.onPress} style={styles.iconView}>
                    <Ionicons name="close" size={40} color={Colors.gradientColor1} />
                </TouchableOpacity>
                <View style={{ height: '60%' }}>
                    <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ borderRadius: 20 }}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.text}>{props.text}</Text>
                        <View
                        style={{height:"20%"}}
                        >

                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    MainView: {
        backgroundColor: 'white',
        height: '100%',
        // marginBottom: '30%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: '20%',
    },
    title: {
        // marginTop: '5%',
        color: '#3E3C3C',
        fontFamily: 'ComicNeue-Bold',
        fontSize: 26,
        textAlign: 'center',
    },
    text: {
        color: '#3E3C3C',
        fontFamily: 'ComicNeue-Bold',
        fontSize: 14,
        textAlign: 'center',
        width: '80%',
        alignSelf: 'center',
        marginTop: 15
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: '18%',
        backgroundColor: Colors.background,
        aspectRatio: 1 / 1,
        borderRadius: 100,
        marginTop: '-8%',
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: '5%'
    }
})