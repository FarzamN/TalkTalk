import { SafeAreaView, StyleSheet, TextInput ,Platform} from "react-native";
import { useController } from 'react-hook-form';
import React, { forwardRef } from 'react'

const Input = forwardRef((props, ref) => {

  const { field } = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
  });

  return (
    <SafeAreaView>
      <TextInput
        style={[styles.input, props.style]}
        placeholderTextColor={props.placeholderTextColor}
        value={field.value}
        ref={ref}
        underlineColorAndroid="transparent"
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        textAlignVertical={props.textAlignVertical}
        placeholder={props.placeholder}
        onChangeText={field.onChange}
        onChange={props.onChange}
        keyboardType={props.keyboardType}
        onSubmitEditing={props.onSubmitEditing}
        secureTextEntry={props.secureTextEntry}
        defaultValue={props.defaultValue}
        maxLength={props.maxLength}
      />
    </SafeAreaView>
  )
})

export default Input

const styles = StyleSheet.create({

  input: {
    color: 'white',
    marginLeft: 30,
    width: '120%',
    fontSize: 15,
    fontFamily: 'ComicNeue-BoldItalic',
     height: Platform.OS == 'ios' ? 50 : 50

  }
})