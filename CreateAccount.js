import React, {useState, useEffect} from 'react';
import {Text,Dimensions, View, StyleSheet, Image, ScrollView, ImageBackground, FlatList,TouchableOpacity,TextInput, Constants,Alert,StatusBar,SafeAreaView} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import { onChange, Value } from 'react-native-reanimated';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { date } from 'yup/lib/locale';
import Moment from 'moment';
import ActivityIndi from './ActivityIndi';
import { StylesAll } from "./commanStyle/objectStyle";
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from './Styles/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const CreateAccountData = yup.object({
  name : yup.string().required('Kindly enter your name'),
  email : yup.string().required('Kindly enter your email id').email("Please enter valid email"),
  password : yup.string().required('Kindly enter your password').min(8,'It must be 8 Characters'),
  phoneNumber : yup.string().required('Kindly enter your phoneNumber').min(10,'It must be 10 charactor'),
})
 
const CreateAccount = ({navigation}) => {

  const [dt, setDt] = useState(new Date().toLocaleString());

  const [isLoadingList, setIsLoadingList] = useState(false);

  const [value, onChangeText] = React.useState('+60');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedDate,setSelectedDate] = useState('Date of Birth*');


useEffect(() => {
  let secTimer = setInterval( () => {
    setDt(new Date().toLocaleString())
  },1000)
  return () => clearInterval(secTimer);
}, []);



  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
 
  const handleConfirm = (date) => {
     setSelectedDate('1234');
     hideDatePicker();
  };



const createAlertWithTwoButton = ( itemValue, phoneNumber, dataValue ) =>  

  Alert.alert(
    itemValue,
    '',
    [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {text: 'ok', onPress: () => 
         (itemValue == "success") ?   navigation.navigate('ResentOtp',{phoneNumberData : phoneNumber,loginData : dataValue,isCreate : true}) :  navigation.goBack() 
     },
    ],
    {cancelable: false},
  );

  //const [value, onChangeText] = React.useState('+61');
  const [value1, onChangeText1] = React.useState('');

  return (

     <View
      style={{flex: 1, flexDirection: 'column', backgroundColor: "#fafbfb"}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>

      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      
        <Formik
         initialValues={{
           name : '',
           email : '',
           password : '',
           phoneCode : '',
           phoneNumber :'',
         }}
           validationSchema={CreateAccountData}
           onSubmit={async (values) => {
            setIsLoadingList(true)
           let abort = new AbortController();
                var form = new FormData();
                form.append('name', values.name)
                form.append('email',values.email)
                form.append('phone',values.phoneCode + values.phoneNumber)
                form.append('password',values.password)
                form.append('app_secret','tokenhere')
                form.append('dob',selectedDate)
              
               fetch(
                  'http://tokyo.shiftlogics.com/api/user/register',
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
 
  setIsLoadingList(false)
if (data.status === 'success') {
 
    createAlertWithTwoButton( data.status , (value.slice(1)  + values.phoneNumber) , data.data)
 } else {
 
  createAlertWithTwoButton(data.data.email[0], '','')
}
})
.catch((e) => {
 
 createAlertWithTwoButton(e)
})
return () => {
abort.abort();
};
}}>
 {(props) => (

      <View style={[StylesAll.flexWtrapper, {flexDirection: 'column'}]}>
        <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{paddingHorizontal:30}}>
      <Image
        source={require('./Image/tokyo.png')}
        style={{marginBottom: 40}}
      />
      <View style={{flex:1}}> 
      <Text style={StylesAll.main_Title}>Create Account</Text>
      <Text>You are just one step away from chef-made food</Text>
      <Text></Text>
      <Text></Text> 
    <TextInput style={StylesAll.inputBox}
      placeholder="Your Name*"
      onChangeText={props.handleChange('name')}
      value={props.values.name}>
      </TextInput>

     <Text  style={{color:'red'}}>{props.touched.name && props.errors.name}</Text>
 
    <TextInput style={StylesAll.inputBox}
    placeholder="Email*"
    onChangeText={props.handleChange('email')}
    value={props.values.email}>
    </TextInput>
    <Text  style={{color:'red'}}>{props.touched.email && props.errors.email}</Text>
 
 
    <TextInput style={StylesAll.inputBox}
    placeholder="Enter the Password"
    onChangeText={props.handleChange('password')}
    secureTextEntry
    value={props.values.password}></TextInput>
    <Text  style={{color:'red'}}>{props.touched.password && props.errors.password}</Text>
 
      <View style={StylesAll.inputFieldBox}>
            <TextInput
               defaultValue={'+60'}
              style={{flex:0.15}}
              onChangeText={(text) => onChangeText(text)}
              value={value} keyboardType="number-pad"
            />
            <View style={{width:1 ,height:15 ,borderWidth:1,position:"relative",top:13 ,borderColor:"#cccccc"}}></View>

            <TextInput
              style={StylesAll.inputwrap2}
              //onChangeText={(text) => onChangeText1(text)}
              onChangeText={props.handleChange('phoneNumber')}
              value={props.values.phoneNumber}
              placeholder="Mobile Number*"
              keyboardType="number-pad"
            />
          </View>
    <Text style={{color:'red'}}>{props.touched.phoneNumber && props.errors.phoneNumber}</Text>
     
    <TouchableOpacity onPress=
    {showDatePicker}> 
  
   
            <TouchableOpacity onPress={showDatePicker}>
            <View style={[StylesAll.inputFieldBox,{alignItems:'center'}]}>
              <Text style={{padding:5}}>{selectedDate} </Text>

               
            </View>
          </TouchableOpacity>
 
    <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={ (date) => {
           
          setSelectedDate(Moment(date).format('yyy-MM-DD'));
          hideDatePicker();
        }}
   
        onCancel={hideDatePicker}
      />

      </TouchableOpacity>
   </View>
   
 
  </ScrollView>

  <View style={{justifyContent:'center',alignItems:'center',alignContent:'center' ,paddingHorizontal:30,paddingBottom:5,height:70}}>

       <TouchableOpacity onPress={props.handleSubmit}>
         <View style={{width:windowWidth - 40,height:50,backgroundColor:COLORS.app_browntheme,justifyContent:'center',alignItems:'center',borderRadius:20}}>
             <Text style={StylesAll.btnText}>SUBMIT</Text>
           </View>
          </TouchableOpacity>

 
  </View>

  </View>
    )}
  </Formik>
  <View>{isLoadingList ? <ActivityIndi/>:<View></View> }</View>     
  
  </SafeAreaView>
  </View> 
    );
};
 
export default CreateAccount;