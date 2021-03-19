import React , { useRef,useState,useEffect } from 'react';
import {  Dimensions,Text,Constants, View, StyleSheet,Alert, Image, ScrollView, ImageBackground, FlatList,TouchableOpacity ,TextInput,StatusBar,SafeAreaView} from 'react-native';
import Moment from 'moment';
import {StylesAll} from './commanStyle/objectStyle'
import {Formik} from 'formik';
import * as yup from 'yup';
import ActivityIndi from './ActivityIndi';
 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Ltout,loginAction,loginPhoneAction} from './actions/loginActions'
import { useDispatch,useSelector } from "react-redux";
import { purgeStoredState } from "redux-persist";
import { COLORS } from './Styles/colors';

const phoneSchema = yup.object({
  phoneNumber: yup.string().required('Kindly Enter Phone Number').min(10, 'It must be 10 Characters'),
});

const loginWithPhone = ({navigation }) => {

  const dispatch = useDispatch();
  const [loginData , setLoginData] = useState(); 
  const [value, onChangeText] = React.useState('+60');
  let code= value.slice(1);

  const [phoneNumber,setPhoneNumber] = useState('');
  const [phoneCode,setPhoneCode] = useState('');
  const [isLoadingList,setIsLoadingList] = useState(false);
 
  const createAlertWithTwoButton = ( itemValue,phoneNumber ,login) =>  

  Alert.alert(
    itemValue,
    '',
    [
      {
        text: 'cancel',

        style: 'cancel',
      },
      {text: 'ok', onPress: () => {
        if (itemValue == "Otp send successfully!"){
          navigation.navigate('ResentOtp',{phoneNumberData : phoneNumber,loginData : login,isCreate : false});
        }else{
          navigation.goBack()
        }
      }},
       ],
       {cancelable: false},
      );
   

    return (
      <View
      style={{flex: 1, flexDirection: 'column', backgroundColor: '#fafbfb'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <View style={{marginBottom: 10, marginHorizontal: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={[
                StylesAll.commonHeader,
                {paddingHorizontal: 0, paddingTop: 0},
              ]}>
              <Image source={require('./Image/back.png')} />
            </View>
          </TouchableOpacity>
        </View>


          <Formik
                initialValues={{
                   phoneNumber: '',
                }}
                validationSchema={phoneSchema}
                onSubmit={async (values) => {
               
                  setIsLoadingList  (true)

                  console.log('mathan log');


                //   dispatch(Ltout(purgeStoredState));
                //   await dispatch(loginAction(values,code)).then(() => {
                //   setIsLoadingList(false);
                //   navigation.navigate('ResentOtp');
                // });

                let abort = new AbortController();
                var form = new FormData();
                  form.append('phone',value.slice(1) + values.phoneNumber)
                     fetch(
                        'http://tokyo.shiftlogics.com/api/user/loginphone',
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

             setLoginData(data.data)

      if (data.status === 'success') {
        console.log('Test mathan success',data.data.api_token );
        setIsLoadingList(false)
       
        createAlertWithTwoButton(data.msg,  value.slice(1)  + values.phoneNumber,data.data)
       } else {
         setIsLoadingList(false);
         console.log('Test mathan');
         createAlertWithTwoButton(data.msg, value.slice(1)   + values.phoneNumber)
      }
    })
    .catch((e) => {
      console.log(e);
      createAlertWithTwoButton(e)
    })
  return () => {
    abort.abort();
  };

                }}>
                {(props) => (
                  <View style={{flex:1,padding:30}}>

                      <Text style = {{fontSize : 20,fontWeight : "bold"}}>Enter your number</Text>
                       <Text style = {{fontSize : 10,paddingTop : 10}}>your're just one step away from chef-made food. </Text>
 
                        <Text></Text>

                        <View style={{flex:1,padding:5}}>

                        <View style={StylesAll.inputFieldBox}>
            <TextInput
               defaultValue={'+60'}
              style={{flex:0.15}}
              onChangeText={(text) => onChangeText(text)}
              value={value} keyboardType="number-pad"
            />
            <View style={{width:1 ,height:15 ,borderWidth:1,position:"relative",top:13 ,borderColor:"#000"}}></View>

            <TextInput
              style={StylesAll.inputwrap2}
              //onChangeText={(text) => onChangeText1(text)}
              onChangeText={props.handleChange('phoneNumber')}
              value={props.values.phoneNumber}
              placeholder="Mobile Number*"
              keyboardType="number-pad"
            />
          </View>

                  
                      <Text style={{color:'red'}} >
                        {props.touched.phoneNumber && props.errors.phoneNumber}
                      </Text>
                       
                    </View>

                   

                    <View  style={{flex:1 ,justifyContent:"flex-end"}} >
 

          <View>
                       <TouchableOpacity onPress={props.handleSubmit} >
                       <View style = {{justifyContent : "center", height : 50,backgroundColor :COLORS.app_browntheme,alignItems : "center",marginBottom : 20,borderRadius : 50}}>
          <Text style = {{fontSize : 15,fontWeight : "bold",color : "#fff"}}> NEXT</Text>
          </View>
                      </TouchableOpacity> 

                      </View> 
                    </View>
                  </View>
                )}
              </Formik>
 

<View>{isLoadingList ? <ActivityIndi/>:<View></View> }</View> 
</SafeAreaView>    
       </View>
    );
};
 

const styles = StyleSheet.create({

  searchbar:{
  flexDirection:'row',  
  },
 

 phoneCode: {
  width : 50,
  paddingTop : 10,
  paddingBottom : 10,
  marginRight : 10,
  borderBottomWidth : 1,
  borderBottomColor :  "gray",
  color: 'black'
 },

mainViewCreateAccount: { 
flex: 1,
flexDirection : "column",
marginLeft : 10,
marginRight : 10,

},

bottomView: {
flex: 1,
marginLeft : 10,
marginRight : 10,
justifyContent : "flex-end", 
},
 

   phoneCodeText: {
    paddingTop : 10,
    paddingBottom : 10,
    width : "100%",
    borderBottomWidth : 1,
    borderBottomColor :  "gray",
    paddingLeft : 10
   }
   

});
export default loginWithPhone;


