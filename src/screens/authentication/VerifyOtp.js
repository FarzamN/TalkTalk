import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import CustomButtton from '../../components/CustomButton';
import Colors from '../../constants/Colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VerifyOtp = ({ navigation }) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const CELL_COUNT = 4;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../assets/background.png')}>
        <View style={styles.container}>
          <View style={styles.headerImageContainer}>
            <Image source={require('../../assets/talktalk_logo.png')} />
            <Image source={require('../../assets/title_logo.png')} />
          </View>

          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View>
              {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back"
            style={styles.backIcon}
            size={25}/>
            </TouchableOpacity> */}

              <Text style={styles.headerText}>Verify OTP</Text>

              <View style={styles.otpContainer}>
                <CodeField
                  ref={ref}
                  {...props}
                  // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />

                <CustomButtton
                  onPress={() => navigation.navigate('ResetPassword')}
                  containerStyle={styles.containerStyle}
                  title="Continue"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginBottom: 30,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  marginBottom: 10,
                  paddingTop: 10,
                  fontFamily: 'ComicNeue-Regular',
                }}>
                You can resend otp in 30 seconds
              </Text>
              <TouchableOpacity>
                <Text
                  style={styles.clickHere}
                // onPress={() => navigation.navigate('CreateAccount')}
                >
                  Click Here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'space-between',

  },

  cell: {
    width: 70,
    height: 70,
    textAlignVertical: 'center',
    fontSize: 24,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    color: 'white',
    borderColor: '#C6C2C2',
    fontFamily: 'ComicNeue-Italic',
  },

  focusCell: {
    borderColor: 'grey',
  },

  headerText: {
    fontSize: 38,
    color: 'white',
    alignSelf: 'flex-start',
    fontFamily: 'ComicNeue-Italic',
    marginLeft: 20,
    marginBottom: 30,
  },
  headerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },

  containerStyle: {
    width: '95%',
    alignSelf: 'center',
    marginTop: '15%',
  },
  clickHere: {
    fontSize: 15,
    color: 'white',
    marginBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 5,
    fontFamily: 'ComicNeue-Bold',
  },

  otpContainer: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 20,
    height: 220,
    marginHorizontal: 10,
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginTop: 40,
    marginLeft: 15,
    marginBottom: 40,
    backgroundColor: 'rgba(186, 26, 217, 1)',
    padding: 6,
    borderRadius: 10,
  },
});
