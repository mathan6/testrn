'use strict';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Linking,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React, {Component, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {StylesAll} from './commanStyle/objectStyle';

const ScanQr = ({navigation}) => {

  const [isLoadingList, setIsLoadingList] = useState(false);
  

  const onSuccess = (e) => {
    console.log('eeee', e);
  };

  const screenHeight = Math.round(Dimensions.get('window').height);
  const screenWidth = Math.round(Dimensions.get('window').width);

  return (
    <View
      style={{flex: 1, backgroundColor: '#fafbfb', flexDirection: 'column'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <View style={StylesAll.headWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={[StylesAll.commonHeader]}>
              <Image
                source={require('./Image/back.png')}
                resizeMode="contain"
                style={StylesAll.headArrow}
              />
              <Text style={[StylesAll.headTitle]}>ORDER</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 15, paddingLeft: 25, marginVertical: 20}}>
            Scan QR Code
          </Text>
          <QRCodeScanner
            markerStyle={{borderColor: '#fff', borderRadius: 10}}
            onRead={onSuccess}
            showMarker={true}
            containerStyle={{marginTop: 10}}
            cameraStyle={{
              height: screenHeight,
              width: screenWidth,
              alignSelf: 'center',
              justifyContent: 'center',
            }}></QRCodeScanner>
             
        </View>
      </SafeAreaView>
    </View>
  );
};
export default ScanQr;
