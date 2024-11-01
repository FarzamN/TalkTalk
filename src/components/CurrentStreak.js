import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CurrentStreak = (props) => {
    return (
        <View style={styles.numberView}>
            <View style={[styles.numberView2 , props.style]}>

                <Text style={styles.number}>{props.number}</Text>
            </View>

        </View>
    )
}

export default CurrentStreak

const styles = StyleSheet.create({

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
        fontFamily: 'ComicNeue-Bold',

    },
    numberView2: {
        backgroundColor: '#F8A015',
        width: '60%',
        borderRadius: 15,
        paddingVertical: 15,

    }

})