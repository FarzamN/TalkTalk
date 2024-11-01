import React from 'react';
import {StyleSheet, SafeAreaView, Pressable, Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';


export function CropPickerModal({
  isVisible,
  onClose,
  onImageLibraryPress,
  onCameraPress,
}) {
  return (
    <Modal
      visible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}>
        <View style={{backgroundColor:Colors.background , borderTopRightRadius:20, borderTopLeftRadius:20}}>

        
        {/* <LinearGradient colors={[Colors.gradientColor1 , Colors.gradientColor2]}> */}
      <SafeAreaView style={styles.buttons}>
        <Pressable style={styles.button} onPress={onImageLibraryPress}>
          <FontAwesome style={styles.buttonIcon} name="picture-o" size={30} />
          <Text style={styles.buttonText}>Gallery</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onCameraPress}>
          <Entypo style={styles.buttonIcon} name="camera" size={30} />
          <Text style={styles.buttonText}>camera</Text>
        </Pressable>
      </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  buttonIcon: {
    alignSelf: 'center',
  },
  buttons: {
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
      flexDirection: 'row',
      paddingVertical: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    letterSpacing: -0.34,
  },
});