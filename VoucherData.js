import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  Dimensions,
  StatusBar,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';

import {NavigationContainer, NavigationEvents} from '@react-navigation/native';
import {COLORS} from './Styles/colors';
import ActivityIndi from './ActivityIndi';
import {StylesAll} from './commanStyle/objectStyle';
import {Ltout, loginAction, loginPhoneAction} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';
import VoucherRewardItem from './VoucherRewardItem';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import RBSheet from 'react-native-raw-bottom-sheet';
import BottomView from './BottomView';

const VoucherData = ({navigation}) => {
  const [voucherData, setVoucherData] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  
  const [voucherDataValue, setVoucherDataVaue] = useState(voucherData);

  const [voucherTitle, setVoucheTitle] = useState('');
  const [voucherDescription, setVoucherDescription] = useState('');
  const [voucherPhoto, setVoucherPhoto] = useState('');
  const [voucherId, setVoucherId] = useState('');

  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);
  const {token} = LoginStatus;
  const {loginData} = LoginStatus;

  const refRBSheet = useRef();

  const loginAlertWithTwoButton = () => {
    Alert.alert('Alert', 'Please Login to Reservation', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Detail');
        },
      },
    ]);
  };

  const createAlertWithOneButton = (itemValue) =>
    Alert.alert('Alert', itemValue, [
      {
        text: 'OK',
        onPress: () => {
          console.log('ok'), refRBSheet.current.close();
        },
      },
    ]);
  

  useEffect(() => {
    //loadAPI();
    // const unsubscribe = navigation.addListener('focus', () => {
    //   console.log('focusfocusfocusfocus');
    //   loadAPI();
    // });
    // return () => {
    //   setIsLoadingList(false);
    //   unsubscribe;
    // };

    if (loginData === null) {
      console.log('loginDataloginDataloginDataloginData nulllll');
      setIsLoadingList(false);
      //loginAlertWithTwoButton();
    } else {
      console.log('loginDataloginDataloginDataloginData', token);
      let abort = new AbortController();
      var form = new FormData();
      form.append('api_token', loginData.token);
      fetch(
        'http://tokyo.shiftlogics.com/api/voucher/viewVoucherAPP',
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
            setIsLoadingList(false);
            console.log('data value ', data.data);

            setVoucherData(data.data);
          } else {
            setIsLoadingList(false);
          }
        })
        .catch((e) => console.log(e));
      return () => {
        abort.abort();
      };
    }
    
  }, [navigation]);

  function onPress2() {}

  const addVoucherAPI = (voucherId) => {
    let abort = new AbortController();
    var form = new FormData();
    form.append('api_token', loginData.token);
    form.append('voucherID', voucherId);

    console.log('formformform', form);

    fetch(
      'http://tokyo.shiftlogics.com/api/favourite/addFavourite',
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
          createAlertWithOneButton(data.Msg);
        } else {
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };
  };

  const EmptyListMessage = ({item}) => {

    if (loginData === null) {
      return (
        <View style={StylesAll.alertMsg}>
          <Image
            resizeMode="cover"
            style={{width: 40, height: 40}}
            source={require('./Image/opps.png')}
          />
          <Text style={[{marginTop: 5}, StylesAll.boldFont]}>
            Oops, login is required!
          </Text>
        </View>
      );
    } else {
      return (
        <View style={StylesAll.alertMsg}>
          <Image
            style={{width: 40, height: 40}}
            source={require('./Image/opps.png')}
            resizeMode="cover"
          />
          <Text style={[{marginTop: 5}, StylesAll.boldFont]}>
             No new voucher at this time!
          </Text>
        </View>
      );
    }
  };

  const renderItem = ({item}) => {
    return (
        <View style={StylesAll.rewardLists}>
          <View style={{height: 200}}>
            <Image
              source={{uri: `http://shiftlogics.com/Tokyo/${item.photo}`}}
              style={[
                StylesAll.imageStyle,
                {borderTopLeftRadius: 10, borderTopRightRadius: 10},
              ]}
              resizeMode="cover"
            />
          </View>

          <View
            style={{flexDirection: 'row', padding: 15, alignItems: 'center'}}>
            <View style={{flexDirection: 'column', flex: 1, paddingRight: 10}}>
              <Text style={StylesAll.md_Title} numberOfLines={3}>
                {item.title}
              </Text>
              <Text></Text>
              <Text numberOfLines={2}>Download our app and get this exclusive voucher!</Text>
            </View>
            <View>
              <TouchableOpacity  onPress={() => {

console.log('itemitemitem',item);

navigation.navigate('Voucherdetail',{dataValue : item,isVoucher:true});
}}>
                <View style={StylesAll.sm_Button}>
                  <Text style={StylesAll.btnText}>Redeem</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
     
    );
  };

  return (
    <View style={{ flex: 1,
      flexDirection: 'column',backgroundColor:COLORS.app_bgtheme}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.app_bgtheme}></StatusBar>
      <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
      <View style={StylesAll.commonHeader}>
<Image source={require('./Image/back.png')}/>
<Text style={[StylesAll.main_Title ,{marginBottom:0 ,fontSize:20}]}>VOUCHER</Text>
</View>
</TouchableOpacity>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={voucherData}
          ListEmptyComponent={EmptyListMessage}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{padding:33}}
        />
      </SafeAreaView>
      <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
    </View>
  );
};

export default VoucherData;

const styles = StyleSheet.create({
  carsection1: {
    flex: 1,
    borderRadius: 10,
    height: 300,
    backgroundColor: COLORS.redTheme,
    marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
    width: windowWidth / 2.2,
    flexDirection: 'column',
  },
  emptyListStyle: {
    fontSize: 18,
    textAlign: 'center',
  },
  headerText: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height / 2.5,
  },
});
