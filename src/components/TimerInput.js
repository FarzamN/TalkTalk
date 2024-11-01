import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import React, {forwardRef} from 'react';

const TimerInput = forwardRef((props, ref) => {
  return (
    <SafeAreaView>
      <TextInput
        style={[styles.input, props.style]}
        placeholderTextColor={props.placeholderTextColor}
        value={props.value}
        ref={ref}
        underlineColorAndroid="transparent"
        // onChangeText={field.onChange}-++
        multiline={props.multiline}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        // onChange={props.onChange}
        keyboardType={props.keyboardType}
        onSubmitEditing={props.onSubmitEditing}
        secureTextEntry={props.secureTextEntry}
        defaultValue={props.defaultValue}
        maxLength={props.maxLength}
      />
    </SafeAreaView>
  );
});

export default TimerInput;

const styles = StyleSheet.create({
  input: {
    color: 'white',
    marginLeft: 30,
    width: '120%',
    fontSize: 15,
    fontFamily: 'ComicNeue-BoldItalic',
  },
});
