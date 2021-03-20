import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  Touchable,
  TouchableOpacity,
  Alert,
  ScrollView, Modal
} from 'react-native';
import { useDispatch,useSelector } from "react-redux";
import {StylesAll} from './commanStyle/objectStyle';

import moment from 'moment';


export default function VoucherDetail({navigation,route}) {

  const[modalVisible ,setmodalVisible]=useState(false)

  const LoginStatus = useSelector((state) => state.loginDetails);

  const{loginData} = LoginStatus


  const addFavourite = (id) => {

    var form = new FormData();

    form.append(
      'api_token', loginData.token,);

      form.append('voucherID', id);



    fetch('http://tokyo.shiftlogics.com/api/favourite/addFavourite', {
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
          
         setmodalVisible(true)

          console.log(data)


        } else if (data.status === 'failure') {
         
          Alert.alert(
          data.Msg,
            "",
            [
           
              { text: "OK", onPress: () =>  navigation.goBack() }
            ]
          );



        }
      })

      .catch((e) => console.log(e));
  };


const proceedNextpage =()=>{
setmodalVisible(false)

navigation.navigate('Rewards')


}
  

  return (
    <View style={[StylesAll.flexWtrapper,{backgroundColor:"#fafbfb"}]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
       
       <View style={[     StylesAll.headWrapper,{   paddingBottom:20}]}>

      <TouchableOpacity onPress={()=>navigation.goBack()}>
      <View style={StylesAll.commonHeader}>
<Image source={require('./Image/back.png')} style={StylesAll.headArrow} resizeMode="contain"/>
<Text style={[StylesAll.headTitle]}>VOUCHER</Text>
</View>
</TouchableOpacity>



</View>


      <View style={{width: '100%', height: 250}}>
          <Image
           source={{uri: `http://shiftlogics.com/Tokyo/${route.params?.dataValue.photo}`}}
            style={StylesAll.imageStyle}
          />
        </View>


        <View style={StylesAll.innerWrapper}>
          <View style={[StylesAll.flexWtrapper, {}]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={StylesAll.md_Title}>{route.params?.dataValue.title}</Text>

              <View style={{flexDirection: 'row', alignItems: 'center' ,paddingTop:15 }}>
                <Image
                  source={require('./Image/calendar.png')}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />

                <Text style={StylesAll.commom_color}>
                {' '}
                  Valid from {moment(route.params?.dataValue.start_date).format('DMMM')} till {moment(route.params?.dataValue.end_date).format('DMMM YY')} 
                </Text>
              </View>
 

              <Text style={[StylesAll.commom_color,{paddingVertical:25}]}>Get {route.params?.dataValue.title} for free when you download our app!</Text>
               


              <Text style={StylesAll.commom_color}>

               {route.params?.dataValue.description.replace(/<\/?[^>]+(>|$)/g, "")}
                 
              </Text>
            </ScrollView>
          </View>

          <View
            style={[
              StylesAll.flexWtrapper,
              {justifyContent: 'flex-end', flex: 0.2},
            ]}>
  
           
            <TouchableOpacity onPress={() =>{
               
              addFavourite(route.params?.dataValue.id)
               
            }} >
             
              <View style={StylesAll.commonButton}>
                <Text style={StylesAll.btnText}>REDEEM</Text>
              </View>

            </TouchableOpacity>
             
          
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
            <View style={[StylesAll.common_Modal, {justifyContent: 'center'}]}>
              <View style={StylesAll.modalBox}>

              <View style={{position:"absolute" ,top:-130 ,  right:0,left:20 }}> 

    <Image source ={require('./Image/congrat.png')} style={{width:270 ,height:190}}
    resizeMode="cover"/>


              </View>

<View style={{marginTop:40}}>
<Text style={[StylesAll.commom_color, StylesAll.mediumfont]}>
                  Redeem Successful! You may view your voucher at "Rewards"
                  section.
                </Text>

</View>
              
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems:'center',
                    alignContent:'center',
                    marginTop: 30,
                  }}>
                  <TouchableOpacity  onPress={()=>setmodalVisible(false)} style={{flex:1}}>
                    <View style={[StylesAll.cancelBtn, StylesAll.mediumBtn1]}>
                      <Text
                        style={[
                          StylesAll.whitecolor,
                          StylesAll.boldFont,
                          {textAlign: 'center', fontSize: 15,padding:8},
                        ]}>
                        CLOSE
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>proceedNextpage()} style={{flex:1}}>
                    <View style={[StylesAll.viewBtn, StylesAll.mediumBtn1]}>
                      <Text
                        style={[
                          StylesAll.whitecolor,
                          StylesAll.boldFont,
                          {textAlign: 'center', fontSize: 15,padding:8},
                        ]}>
                        VIEW NOW
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </Modal>





    </View>
  );
}