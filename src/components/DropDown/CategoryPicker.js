import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import Colors from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Platform, StyleSheet } from 'react-native';


export default function CategoryPicker(props) {
    // const { timer } = props.routes.params;
    // console.log(timer);
    return (
        <DropDownPicker
            placeholder={props.placeholder ? props.placeholder : 'Select Question Category'}
            style={styles.style}
            textStyle={[styles.Textstyle, props.Textstyle]}
            open={props.open}
            value={props.value}
            items={props.items}
            setOpen={props.setOpen}
            setValue={props.setValue}
            showTickIcon={false}
            onSelectItem={props.onSelectItem}
            ArrowDownIconComponent={() => (
                <AntDesign
                    name="down"
                    size={15}
                    color={"white"}
                    style={[styles.arrow, props.arrowStyle]}
                />
            )}
            ArrowUpIconComponent={() => (
                <AntDesign
                    name="up"
                    size={15}
                    color="white"
                    style={[styles.arrow, props.arrowStyle]}
                />
            )}
            disabled={props.disabled}
            setItems={props.setItems}
            dropDownContainerStyle={styles.BorderStyle}
        />
    )
}

const styles = StyleSheet.create({


    style: {
        backgroundColor: Colors.background,
        width: '85%',
        marginBottom: 10,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
        borderColor: 'white',
     
    },

    Textstyle: {
        alignItems: 'flex-start',
        fontSize: 15,
        fontFamily: 'ComicNeue-BoldItalic',
        color: '#ffff',



    },
    BorderStyle: {
        width: '85%',
        backgroundColor: Colors.background,
        borderWidth: 0,
        alignSelf: 'center',
    },

    arrow: {
        padding: 10,
        backgroundColor: Colors.iconColor,
        borderRadius: 10,
    },
});
