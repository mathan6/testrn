import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Modal,
  Alert,
  ImageBackground,
} from 'react-native';
import {StylesAll} from './commanStyle/objectStyle';

import QRCode from 'react-native-qrcode-image';
import moment from 'moment';

import {COLORS} from './Styles/colors';
import {ProgressBar, Colors} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';

// export default function RewardDetails({navigation, route}) {

const RewardDetails = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible1, setModalVisible1] = useState(false);

  const [isVisible, setisVisible] = useState(false);

  const [getMilliSec, setMilliSec] = useState(0);
  const [getMin, setMin] = useState(5);
  const [getSec, setSec] = useState(0);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const LoginStatus = useSelector((state) => state.loginDetails);
  const {loginData} = LoginStatus;

const [qrCode,setQrcode ]=useState({})




  //console.log(loginData.token)

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (getSec > 0) {
        setSec((getSec) => getSec - 1);
      }
      if (getSec === 0) {
        if (getMin === 0) {
          clearInterval(myInterval);
        } else {
          setMin((getMin) => getMin - 1);
          setSec((getSec) => getSec + 59);
        }
      }

      if (getMin === 5) {
        setMin((getMin) => getMin - 1);
        setSec(59);
      } else if (getMin === 0 && getSec === 0) {
        navigation.goBack();
      }
      // setProgressState(getSec)
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [getMin, getSec]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      var form = new FormData();
      form.append('api_token', loginData.token);
      form.append('voucherID', route.params?.dataValue.id);

      fetch('http://tokyo.shiftlogics.com/api/redeem/checkRedeem', {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        body: form,
      })
        .then((response) => response.json())
        .then((data) => {
          //  console.log(data)


          if (data.status === 'success') {

            console.log('datadatadataRewardsss',data)


            console.log('QR Code.....',data.data.qr_code);


            setQrcode(data.data.qr_code)
            setQR(data);



          } else if (data.status === 'failure') {
            console.log('fail');

            setisVisible(false);
          }
        })

        .catch((e) => console.log(e));
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const useProgress = (maxTimeInSeconds = getMilliSec) => {
    useEffect(() => {
      const intervalId = setInterval(() => {
        if (progress < 1) {
          setElapsedTime((t) => t + 1);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
      setProgress(elapsedTime / maxTimeInSeconds);
    }, [elapsedTime]);

    return progress;
  };

  const progressx = useProgress();

  const setreddem = () => {
    var form = new FormData();
    form.append('api_token', loginData.token);
    form.append('voucherID', route.params?.dataValue.id);

    fetch('http://tokyo.shiftlogics.com/api/redeem/addRedeem', {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          console.log('setreddemsetreddemsetreddem',data)
          setQrcode(data.data.qr_code)
          setQR(data);
          setModalVisible1(true);
          setModalVisible(false);
        } else if (data.status === 'failure') {
        }
      })

      .catch((e) => console.log(e));
  };

  const setQR = (data) => {
    var maxTime = moment(data.data.max_time);

    let setMaxtime = new Date(maxTime);

    let getMaxtime = setMaxtime.getTime();

    var minTime = moment(data.DateTime);

    let setMintime = new Date(minTime);
    let getMintime = setMintime.getTime();

    let diffTime = getMaxtime - getMintime;

    let secTotal = diffTime / 1000;

    setMilliSec(secTotal);

    let balSec = 300 - secTotal;

    setElapsedTime((ellapse) => ellapse + balSec);

    let mins = Math.floor(diffTime / 60000);
    setMin(mins);

    let secs = ((diffTime % 60000) / 1000).toFixed(0);
    setSec(secs);

    setisVisible(true);

    setModalVisible1(true);
  };

  return (
    <View style={[StylesAll.flexWtrapper,{backgroundColor: '#fafbfb',}]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <View style={ [  StylesAll.headWrapper,   {paddingBottom: 20}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={StylesAll.commonHeader}>
              <Image source={require('./Image/back.png')}   style={StylesAll.headArrow} resizeMode="contain"/>
              <Text
                style={[StylesAll.headTitle]}>
                VOUCHER
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{width: '100%', height: 250}}>
          <ImageBackground
            source={{
              uri: `http://shiftlogics.com/Tokyo/${route.params?.dataValue.photo}`,
            }}
            style={[
              StylesAll.imageStyle,
              {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            {isVisible === true ? (
              <TouchableOpacity onPress={() => setModalVisible1(true)}>
                <QRCode
                  value={
                    loginData != null
                      ? qrCode
                      : 'No Token Please Login'
                  }
                  size={160}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
              </TouchableOpacity>
            ) : null}
          </ImageBackground>
        </View>

        <View style={StylesAll.innerWrapper}>
          <View style={[StylesAll.flexWtrapper, {}]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={StylesAll.md_Title}>
                {route.params?.dataValue.title}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 15,
                }}>
                <Image
                  source={require('./Image/calendar.png')}
                  style={{width: 25, height: 20}}
                  resizeMode="contain"
                />

                <Text style={StylesAll.commom_color}>
                  {' '}
                  Valid till{' '}
                  {moment(route.params?.dataValue.expired_date).format(
                    'MMMM Do YYYY',
                  )}
                </Text>
              </View>

              <Text style={[StylesAll.commom_color, {paddingVertical:18}]}>
                Get {route.params?.dataValue.title} for free when you download
                our app!
              </Text>

              <Text style={StylesAll.commom_color}>
                {route.params?.dataValue.description.replace(
                  /<\/?[^>]+(>|$)/g,
                  '',
                )}
              </Text>
            </ScrollView>
          </View>

          <View
            style={[
              StylesAll.flexWtrapper,
              {justifyContent: 'flex-end', flex: 0.2},
            ]}>
            {isVisible ? null : (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <View style={StylesAll.commonButton}>
                  <Text style={StylesAll.btnText}>REDEEM</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* <View>
                      <TouchableOpacity onPress={() => addFavourite(route.params?.dataValue.id)}>
                        <View style={Styleall.sm_Button}>
                          <Text style={Styleall.btnText}>Reedem</Text>
                        </View>
                      </TouchableOpacity>
                    </View> */}
        </View>
      </SafeAreaView>

      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <SafeAreaView style={StylesAll.flexWtrapper}>
          <View style={[StylesAll.common_Modal, {justifyContent: 'flex-end'}]}>
            <View style={[StylesAll.modalBox]}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image source={require('./Image/icons8-clock.png')} />
              </View>
              <Text></Text>

              <Text style={[StylesAll.main_Title, {textAlign: 'center' ,fontSize:20}]}>
                Redeem in 5 minutes
              </Text>
              <Text></Text>

              <TouchableOpacity onPress={() => setreddem()}>
                <View style={StylesAll.commonButton}>
                  <Text style={StylesAll.btnText}>ACTIVATE</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={StylesAll.ltcancelbtn}>
                  <Text style={StylesAll.btnText}>NOT NOW</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal animationType="none" transparent={true} visible={modalVisible1}>
        <SafeAreaView style={StylesAll.flexWtrapper}>
          <TouchableOpacity
            style={[StylesAll.common_Modal, {padding: 0}]}
            onPress={() => setModalVisible1(false)}>
            <View
              style={[
                StylesAll.flexWtrapper,
                {justifyContent: 'center', alignItems: 'center', padding: 10},
              ]}>
              <View style={StylesAll.redeemQrbox}>
                <QRCode
                  value={
                    loginData != null
                      ? qrCode
                      : 'No Token Please Login'
                  }
                  size={200}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
              </View>
              <Text></Text>
              <Text></Text>
              <Text
                style={[
                  StylesAll.whitecolor,
                  StylesAll.boldFont,
                  {textAlign: 'center'},
                ]}>
                {route.params?.dataValue.title}
              </Text>
            </View>

            <View style={[{flex: 0.1, justifyContent: 'flex-end'}]}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 20,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('./Image/icons8-clock.png')}
                    />

                    <Text style={[{paddingLeft: 10}, StylesAll.boldFont]}>
                      Redeem in
                    </Text>
                  </View>

                  <Text>
                    {getMin + ':' + (getSec < 10 ? '0' : '') + getSec}
                  </Text>
                </View>

                <View style={{}}>
                  <ProgressBar progress={progressx} color={'#9A7527'} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default RewardDetails;