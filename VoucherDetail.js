import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Modal,Alert
} from 'react-native';
import {StylesAll} from './commanStyle/objectStyle';
import ActivityIndi from './ActivityIndi';
import QRCode from 'react-native-qrcode-image';
import moment from 'moment';
import { ProgressBar, Colors } from 'react-native-paper';
import { Ltout,loginAction,loginPhoneAction} from './actions/loginActions'
import { useDispatch,useSelector } from "react-redux";
import { purgeStoredState } from "redux-persist";
import { COLORS } from './Styles/colors';
 
 const Voucherdetail = ({navigation,route}) => {

  const [ minutesTimer, setMinutesTimer ] = useState();
  const [secondsTimer, setSecondsTimer ] =  useState();
  const [countTimer,setcountTimer] = useState(0);



  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);
  const{loginData} = LoginStatus


  const [isLoadingList, setIsLoadingList] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);


  const [modalVisible1,setModalVisible1] = useState(false);

  const [isVisible, setisVisible] = useState(false);

  const [minutes, setMinutes] = useState('');

  const [seconds, setSeconds] = useState('');

  const [milliseconds, setMilliseconds] = useState('');

  const [modalVisible2,setModalVisible2] = useState(false);

  
    const reddemme = (id) =>{

      setIsLoadingList(true)

      console.log('id id id  ',id);


      var form = new FormData();

      form.append('api_token',loginData.token);
      form.append('voucherID', id);

      fetch("http://tokyo.shiftlogics.com/api/favourite/addFavourite", {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        body: form,
      })
        .then((response) => response.json())
        .then((data) => {
           console.log('mathan,,,,,,',data)
          if (data.status === 'success') {
            setModalVisible(true);
            console.log('successs');

            //loginAlertWithTwoButton(data.Msg)
            setIsLoadingList(false);
            // Alert.alert(
            //   data.Msg,
            //   "",
            //   [
            //     {
            //       text: "Cancel",
            //       onPress: () => console.log("Cancel Pressed"),
            //       style: "cancel"
            //     },
            //     { text: "OK", onPress: () => navigation.navigate('Rewards') }
            //   ],
            //   { cancelable: false }
            // );
  
          }
          else if (data.status === 'failure') {
            console.log('failurefailurefyfyfyf');
           
            setModalVisible(true);
            loginAlertWithTwoButton(data.Msg);
 
            setIsLoadingList(false);
          }
  
        })

        .catch((e) => console.log(e));
  }

  const Activitya = () => {

    console.log('id id id id',route.params?.dataValue.id);

    var form = new FormData();
    form.append(
      'api_token',loginData.token,
    );
    form.append('voucherID',route.params?.dataValue.id);


    console.log('form',form);

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
         console.log('dddddd',data)
        if (data.status === 'success') {

          console.log('mathan iiiiiii',data);

          setisVisible(true);

          setModalVisible2(true);

          ///setreddemData(data);

          console.log('data.data.max_time',data.data.max_time);

          console.log('data.DateTime',data.DateTime);



          var maxTime = moment(data.data.max_time);

          let setMaxtime = new Date(maxTime);

          let getMaxtime = setMaxtime.getTime();

          var minTime = moment(data.DateTime);

          let setMintime = new Date(minTime);

          let getMintime = setMintime.getTime();

          let diffTime = getMaxtime - getMintime;

          

          console.log('diffTimediffTime',diffTime);

          setMilliseconds(diffTime)

          console.log('milllll',milliseconds)
 
          let mins = Math.floor(diffTime / 60000);

          setMinutes(mins);

          setMinutesTimer(mins);

          let secs = ((diffTime % 60000) / 1000).toFixed(0);

          setSeconds(secs);

          setSecondsTimer(secs);


        } else if (data.status === 'failure') {

          setisVisible(false);

          //console.log(data.status);

          //setreddemData({});
        }
      })

      .catch((e) => console.log(e));
  };
 

  const setreddem = () => {
 
    var form = new FormData();
    form.append(
      'api_token',loginData.token,
    );
    form.append('voucherID',route.params?.dataValue.id);

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
         console.log('mathan data',data);

        if (data.status === 'success') {
        
          setisVisible(true);
          setModalVisible1(false);
          setModalVisible2(true);

          Activitya();

        } else if (data.status === 'failure') {
           
        }
      })

      .catch((e) => console.log(e));
  };

//   useEffect(() => {

//     const interval = setInterval(() => {
//     if(secondsTimer > 0){
//       setSecondsTimer(secondsTimer => secondsTimer - 1);
//       }
//       if(secondsTimer === 0){
//         setMinutesTimer(minutesTimer=>minutesTimer-1)
//         setSecondsTimer(secondsTimer=>secondsTimer+ 59)
//       }
//       if(minutesTimer===5){
//         setMinutesTimer(minutesTimer => minutesTimer -1);
//     setSecondsTimer(59);
// }
// else if(minutesTimer===0 & secondsTimer===0){

//  navigation.navigate('Rewards')

