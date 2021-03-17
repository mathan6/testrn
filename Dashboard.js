import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {date} from 'yup/lib/locale';
import {} from './';
import ActivityIndi from './ActivityIndi';
import {StylesAll} from './commanStyle/objectStyle';
import {COLORS} from './Styles/colors';
import moment from 'moment';

import {Ltout, loginAction, loginPhoneAction} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DATA = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'Third Item',
  },
  {
    title: 'Fourth Item',
  },
];

const Dashboard = ({navigation}) => {
  //Declaration

  const [userData, setUserData] = useState({});

  const [isLoadingList, setIsLoadingList] = useState(true);

  const [favourite, setFavourite] = useState([]);

  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//

  const LoginStatus = useSelector((state) => state.loginDetails);

  const {loginData} = LoginStatus;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focusfocusfocusfocusfocusfocusfocus');

      if (loginData !== null) {
        let abort = new AbortController();
        var form = new FormData();
        form.append('api_token', loginData.token);

        console.log('formformformform', form);

        fetch(
          'http://tokyo.shiftlogics.com/api/favourite/viewFavourite',
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
            console.log('datadatadatadata', data);

            if (data.status === 'success') {
              setFavourite(data.data);
            } else {
            }
          })
          .catch((e) => console.log(e));

        return () => {
          abort.abort();
        };
      } else {
        // loginAlertWithTwoButton();
      }
    });
    return () => {
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focusss');

      if (loginData != null) {
        let abort = new AbortController();
        var form = new FormData();

        fetch(
          `http://tokyo.shiftlogics.com/api/user/data?api_token=${loginData.token}`,
          {
            method: 'GET',
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            }),
            //  body: form,
          },
          {signal: abort.signal},
        )
          .then((response) => response.json())

          .then((data) => {
            console.log('datadatadatadata44444', data);

            if (data.status === 'success') {
              setUserData(data.data);

              Object.entries(data.data).forEach(([key, value]) => {
                console.log('key value', key, value);
              });

              console.log('data.datadata.data', data.data);

              setIsLoadingList(false);
            } else {
              setIsLoadingList(false);
            }
          })
          .catch((e) => console.log(e));
        return () => {
          abort.abort();
        };
      } else {
        setIsLoadingList(false);
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={[StylesAll.rewardLists,{marginRight:15,width:windowWidth/1.4}]}>
        <View style={{height: 200, width: '100%'}}>
          <Image
            source={{uri: `http://shiftlogics.com/Tokyo/${item.photo}`}}
            style={[
              StylesAll.imageStyle,
              {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: COLORS.app_brownlightheme,
              },
            ]}
            resizeMode="cover"
          />
        </View>

        <View style={{flexDirection: 'row', padding: 15, alignItems: 'center'}}>
          <View style={{flexDirection: 'column', paddingRight: 10,flex:1}}>
            <Text style={StylesAll.md_Title} numberOfLines={1} ellipsizeMode={'tail'}>
              {item.title}
            </Text>
            <Text></Text>
            <Text numberOfLines={2}>
              Download our app and get this exclusive voucher!
            </Text>
          </View>
          <View style={{flex:0.5}}>
            <TouchableOpacity onPress={() =>{
              navigation.navigate('Voucherdetail',{dataValue : item,isVoucher : true});
            }}>
              <View style={StylesAll.sm_Button}>
                <Text style={[StylesAll.btnText,{textAlign:'center'}]}>Invite</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = ({}) => {
    return (
      <View>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
      </View>
    );
  };

  const LoginEmpty = () => {

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
   
  };


  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>

        {loginData === null ? <LoginEmpty/> :   
      <SafeAreaView style={{flex: 1, flexDirection: 'column',backgroundColor:'#FFF'}}>
  <View style={{marginBottom:10,paddingHorizontal:20}}>
<TouchableOpacity onPress={()=>navigation.goBack()}>
<View style={[StylesAll.commonHeader ,{paddingHorizontal:0 ,paddingTop:0}]}>
<Image source={require('./Image/back.png')}/>
<Text style={[StylesAll.main_Title ,{marginBottom:0 ,fontSize:20}]}>MEMBER</Text>
</View>
</TouchableOpacity>

</View>

        
        <View style={StylesAll.Wallet_layer1}>
          <Text>Wallet Balance</Text>
          <Text></Text>
        
          <Text style={StylesAll.wl_ammount}>RM {(Math.round(userData.wallet * 100) / 100).toFixed(2)} </Text>
        </View>

        <View style={StylesAll.commonWrapper}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 30,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Payment', {
                    memberData: userData,
                    isPayment: true,
                  });
                }}>
                <View style={StylesAll.listButton}>
                  <Image
                    source={require('./Image/pay.png')}
                    style={StylesAll.btnIcons}
                  />

                  <Text style={StylesAll.btnText}>Pay</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Payment', {
                    memberData: userData,
                    isPayment: false,
                  });
                }}>
                <View style={StylesAll.listButton}>
                  <Image
                    source={require('./Image/topup.png')}
                    style={StylesAll.btnIcons}
                  />

                  <Text style={StylesAll.btnText}>Top Up</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={()=>{
                  navigation.navigate('History');
                }}
              >
                <View style={StylesAll.listButton}>
                  <Image
                    source={require('./Image/history.png')}
                    style={StylesAll.btnIcons}
                  />

                  <Text style={StylesAll.btnText}>History</Text>
                </View>
              </TouchableOpacity>
            </View>

            <ImageBackground
               imageStyle={{ borderRadius:15,}}
              source={require('./Image/member_card.png')}
              style={{width: '100%', height: 232}}
              >
              <View style={{paddingVertical: 30, position: 'relative'}}>
                <View style={StylesAll.memberStatus}>
                  <Text
                    style={[
                      global.whitecolor,
                      {fontSize: 18, textAlign: 'center'},
                    ]}>
                    {' '}
                    <Text style={{fontFamily: 'Roboto-Bold', color: '#fff'}}>
                      {userData.user_type}
                    </Text>
                    <Text style={{fontFamily: 'Roboto-Medium', color: '#fff'}}>
                      {' '}
                      MEMBER
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 30,
                    paddingHorizontal:20
                  }}>
                  <View>
                    <Text
                      style={[
                        StylesAll.whitecolor,
                        StylesAll.boldFont,
                        {fontSize: 15,marginBottom:10},
                      ]}>
                      {userData.name}
                    </Text>

                    <Text style={[StylesAll.whitecolor,{fontSize:12,paddingBottom:5}]}>
                      ID:{userData.referral_code}
                    </Text>

                    <Text style={[StylesAll.whitecolor,{fontSize:12}]}>
                      Member Since :{' '}
                      {moment(userData.created_at).format('DD:mm:yyyy')}{' '}
                    </Text>
                    <Text></Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Text style={[StylesAll.whitecolor,{fontSize:12}]}>Your Points: </Text>
                      <Text
                        style={[
                          StylesAll.whitecolor,
                          StylesAll.boldFont,
                          {fontSize: 18},
                        ]}>
                        {userData.point} Points
                      </Text>
                    </View>
                  </View>

                  <View>
                  <Image  source={require('./Image/order.png')}
                       
                      
                      />
                  </View>
                </View>
              </View>
            </ImageBackground>

            <View style={{marginTop: 20}}>
              <Text
                style={[
                  StylesAll.boldFont,
                  {paddingTop: 20, paddingBottom: 15},
                ]}>
                Voucher
              </Text>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={favourite}
                //ListEmptyComponent={EmptyListMessage}
                keyExtractor={(item) => item.id}
                //keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparatorView}
              />
            </View>

            {/* <FlatList  
           
            showsHorizontalScrollIndicator={false}
            
            data= {favourite}
 
            renderItem={renderItem}/> */}
          </ScrollView>
        </View>
        <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
       
      </SafeAreaView>
      }
    </View>
 
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  navBar: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    height: 30,
  },

  body: {
    flex: 3,
    display: 'flex',
  },

  carsection: {
    backgroundColor: '#EECA39',
    width: 300,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
  },

  carbackground: {
    flex: 1,
  },
});
