import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import React, { useState, useContext } from 'react';
import Colors from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../../context/Context';
import RNRestart from 'react-native-restart';
import CustomBottomTab from '../../navigation/CustomBottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
const Statistics = ({ navigation }) => {
  const { setIsSignin, setBottomState, setToken } = useContext(AuthContext);
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userdetail');
      setToken(Math.random());
      setIsSignin(false);
      setBottomState('Home');
    } catch (e) {
      alert(e);
      // remove error
    }
  };
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(102, 80, 255, ${opacity})`,
    useShadowColorFromDataset: false, // optional
    barRadius: 12,
  };
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        data: [50, 100, 40, 70, 56, 30, 5],
      },
    ],
  };
  const screenWidth = Dimensions.get('window').width - 25;
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/background.png')}>
      <View style={{ flex: 6 }}>
        <View style={styles.headerImageContainer}>
          <Image source={require('../../assets/talktalk_logo.png')} />
          <Image source={require('../../assets/title_logo.png')} />
        </View>

        <View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.headerText}>Statistics</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              marginHorizontal: 8,
              borderRadius: 8,
              marginVertical: 20,
            }}>
            <Text style={styles.Text}> This week</Text>
            <BarChart
              style={{
                marginVertical: 10,
                borderRadius: 16,
                paddingRight: 0,
                alignSelf: 'center',
              }}
              data={data}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              withHorizontalLabels={false}
              fromZero={true}
              withInnerLines={false}
            />
          </View>
        </View>
      </View>
      {/* <View style={styles.bottomTabContainer}>
        <CustomBottomTab />
      </View> */}
    </ImageBackground>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  smallbox: {
    paddingHorizontal: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    width: '85%',
    backgroundColor: Colors.background,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 40,
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'ComicNeue-Bold',
  },
  Text: {
    fontSize: 20,
    color: '#060033',
    alignSelf: 'flex-start',
    fontFamily: 'ComicNeue-Bold',
    marginTop: 10,
  },
  boxtext: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'ComicNeue-BoldItalic',
    textAlign: 'center',
    width: '100%',
  },
  headerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  bottomTabContainer: {
    width: '100%',
    marginBottom: 25,
    alignSelf: 'center',
  },
});
