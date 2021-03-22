import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  Image,
  Button,
  View,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {COLORS} from './Styles/colors';
import {StylesAll} from './commanStyle/objectStyle';
import ActivityIndi from './ActivityIndi';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {date} from 'yup/lib/locale';

import {
  Ltout,
  loginAction,
  loginPhoneAction,
  loginSocialAction,
} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";



const ResentOtp = ({navigation, route}) => {

  const[ deviceToken,setdeviceToken]=useState('')
  const[ deviceType ,setdeviceType]=useState('')



  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//

  const LoginStatus = useSelector((state) => state.loginDetails);
  const {loginData} = LoginStatus;

  const [apiToken, setApiToken] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [currentOTP, setCurrentOTP] = useState('');
  const [isLoadingList, setIsLoadingList] = useState(false);
 
  const [done, setDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [errorCheck, seterrorCheck] = useState(false);
  const [errorMsg, setErrormsg] = useState('');

  const [minutesTimer, setMinutesTimer] = useState(0);
  const [secondsTimer, setSecondsTimer] = useState(60);
  const foo = useRef();



   
  PushNotification.createChannel(
    {
      channelId: 'tokyosecret_notification_123', // (required)
      channelName: 'tokyosecret', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
    // (optional) callback returns whether the channel was created, false means it already existed.
  );

   PushNotification.configure({
     
      onRegister: function (uniqueData) {
      setdeviceToken(uniqueData.token);
      setdeviceType(uniqueData.os);

    },

     onNotification:function (notification) {
       const {title, body} = notification.data;
  

      PushNotification.localNotification({
        /* Android Only Properties */
         channelId: 'tokyosecret_notification_123', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
         largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
         largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
         smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
         bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
         subText: 'This is a subText', // (optional) default: none
         bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
         color: 'red', // (optional) default: system default
         priority: 'high', // (optional) set notification priority, default: high
         visibility: 'private', // (optional) set notification visibility, default: private
         ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
         onlyAlertOnce: false,
        /* iOS only properties */
         alertAction: 'view', // (optional) default: view
         category: '', // (optional) default: empty string

      /* iOS and Android properties */
         title: title, // (optional)
         message: body, // (required)
         playSound: true, // (optional) default: true
         soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)       
     },);
     notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    senderID:'945025541582',
    permissions: {
     alert: true,
      badge: true,
      sound: true,
    },
     popInitialNotification: true,
     requestPermissions: true,
   });
  const notificationValues = {
     tok: deviceToken,
     os: deviceType,
};



  setTimeout(()=>{
    if(errorCheck===true){
      seterrorCheck(false)
    }
    },1000)


  const applyRefercode = () => {
    setIsLoadingList(true);
    if (referralCode === '') {
      seterrorCheck(true);
      setErrormsg('Kindly enter your referral code')
      //createAlertWithTwoButton1('Kindly enter your referral code');
    } else {
      let abort = new AbortController();
      var form = new FormData();
      form.append('api_token', apiToken);
      form.append('referral_code',referralCode);
console.log('formformform',form)

      fetch(
        'http://tokyo.shiftlogics.com/api/user/referral',
        {
          method: 'POST',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }),
          body: form,
        },
        {signal: abort.signal},
      )
        .then((response) => response.json())
        .then((data) => {
          setIsLoadingList(false);

          if (data.status === 'success') {

            console.log('datadatadatadata success',data);

            setCurrentOTP('');
            createAlertWithTwoButton1(data.data);
          } else {
            console.log('datadatadatadata fall',data);
            //createAlertWithTwoButton1(data.data);
            seterrorCheck(true);
            setErrormsg(data.data)
          }
        })
        .catch((e) => console.log(e));
      return () => {
        abort.abort();
      };
    }
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (secondsTimer > 0) {
        setSecondsTimer(secondsTimer - 1);
      }
      if (secondsTimer === 0) {
        if (minutesTimer === 0) {
          clearInterval(myInterval);
          setDone(true);
        } else {
          setMinutesTimer(minutesTimer - 1);
          setSecondsTimer(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [secondsTimer, minutesTimer]);


  
  const createTwoButttonWithoutOTP = () => {
    Alert.alert('Alert', 'Please Fill OTP Fields', [
      {
        text: 'OK',
        onPress: () => {
          console.log('OK Press');
        },
      },
    ]);
  };

  const createAlertWithTwoButton1 = (itemValue) =>
    Alert.alert(
      itemValue,
      '',
      [
        {
          text: 'cancel',

          style: 'cancel',
        },
        {text: 'ok', onPress: () => {}},
      ],
      {cancelable: false},
    );

  const createAlertWithTwoButton = (itemValue) =>
    Alert.alert(
      itemValue,
      '',
      [
        {
          text: 'cancel',

          style: 'cancel',
        },
        {
          text: 'ok',
          onPress: () => {
            if (itemValue == 'Otp verified successfully!') {
              // navigation.goBack('Post')
              //navigation.navigate('Post');

              navigation.goBack();
            } else {
              navigation.goBack();
            }
          },
        },
      ],
      {cancelable: false},
    );

  const resendOTPAPI = (apiUrl) => {

    console.log('apiUrlapiUrlapiUrlapiUrlapiUrl',apiUrl)


    console.log('route?.params.loginfrom',route?.params.loginfrom);
    setSecondsTimer(60);
    setMinutesTimer(0);
    setDone(false);

    setIsLoadingList(true);

    let abort = new AbortController();
    var form = new FormData();
    form.append('api_token', apiToken),
      form.append('phone', phoneNumber),

      console.log('formformformformformformformformformformformform',form);

      fetch(
        apiUrl,
        {
          method: 'POST',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }),
          body: form,
        },
        {signal: abort.signal},
      )
        .then((response) => response.json())

        .then((data) => {
          setIsLoadingList(false);

          if (data.status === 'success') {

            if(route?.params.loginfrom == 'Login'){
              createAlertWithTwoButton1(data.msg);
            }else{
              createAlertWithTwoButton1(data.data);
            }
            console.log('data datadatadata resend',data)
            setCurrentOTP('');
            
          } else {
            
            setErrormsg(data.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    return () => {
      abort.abort();
    };
  };

  const failLogin = () => {
    navigation.navigate('Home');
    dispatch(Ltout(purgeStoredState));
  };

  const submitOTPAPI = async () => {

    console.log('apiTokenapiTokenapiToken',apiToken);
    console.log('phoneNumberphoneNumber',phoneNumber);
 
    if (currentOTP.length == 4) {
      seterrorCheck(false);
      setIsLoadingList(true);

      try {
        dispatch(Ltout(purgeStoredState));
        await dispatch(
          loginPhoneAction(apiToken, currentOTP, phoneNumber,(route?.params.loginfrom == 'Login') ? 'http://tokyo.shiftlogics.com/api/user/loginotpverified' : 'http://tokyo.shiftlogics.com/api/user/otpverified',notificationValues),
        ).then(() => {
          setIsLoadingList(false);
          navigation.navigate('Home');
        });
      } catch {}
    } else {
      seterrorCheck(true);
 
      setErrormsg('Kindly Fill OTP Fields');
      //createTwoButttonWithoutOTP();
    }
  };
  loginfrom: 'Create',
  useEffect(() => {
    if (route?.params.loginfrom == 'Create') {
        let abort = new AbortController();
        var form = new FormData();

        console.log('route?.params.loginData.token',route?.params.loginData.token);
        console.log('route.params?.phoneNumberData',route.params?.phoneNumberData)


        form.append('api_token', route?.params.loginData.token),
        form.append('phone',route.params?.phoneNumberData),

        console.log('formmmmm',form)
        fetch(
          'http://tokyo.shiftlogics.com/api/user/sendotp',
          {
            method: 'POST',
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            }),
            body: form,
          },
          {signal: abort.signal},
        )
          .then((response) => response.json())

          .then((data) => {

            setIsLoadingList(false);
            Alert.alert(
              data.data,
              '',
              [
                {
                  text: 'ok',
                  onPress: () => {
                    if (data.status === 'success') {
                      console.log('token',route?.params.loginData.token);
                      console.log('phoneNumberData',route.params?.phoneNumberData);
                      setApiToken(route?.params.loginData.token);
                      setPhoneNumber(route.params?.phoneNumberData);
                    }else{
                      
                    }
                   
                  },
                },
              ],
              {cancelable: false},
            );
 
          })
          .catch((e) => {
            console.log(e);
          });
      return () => {
        abort.abort();
      };
    } else {
      console.log('route?.params.loginData.api_token',route?.params.loginData.api_token)
      console.log('route?.params.loginData.api_token2222',route?.params.loginData.token)
      console.log('route.params?.phoneNumberData',route.params?.phoneNumberData)
      if (route?.params.loginfrom == 'Social') {
        setApiToken(route?.params.loginData.token);
      }else{
        setApiToken(route?.params.loginData.api_token);
      }
      setPhoneNumber(route.params?.phoneNumberData);
    }
  }, []);

  return (
    <View
      style={{flex: 1, flexDirection: 'column', backgroundColor: '#fafbfb'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        {errorCheck ? (
          <View style={StylesAll.errorSnackbar}>
            <Image
              resizeMode="cover"
              style={{width: 30, height: 30, tintColor: '#fff'}}
              source={require('./Image/opps.png')}
            />

            <View style={{flexDirection: 'column', paddingLeft: 13}}>
              <Text style={StylesAll.whitecolor}>Tokyo Secret</Text>
              <Text style={[StylesAll.mediamFont, StylesAll.whitecolor]}>
                {errorMsg}
              </Text>
            </View>
          </View>
        ) : null}

     <View style={{marginBottom: 10, marginHorizontal: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={[StylesAll.commonHeader1]}>
              <Image
                source={require('./Image/back.png')}
                style={StylesAll.headArrow}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>


        <View style={{flex: 1, margin: 20, marginTop: 30}}>
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              fontSize: 20,
              padding: 10,
              color: 'black',
            }}>
            VERIFY TAC
          </Text>
          <Text
            style={{
              padding: 10,
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              color: 'gray',
            }}>
            Please key in the code send to {route.params?.phoneNumberData} via
            SMS within the next 60 seconds
          </Text>
        </View>

        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 20,
              paddingBottom: 10,
            }}>
            00 : {secondsTimer < 10 ? '0' + secondsTimer : secondsTimer}
          </Text>

          {done == false ? (
            <View></View>
          ) : (
            <TouchableOpacity onPress={() => resendOTPAPI((route?.params.loginfrom == 'Login') ? 'http://tokyo.shiftlogics.com/api/user/loginphone' : 'http://tokyo.shiftlogics.com/api/user/sendotp')}>
              <View
                style={[
                  {
                    padding: 10,
                    width: 180,
                    backgroundColor: COLORS.app_browntheme,
                    borderRadius: 50,
                  },
                ]}>
                <Text
                  style={[
                    {color: 'white', textAlign: 'center'},
                    StylesAll.boldFont,
                  ]}>
                  RESEND CODE
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <OTPInputView
            style={{width: '80%', height: 100}}
            pinCount={4}
            editable={true}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            code={currentOTP}
            onCodeChanged={(code) => {
              setCurrentOTP(code);
            }}
            onCodeFilled={(code) => {
              setCurrentOTP(code);
            }}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', margin: 20}}>

          {(route?.params.loginfrom == 'Login') ? null : <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={{padding: 20, textAlign: 'center'}}>
              I have a referral code
            </Text>
          </TouchableOpacity>}
          
          <TouchableOpacity onPress={() => submitOTPAPI()}>
            <View
              style={{
                backgroundColor: COLORS.app_browntheme,
                borderRadius: 50,
                padding: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Roboto-Bold',
                  fontSize: 15,
                  color: 'white',
                }}>
                SUBMIT
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal animationType="none" transparent={true} visible={modalVisible}>
          <View style={[StylesAll.common_Modal, {justifyContent: 'center'}]}>
            <View style={StylesAll.modalBox}>
              <Text style={[StylesAll.main_Title]}>Referral Code</Text>

              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: COLORS.grey_line,
                  paddingHorizontal: 10,
                  borderRadius: 50,
                  marginTop: 10,
                  height: 45,
                }}
                onChangeText={(text) => setReferralCode(text)}
                placeholder={'Enter referral code'}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignContent: 'center',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={{flex: 1}}>
                  <View style={[StylesAll.cancelBtn, StylesAll.mediumBtn1]}>
                    <Text
                      style={[
                        StylesAll.whitecolor,
                        StylesAll.boldFont,
                        {textAlign: 'center', padding: 10},
                      ]}>
                      CLOSE
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => applyRefercode()}
                  style={{flex: 1}}>
                  <View style={[StylesAll.viewBtn, StylesAll.mediumBtn1]}>
                    <Text
                      style={[
                        StylesAll.whitecolor,
                        StylesAll.boldFont,
                        {textAlign: 'center', padding: 10},
                      ]}>
                      SUBMIT
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
      </SafeAreaView>
    </View>
  );
};

export default ResentOtp;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderBottomWidth: 2,
    borderColor: COLORS.app_browntheme,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: COLORS.app_browntheme,
    color: COLORS.app_browntheme,
  },

  underlineStyleHighLighted: {
    borderBottomWidth: 2,
    borderColor: COLORS.app_browntheme,
  },
});
