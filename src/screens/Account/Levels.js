import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, { useState, useRef, useContext } from 'react';
import Colors from '../../constants/Colors';
import CustomButtton from '../../components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import { CropPickerModal } from '../../components/CropPickerModal';
import CustomBottomTab from '../../navigation/CustomBottomTab';
import { AuthContext } from '../../context/Context';

const Levels = ({ navigation }) => {
  const { userDetails, token, setUserDetails, setToken } =
    useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(false);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setValue(image);
      setVisible(false);
    });
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setValue(image);
      setVisible(false);
    });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={styles.container}
        source={require('../../assets/background.png')}>
        <View style={{ flex: 6 }}>
          <View>
            <Image
              style={styles.image}
              source={require('../../assets/talktalk.png')}
            />
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setVisible(true)}
              style={{}}>
              {value === false ? (
                <>
                  <Image
                    style={styles.imagePickerContainer}
                    source={require('../../assets/image.png')}
                  />
                </>
              ) : (
                <Image
                  source={{ uri: value.path }}
                  style={[styles.imagePickerContainer]}
                />
              )}
            </TouchableOpacity>

            <Text style={styles.headerText}>{userDetails?.name}</Text>
          </View>

          <ScrollView
            contentContainerStyle={{ flex: 1, justifyContent: 'space-around' }}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                // marginTop: 30,
              }}>
              <Image source={require('../../assets/coins.png')} />
              <Text
                style={{
                  fontSize: 25,
                  color: 'white',
                  fontFamily: 'ComicNeue-Bold',
                  marginLeft: 5,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                50 Coins
              </Text>
            </View>

            <View>
              <Image
                style={styles.streak}
                source={require('../../assets/streak.png')}
              />
              <Image
                style={styles.level}
                source={require('../../assets/level.png')}
              />
            </View>

            <CropPickerModal
              isVisible={visible}
              onClose={() => setVisible(false)}
              onImageLibraryPress={openGallery}
              onCameraPress={openCamera}
            />
          </ScrollView>

          {/* <View style={styles.bottomTabContainer}>
            <CustomBottomTab />
          </View> */}
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default Levels;

const styles = StyleSheet.create({
  imagePickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: -15,
  },
  container: {
    flex: 1,

  },

  headerText: {
    fontSize: 25,
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'ComicNeue-Regular',
    marginBottom: 10,
  },

  image: {
    height: 80,
    width: 88,
    alignSelf: 'flex-start',
    marginTop: 15,
    marginLeft: 20,
  },
  level: {
    // marginVertical: 5,
    alignSelf: 'center',
  },
  streak: {
    // marginVertical: 8,
    alignSelf: 'center',
  },
  bottomTabContainer: {
    width: '100%',
    marginBottom: 25,
    marginTop: 10,
    alignSelf: 'center',
  },
});
