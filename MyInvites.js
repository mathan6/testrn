import React,{useEffect,useState} from 'react'
import  {View,Text,Button,Image,TouchableOpacity,StyleSheet,Share,Dimensions,Linking,StatusBar,SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
 import {StylesAll} from './commanStyle/objectStyle';
 import {COLORS} from './Styles/colors';
 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Ltout,loginAction,loginPhoneAction} from './actions/loginActions'
import { useDispatch,useSelector } from "react-redux";
import { purgeStoredState } from "redux-persist";
 

const MyInvites = ({navigation}) => {
 

  const [userData,setUserData] = useState({});
  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);
  const{token} = LoginStatus
  const{loginData} = LoginStatus

  useEffect(() => {

    console.log('MyInvites',MyInvites)

    if (loginData != null){
   
    let abort = new AbortController();
    var form = new FormData();
    form.append('transactionid',loginData.token);
    fetch(
      'http://tokyo.shiftlogics.com/api/user/referrallist',
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
           
        } else {
           
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };

  }
     
  }, [])
 
  useEffect(() => {

    if (loginData != null){

      console.log('tokentokentokentoken',token);

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
         // body: form,
      },
      {signal: abort.signal},
    )
      .then((response) => response.json())
      .then((data) => {

        console.log('datadatadatadatadatadata222222',data.data.referral_code);

        if (data.status === 'success') {
          setUserData(data.data);
        } else {
          
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };

  }else{
    console.log('no token')
  }
     
  }, [])

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              `Get free vouchers off for Tokyo Secret!. Signup and use my code ${userData.referral_code} and get discount on your orders. Download Tokyo Secret at http://onelink.to/vwzfbt`,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    return(
      
            <View style={StylesAll.flexScreen}>
            <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
            <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <View style={{marginBottom: 20,paddingHorizontal:20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={[
                StylesAll.commonHeader,
                {paddingHorizontal: 0, paddingTop: 0},
              ]}>
              <Image source={require('./Image/back.png')} />
              <Text
                style={[StylesAll.main_Title, {marginBottom: 0, fontSize: 20}]}>
               INVITE
              </Text>
            </View>
          </TouchableOpacity>
        </View>

            
            <View style={{flexDirection: 'column',alignItems: 'center'}}>
        
             <Image source={require('./Image/girls.jpeg')} 
              style= {{maxWidth: '100%',height: windowHeight/3}} resizeMode= 'cover'
             >
             </Image>
            <View style={{marginLeft:20,marginRight:20,paddingHorizontal:15,borderRadius: 30,justifyContent: 'space-between',flexDirection: 'row',borderColor:COLORS.app_browntheme,borderWidth:2}}>

            <TextInput style={{width :'75%',height:45,color:COLORS.app_browntheme}}>{userData.referral_code}</TextInput>

            <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} onPress={() =>{
               onShare()      
            }}> 
            <Text style={[{color: COLORS.app_browntheme,paddingLeft: 20,paddingRight: 10},StylesAll.boldFont]}>SHARE</Text>
            </TouchableOpacity>

            </View>
            <View>

            </View>
            <View style={{flexDirection : 'row',justifyContent: 'center',alignItems: 'center',alignContent: 'center',paddingTop:20,paddingBottom:20}}>
            
            <TouchableOpacity onPress={() =>{
              Linking.openURL(`whatsapp://send?text=Get free vouchers off for Tokyo Secret!. Signup and use my code ${userData.referral_code} and get discount on your orders. Download Tokyo Secret at http://onelink.to/vwzfbt`)
            }}>
            <View style={{width: 50, height : 50,margin : 10,borderRadius: 5,justifyContent: 'center',alignItems: 'center'}}>
            <Image source ={require('./Image/share_wasp.png')} resizeMode= 'contain' style={{width: 40,height: 40}}>
            </Image>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>{
                onShare()      
            }}>
            <View style={{width: 50, height : 50,margin : 10,borderRadius: 5,justifyContent: 'center',alignItems: 'center'}}>
            <Image source ={require('./Image/share_instagram.png')} resizeMode= 'contain' style={{width: 40,height: 40}}>
            </Image>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>{
                onShare()      
            }}>
            <View style={{width: 50, height : 50,margin : 10,borderRadius: 5,justifyContent: 'center',alignItems: 'center'}}>
            <Image source ={require('./Image/share_fb.png')} resizeMode= 'contain' style={{width: 40,height: 40}}>
            </Image>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>{
                onShare()      
            }}>

            <View style={{width: 50, height : 50,margin : 10,borderRadius: 5,justifyContent: 'center',alignItems: 'center'}}>
            <Image source ={require('./Image/share_messanger.png')} resizeMode= 'contain' style={{width: 40,height: 40}}>
            </Image>
            </View>
            </TouchableOpacity>
            
            </View>
            </View>

            <View style={{backgroundColor: COLORS.profile_list_bg,flex:1,flexDirection: 'column',padding:20}}>
             <Text style={[{color: 'black',margin: 10,paddingBottom:10},StylesAll.boldFont]}>My invites</Text>
             <TouchableOpacity   onPress={()=>{
                 navigation.navigate('ContactsData',{code: userData.referral_code});
             }}>
             <View style={{flexDirection: 'row',width:'60%',justifyContent:'center',alignItems:'center',backgroundColor:COLORS.app_browntheme,borderRadius:30,paddingVertical:10}}>
            
             <Image source ={require('./Image/conList.png')} resizeMode= 'contain' style={{width: 25,height: 25,marginRight: 10}}>
             </Image>
             <Text style={{color: 'white'}}>Invite contact</Text>
           
            </View>
            </TouchableOpacity>

            </View>
            </SafeAreaView>
        </View>
);
}
export default MyInvites;



