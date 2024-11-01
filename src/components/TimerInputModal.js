import React, {useContext, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import TimerInput from '../components/TimerInput';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/Context';
import CustomButton from '../components/CustomButton';

export function TimerInputModal({
  message,
  isVisible,
  onClose,
  status,
  onPress,
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  const {visible, setVisible, items, setItems} = useContext(AuthContext);
  const endRef = useRef();
  const {startTime, setStartTime, endTime, setEndTime} =
    useContext(AuthContext);
  console.log(startTime);
  const onSubmit = () => {
    console.log('====================================');
    console.log(`start time ${startTime} - end time ${endTime}`);
    console.log('====================================');
    if (startTime >= parseInt(endTime)) {
      alert('Invalid Time Input');
    } else {
      // setItems({
      //   label: `${startTime} - ${endTime}`,
      //   value: `${startTime},${endTime}`,
      // });
      setVisible(false);
    }
    // setVisible(false);
  };

  return (
    <Modal
      visible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={onPress} style={styles.nameicon}>
          <Entypo color={Colors.iconColor} name="cross" size={25} />
        </TouchableOpacity>
        <View style={styles.smallbox}>
          <TimerInput
            onChange={time => setStartTime(time)}
            style={{width: 280}}
            control={control}
            autoFocus={true}
            name="start_time"
            keyboardType="numeric"
            placeholder="Enter Minimum Time"
            placeholderTextColor={'white'}
            onSubmitEditing={() => endRef.current.focus()}
          />
        </View>

        <View style={styles.smallbox}>
          <TimerInput
            onChange={time => setEndTime(time)}
            style={{width: 280}}
            control={control}
            autoFocus={true}
            name="end_Time"
            keyboardType="numeric"
            placeholder="Enter Maximum Time"
            placeholderTextColor={'white'}
            ref={e => (endRef.current = e)}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        </View>

        <View>
          <CustomButton
            containerStyle={styles.containerStyle}
            title="SAVE"
            onPress={handleSubmit(onSubmit)}
            style={styles.enabledButton}
            textStyle={styles.enabledButtonText}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,

    // backgroundColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  smallbox: {
    // alignItems: 'flex-start',
    // alignSelf: 'flex-start',
    // width: '100%',
    backgroundColor: Colors.background,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
    height: Platform.OS == 'ios' ? 50 : 40,
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 15,
    height: 280,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  nameicon: {
    position: 'absolute',
    right: 15,
    top: 8,
  },
  containerStyle: {
    width: '100%',
    alignSelf: 'center',
    marginTop: '5%',
    // marginBottom: '5%',
  },
  enabledButton: {
    alignSelf: 'center',
  },
  enabledButtonText: {
    color: 'white',
  },
});