// }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [secondsTimer,minutesTimer]);
    
 

  useEffect(()=>{


    let myInterval = setInterval(() => {
        console.log('mathan');
            if (secondsTimer > 0) {
                setcountTimer(countTimer + 1)
                setSecondsTimer(secondsTimer - 1);

                console.log('secondsecondsecondsecondsecondmathan',myInterval)
            }
            if (secondsTimer === 0) {
                if (minutesTimer === 0) {
                    clearInterval(myInterval)
                    navigation.navigate('Rewards')
                } else {
                    setMinutesTimer(minutesTimer - 1);
                    setSecondsTimer(59);
                }
            } 

        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    }, [secondsTimer,minutesTimer]);


  useEffect(() => {

    console.log('route.params?.dataValueroute.params?.dataValue',route.params?.dataValue);

    if (route.params?.isVoucher == false){
    Activitya();
    navigation.setOptions({ title: 'REWARDS' })
     
  }else{
    navigation.setOptions({ title: 'VOUCHER'})
  }

    return () => {
  
    };
  }, []);


  const nextPage=() =>{
    navigation.navigate('Rewards');
    setModalVisible(false);
  }

  return (
    <View style={StylesAll.flexScreen}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={StylesAll.flexScreen}>

      

        <View style={{width: '100%', height: 250}}>
          <Image
           source={{uri: `http://shiftlogics.com/Tokyo/${route.params?.dataValue.photo}`}}
            style={StylesAll.imageStyle}
          />
        </View>

        <View style={StylesAll.innerWrapper}>
          <View style={[StylesAll.flexWtrapper, {}]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={StylesAll.main_Title}>{route.params?.dataValue.title}</Text>

              <View style={{flexDirection: 'row', alignItems: 'center',paddingVertical:10}}>
                <Image
                  source={require('./Image/calendar.png')}
                  style={{width: 25, height: 20}}
                  resizeMode="contain"
                />

                <Text style={StylesAll.commom_color}>
                  {' '}
                  Valid from {moment(route.params?.dataValue.created_at).format('MMMM Do YYYY')} till {moment(route.params?.dataValue.end_date).format('MMMM Do YYYY')} 
                </Text>
              </View>
 

              <Text style={StylesAll.commom_color}>Get {route.params?.dataValue.title} for free when you download our app!</Text>
                <Text></Text>


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
  
            {isVisible ? null : (
            <TouchableOpacity onPress={() =>{
               if (route.params?.isVoucher == true){
              reddemme(route.params?.dataValue.id)
               }else{
                setModalVisible1(true);
               }
            }} >
             
              <View style={StylesAll.commonButton}>
                <Text style={StylesAll.btnText}>REDEEM</Text>
              </View>
            </TouchableOpacity>
             )}
          
          </View>
        </View>
    
 
        <Modal animationType="none" transparent={true} visible={modalVisible}>
      <View style={[StylesAll.common_Modal, {justifyContent: 'center'}]}>
      <View style={StylesAll.modalBox}>
      <View >
           <Image    source={require('./Image/congrat.png')}   resizeMode="contain"   style={{width: "100%", height: 120 ,position:"absolute" ,top:-100}} />

           </View>

      <Text style={[StylesAll.commom_color, StylesAll.mediumfont]}>
        Redeem Successful! You may view your Voucher at "Rewards"
        section.
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <TouchableOpacity onPress={() =>{
          setModalVisible(false);
        }}>
          <View style={[StylesAll.cancelBtn, StylesAll.mediumBtn]}>
            <Text
              style={[
               StylesAll.whitecolor,
                StylesAll.boldFont,
                {textAlign: 'center'},
              ]}>
              CLOSE
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> nextPage()}>
          <View style={[StylesAll.viewBtn, StylesAll.mediumBtn]}>
            <Text
              style={[
               StylesAll.whitecolor,
                StylesAll.boldFont,
                {textAlign: 'center'},
              ]}>
              VIEW NOW
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>  

<Modal animationType="none" transparent={true} visible={modalVisible1}>
          <SafeAreaView style={StylesAll.flexWtrapper}>
            <View style={[StylesAll.common_Modal, {justifyContent: 'flex-end'}]}>
              <View style={[StylesAll.modalBox]}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Image source={require('./Image/icons8-clock.png')} />
                </View>
                <Text></Text>

                <Text style={[StylesAll.main_Title, {textAlign: 'center'}]}>
                  Redeem in 5 minutes
                </Text>

                <TouchableOpacity onPress={() => setreddem()}>
                  <View style={StylesAll.commonButton}>
                    <Text style={StylesAll.btnText}>ACTIVATE</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible1(false)}>
                  <View style={StylesAll.ltcancelbtn}>
                    <Text style={StylesAll.btnText}>NOT NOW</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Modal>

        <Modal animationType="none" transparent={true} visible={modalVisible2}>
          <SafeAreaView style={StylesAll.flexWtrapper}>
            <TouchableOpacity
              style={[StylesAll.common_Modal, {padding: 0}]}
              onPress={() => setModalVisible2(false)}>
              <View
                style={[
                  StylesAll.flexWtrapper,
                  {justifyContent: 'center', alignItems: 'center', padding: 10},
                ]}>
                <View style={StylesAll.redeemQrbox}>
                <QRCode
          value={ (loginData != null) ? loginData.token : "No Token Please Login"}
          size={200}
          bgColor='#FFFFFF'
          fgColor='#000000'
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

              <View style={[{flex: 0.4, justifyContent: 'flex-end'}]}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    padding: 20,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}>

                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:10}}>
                      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                      <Image style={{width: 20 ,height: 20}} 
                       source={require('./Image/icons8-clock.png')}
                       />

                      <Text style={[{paddingLeft: 10},StylesAll.boldFont]}>Redeem in</Text>
                      </View>
                      { minutesTimer === 0 && secondsTimer === 0
                        ? <Text>00:00</Text>
                      : <Text> {minutesTimer}:{secondsTimer < 10 ?  `0${secondsTimer}` : secondsTimer}</Text> 
                      }
                      </View>
               

                    <View style={{backgroundColor: 'lightgray',height: 7,width:'100%',borderRadius:5,overflow:'hidden'}}>
                    <Text style={{backgroundColor: COLORS.app_browntheme,height: 7,width: countTimer,borderRadius:5}}>  
                   
                    </Text>
                     </View>
                   
                </View>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>

      <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>

    </View>
  );
}
export default Voucherdetail;

