import React,{useEffect} from 'react';
import {View, Text, StatusBar, SafeAreaView, Image,TouchableOpacity} from 'react-native';
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
 
        <View style={{marginBottom: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={[
                StylesAll.commonHeader,
                {paddingHorizontal: 0, paddingTop: 0},
              ]}>
              <Image source={require('./Image/back.png')} />
              <Text
                style={[StylesAll.main_Title, {marginBottom: 0, fontSize: 20}]}>
                {route.params?.isPayment === true ? 'PAY' : 'TOP UP'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
              

        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={[StylesAll.qrBox,{justifyContent:'center',alignItems:'center'}]}>
          <QRCode
          value={ (loginData != null) ? loginData.token : "No Token Please Login"}
          size={200}
          bgColor='#FFFFFF'
          fgColor='#000000'
          />
          <View style={{position:"absolute" , top:"55%" ,left:"55%"}}>
<Image source={require('./Image/QRimage.jpeg')} style={{width:50 ,height:50,}} resizeMode="contain"/>
</View>
          </View>

          <View style={StylesAll.qrbottomBox}>
            <Text style={StylesAll.btnText}>Wallet</Text>

            <Text style={StylesAll.btnText}>RM {(Math.round(route.params?.memberData.wallet * 100) / 100).toFixed(2)} </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Payment;
