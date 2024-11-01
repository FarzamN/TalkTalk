import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useController } from 'react-hook-form';
import React, { forwardRef } from 'react'

const InputWithoutValidation = (props) => {
    return (
        <SafeAreaView>
            <TextInput
                style={[styles.input, props.style]}
                placeholderTextColor={props.placeholderTextColor}
                value={props.value}
                underlineColorAndroid="transparent"
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                textAlignVertical={props.textAlignVertical}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                onChange={props.onChange}
                keyboardType={props.keyboardType}
                onSubmitEditing={props.onSubmitEditing}
                secureTextEntry={props.secureTextEntry}
                defaultValue={props.defaultValue}
                maxLength={props.maxLength}
            />
        </SafeAreaView>
    )
}

export default InputWithoutValidation

const styles = StyleSheet.create({

    input: {
        color: 'white',
        marginLeft: 20,
    }
})