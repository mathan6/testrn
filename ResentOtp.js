import React, {useEffect, useState, useRef} from 'react';
import {Text, Image, Button, View, StyleSheet, Alert} from 'react-native';
import {COLORS} from './Styles/colors';
import {StylesAll} from './commanStyle/objectStyle';
import ActivityIndi from './ActivityIndi';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {date} from 'yup/lib/locale';

import {
  Ltout,
  loginAction,
  loginPhoneAction,
  loginSocialAction,
} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';

const ResentOtp = ({navigation, route}) => {
  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);

  const {status} = LoginStatus;

  const [apiToken, setApiToken] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [currentOTP, setCurrentOTP] = useState('');
  const [isLoadingList, setIsLoadingList] = useState(false);

  const [seconds, setSeconds] = useState(60);
  const [done, setDone] = useState(false);
  const foo = useRef();

  useEffect(() => {
    function tick() {
      if (seconds >= 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }
    foo.current = setInterval(() => tick(), 1000);
  }, []);

  useEffect(() => {
    console.log('secondssecondssecondsseconds', seconds);

    if (seconds === 0) {
      setSeconds(0 + 0);
      console.log('secondssecondssecondsseconds clear ');
      clearInterval(foo.current);
      setDone(true);
    }
  }, [seconds]);

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
  const resendOTPAPI = () => {
    setDone(false);
    setSeconds(60);

    //   function tick() {
    //     setSeconds(prevSeconds => prevSeconds - 1)
    // }
    //foo.current = setInterval(() => tick(), 1000)

    setIsLoadingList(true);

    let abort = new AbortController();
    var form = new FormData();
    form.append('api_token', route?.params.loginData.api_token),
      form.append('phone', '+' + route.params?.phoneNumberData),
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

          console.log('data value', data);
          if (data.status === 'success') {
            setCurrentOTP('');
            createAlertWithTwoButton1(data.data);
          } else {
            createAlertWithTwoButton1(data.data);
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
    navigation.navigate('Post');
    dispatch(Ltout(purgeStoredState));
  };

  const submitOTPAPI = async () => {
    console.log('mathan');

    clearInterval(foo.current);

    if (currentOTP.length == 4) {
      setIsLoadingList(true);

      try {
        dispatch(Ltout(purgeStoredState));
        await dispatch(
          loginPhoneAction(apiToken, currentOTP, phoneNumber),
        ).then(() => {
          setIsLoadingList(false);
          navigation.navigate('Post');
        });
      } catch {}
    } else {
      createTwoButttonWithoutOTP();
    }
  };

  useEffect(() => {
    if (route?.params.isCreate == true) {
      let abort = new AbortController();
      // var form = new FormData();
      //   form.append('phone',route?.params.phoneNumberData)

      var form = new FormData();
      form.append('api_token', route?.params.loginData.token),
        form.append('phone', '+' + route.params?.phoneNumberData),
        console.log('formformformform', form);

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
          if (data.status === 'success') {
            console.log('datadatadatadata otp otp', data);

            setApiToken(route?.params.loginData.token);
            setPhoneNumber(route.params?.phoneNumberData);

            setIsLoadingList(false);
          } else {
            setIsLoadingList(false);
            console.log('Test mathan');
          }
        })
        .catch((e) => {
          console.log(e);
        });
      return () => {
        abort.abort();
      };
    } else {
      console.log(
        'route?.params.loginData.tokenroute?.params.loginData.token',
        route?.params.loginData.api_token,
      );

      console.log(
        'route.params?.phoneNumberDataroute.params?.phoneNumberData',
        route.params?.phoneNumberData,
      );

      setApiToken(route?.params.loginData.api_token);
      setPhoneNumber(route.params?.phoneNumberData);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, margin: 10}}>
        <Text
          style={{
            fontFamily: 'Roboto-Bold',
            fontSize: 20,
            padding: 10,
            color: 'black',
          }}>
          VERIFY TAC
        </Text>
        <Text style={{padding: 10, fontFamily: 'Roboto-Medium', fontSize: 12}}>
          Please key in the code send to {route.params?.phoneNumberData} via SMS
          within the next 60 seconds
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
          style={{fontFamily: 'Roboto-Bold', fontSize: 17, paddingBottom: 10}}>
          00:{seconds < 10 ? '0' + seconds : seconds}
        </Text>

        {done == false ? (
          <View></View>
        ) : (
          <TouchableOpacity
            onPress={() => resendOTPAPI()}
            disabled={seconds == 0 ? false : true}>
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
                  StylesAll.boldFontLight,
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
        <TouchableOpacity onPress={() => submitOTPAPI()}>
          <View
            style={{
              backgroundColor: COLORS.app_browntheme,
              borderRadius: 18,
              padding: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{fontFamily: 'Roboto-Bold', fontSize: 15, color: 'white'}}>
              SUBMIT
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
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
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: COLORS.app_browntheme,
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.app_browntheme,
  },
});
