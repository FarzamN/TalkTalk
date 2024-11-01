import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'

const TopSheet = (props) => {
    return (
        <View style={[{ position:"absolute",height: '50%', elevation:100 }]}>
            <View style={styles.MainView}>
                <View style={{ height: '90%',  }}>
                    <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ borderRadius: 20 }}>
                        {props.data.map((item, index) => {
                            return (
                                <>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.text}>{item.description}</Text>
                                </>
                            )
                        })}

                    </ScrollView>
                </View>
            </View>
            <TouchableOpacity onPress={props.onPress} style={styles.iconView}>
                <Ionicons name="close" size={40} color={Colors.gradientColor1} />
            </TouchableOpacity>
        </View>
    )
}

export default TopSheet

const styles = StyleSheet.create({
    MainView: {
        backgroundColor: 'white',
        height: '100%',
        // marginBottom: '30%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        // marginTop: '20%'
    },
    title: {
        marginTop: '10%',
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
        marginTop: 30
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