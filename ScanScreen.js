'use strict';
import { View, Image, Text, TouchableOpacity, Dimensions,Linking } from 'react-native'
import React, { Component,useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScanQr = ({ navigation }) => {
 const [isLoadingList,setIsLoadingList] =  useState(false);

  const onSuccess = (e) => {
    
     console.log("eeee",e);

    //  let abort = new AbortController();
    //  var form = new FormData();
    //  form.append('api_token',e),
  
    //       fetch( 
    //          'http://tokyo.shiftlogics.com/api/user/data',
    //           {
    //              method: 'POST',
    //              headers: new Headers({
    //              Accept: 'application/json',
    //              'Content-Type': 'multipart/form-data',
    //             }),
    //              body: form,
    //          },
    //          {signal: abort.signal}, 
    //           )
    //          .then((response) => response.json())

           
    //          .then((data) => {
    //            setIsLoadingList(false);

    //            console.log("data value",data);
    //              if (data.status === 'success')  {
    //                 // setCurrentOTP('');
    //                 // createAlertWithTwoButton1(data.data);
    //               } else {
                     
    //               }
    //              })
    //              .catch((e) => {
    //                      console.log(e);
                    
    //              })
    //              return () => {
    //              abort.abort();
    //              };



  } 

  const screenHeight = Math.round(Dimensions.get('window').height);
  const screenWidth = Math.round(Dimensions.get('window').width);

    return (
        <View style={{ flex: 1 }}>
             <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, alignSelf: 'center', marginTop:20 }}>Scan QR Code</Text>
                <QRCodeScanner
              markerStyle={{borderColor: '#fff', borderRadius: 10}}
                 onRead={onSuccess}
                  showMarker={true}
                  containerStyle={{ marginTop: 10 }}
                  cameraStyle={{ height: screenHeight, width: screenWidth, alignSelf: 'center', justifyContent: 'center' }}>
                </QRCodeScanner>
             </View>
        </View>
    )
}
export default ScanQr