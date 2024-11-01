import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'

// icons 

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// colors 

import Colors from '../../constants/Colors'



export default function SpeechQuestion(props) {
    return props.loading ?
        <View
            style={[styles.mainView, props.style, { height: '20%', alignItems: 'center', justifyContent: 'center' }]}>
            <ActivityIndicator color={Colors.border} size={'large'} />
        </View>
        : (
            <View
                style={[styles.mainView, props.style]}>

                {!props.comma &&
                    <Text
                        style={styles.commaText}>
                        “
                    </Text>
                }

                <Text
                    style={[styles.question, props.TextStyle]}>
                    {props.question}
                </Text>

                {!props.comma &&
                    <Text
                        style={styles.commaEnd}>
                        ”
                    </Text>
                }
                {props.questionVisible &&
                    <TouchableOpacity onPress={props.onPress} style={[styles.nextQuestionView, props.nextQuestionView]}>
                        <Text style={styles.nextQuestionText}>Next Question</Text>
                        <View style={styles.iconView}>
                            <MaterialIcons name='arrow-forward-ios' size={14} />
                        </View>
                    </TouchableOpacity>
                }

            </View>
        )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: Colors.background,
        // height: '50%',
        width: '90%',
        // justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        paddingVertical: 20,
        // marginTop: '10%',
        borderWidth: 1,
        borderColor: '#F023A9',
    },


    commaText: {
        fontSize: 60,
        color: 'white',
        // height: '30%',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 25,
        alignSelf: 'flex-start',
        fontFamily: 'ComicNeue-Bold',
        // paddingTop: 10,

    },
    question: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'ComicNeue-Regular',
        alignSelf: 'center',
        width: '75%',
        textAlign: 'center',
    },
    commaEnd: {
        fontSize: 60,
        color: 'white',
        // height: '40%',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 25,
        alignSelf: 'flex-end',
        fontFamily: 'ComicNeue-Bold',
    },
    nextQuestionView: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: 10 },
    nextQuestionText: { fontFamily: 'ComicNeue-Regular', color: Colors.gradientColor1, fontSize: 19, paddingHorizontal: 10, },
    iconView: { backgroundColor: Colors.gradientColor1, padding: 5, borderRadius: 50 }
})
