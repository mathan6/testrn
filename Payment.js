import React,{useEffect} from 'react';
import {View, Text, StatusBar, SafeAreaView, Image} from 'react-native';
import {StylesAll} from "./commanStyle/objectStyle"

import QRCode from 'react-native-qrcode-image';
 
import { Ltout,loginAction,loginPhoneAction} from './actions/loginActions'
import { useDispatch,useSelector } from "react-redux";
import { purgeStoredState } from "redux-persist";


 const Payment = ({ navigation,route}) => {

    const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
    const LoginStatus = useSelector((state) => state.loginDetails);
    const{loginData} = LoginStatus

    //route?.params.

    useEffect(() => {
         
        console.log('routeroute',route);
        console.log('aaaa',route.params?.memberData.wallet);
       

    }, [])

  return (

 
    <View style={StylesAll.commonWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={[StylesAll.qrBox,{justifyContent:'center',alignItems:'center'}]}>
          <QRCode
          value={ (loginData != null) ? loginData.token : "No Token Please Login"}
          size={200}
          bgColor='#FFFFFF'
          fgColor='#000000'
          />
          </View>

          <View style={StylesAll.qrbottomBox}>
            <Text style={StylesAll.btnText}>Wallet</Text>

            <Text style={StylesAll.btnText}>RM {route.params?.memberData.wallet}</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Payment;
