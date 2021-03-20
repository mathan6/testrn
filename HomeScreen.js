import React, { useState, useEffect } from 'react';
import {Text,View,FlatList,StyleSheet,ImageBackground, Image,TouchableOpacity,Platform,Alert} from 'react-native';
import {COLORS} from './Styles/colors';
import VoucherRewardItem from "./VoucherRewardItem";
import { StylesAll } from "./commanStyle/objectStyle";


import { Ltout,loginAction,loginPhoneAction } from './actions/loginActions'
import { useDispatch,useSelector } from "react-redux";
import { purgeStoredState } from "redux-persist";
 



const HomeScreen = ( {navigation} ) => {
   
  const LoginStatus = useSelector((state) => state.loginDetails);
  const{loginData} = LoginStatus
  const[favourite , setFavourite] = useState([]);


  const loginAlertWithTwoButton = () => {
    Alert.alert(
      'Alert',
      'Please Login to Reservation',
      [{
        text: "Cancel",
        onPress: () => {

        },
         style: "cancel",
      },
       {
         text: "OK",
         onPress: () => {
          //navigation.navigate('Detail');
       },
      
       }]

    );
  };

 
  useEffect(() => {
 
    const unsubscribe = navigation.addListener('focus', () => {
   
    if (loginData !== null){
      let abort = new AbortController();
      var form = new FormData();
       form.append('api_token',loginData.token);

       

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

     

          if (data.status === 'success') {
            setFavourite(data.data);
          } else {
            
          }
        })
        .catch((e) => console.log(e));
  
      return () => {
        abort.abort();
      };

    }else{
     // loginAlertWithTwoButton();
    }

    });
    return () => {
      unsubscribe;
    };


    }, [ ]);

   
    

    const renderItem = ({item}) => {
      return (
        <TouchableOpacity onPress={() =>{
          navigation.navigate('RewardDetails',{dataValue : item, isVoucher : false});
        }}>
        <View style={StylesAll.rewardLists}>
          <View style={{height: 200}}>
            <Image
              source={{uri: `http://shiftlogics.com/Tokyo/${item.photo}`}}
              style={[
                StylesAll.imageStyle,
                {borderTopLeftRadius: 10, borderTopRightRadius: 10,backgroundColor:COLORS.app_brownlightheme},
              ]}
              resizeMode="cover"
            />
          </View>
  
          <View style={{flexDirection: 'row', padding: 15, alignItems: 'center'}}>
            <View style={{flexDirection: 'column', flex: 1, paddingRight: 10}}>
              <Text style={[StylesAll.md_Title,{marginBottom:10}]} numberOfLines={1} >
                {item.title}
              </Text>
             
              <Text numberOfLines={1}>Download our app and get this exclusive voucher!</Text>
            </View>
            <View>
              
                <View style={StylesAll.sm_Button}>
                  <Text style={StylesAll.btnText}>Use now</Text>
                </View>
            
            </View>
          </View>
        </View>
        </TouchableOpacity>
      );
    };






    const EmptyListMessage = ({item}) => {

      if (loginData === null) {
        return (
          <TouchableOpacity onPress={()=>navigation.navigate('Detail')}>


          <View style={[StylesAll.alertMsg,{flex:1}]}>
            <Image
              resizeMode="cover"
              style={{width: 40, height: 40}}
              source={require('./Image/opps.png')}
            />
             <Text style={[{marginVertical: 10}, StylesAll.boldFont]}>
            Oops, login is required!
          </Text>
          <Text>You need to login to access  this feature</Text>
   



          </View>
          </TouchableOpacity>
      
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

    
    return (

      
         <View style={{backgroundColor:COLORS.app_bgtheme,flex:1}}>
           
            <FlatList  
            contentContainerStyle={{padding:30}}
   
            showsVerticalScrollIndicator={false}

            data= {favourite}
 
            renderItem={renderItem}
            
            ListEmptyComponent={EmptyListMessage}
            
            />
            
        </View>
          );
        }
        export default HomeScreen;