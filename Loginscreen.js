import React,{useState,useEffect} from 'react';
import { 
  Dimensions,
  Text,
  StatusBar, 
  View,
  StyleSheet,
  Image,TextInput , ScrollView, ImageBackground, FlatList,TouchableOpacity ,Platform,alert,SafeAreaView,Alert} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import { StylesAll } from "./commanStyle/objectStyle";
import {COLORS} from './Styles/colors';
import ActivityIndi from './ActivityIndi';
import Moment from 'moment';
 
import {
        LoginManager,
        AccessToken,
        GraphRequest,
        GraphRequestManager,
 } from "react-native-fbsdk";

 import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
  
import { Ltout,loginAction,loginPhoneAction,loginSocialAction,loginSocialGoogleAction } from './actions/loginActions'
import { useDispatch,useSelector } from "react-redux";
import { purgeStoredState } from "redux-persist";
import auth from '@react-native-firebase/auth';

import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const phoneSchema = yup.object({
  phoneNumber: yup.string().required('Kindly Enter Phone Number').min(10, 'It must be 10 Characters'),
});




 
const Loginscreen = ({navigation}) => {


   handleResponse=  async ()  =>{
    if(Platform.OS === 'ios'){
      return appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      }).then(appleAuthRequestResponse =>{
  
        let {identityToken,email} = appleAuthRequestResponse;
        console.log('malllll',email);
      });
    } 
  

// try{
//       // performs login request
//   const appleAuthRequestResponse = await appleAuth.performRequest({
//     requestedOperation: appleAuth.Operation.LOGIN,
//     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//   });

//   // get current authentication state for user
//   // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
//   const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

//   // use credentialState response to ensure the user is authenticated
//   if (credentialState === appleAuth.State.AUTHORIZED) {
//     // user is authenticated
//   }
// }catch (error) {
//     console.log('errrrrror',error);
    
//   }
  
  };




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
   


  _signIn = async () => {

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
   
      try {
           dispatch(Ltout(purgeStoredState));
           await dispatch(loginSocialGoogleAction(userInfo.user.id,userInfo.user.name,userInfo.user.email,navigation)).then(() => {
           setIsLoadingList(false);
           
        });  
      }catch{
        console.log('no return');
      }

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
 
  };
 
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '945025541582-g13i18tn7ul98o8nmspk07pptsrkuqie.apps.googleusercontent.com', 
    });
    
  }, []);


 const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };
//227052343413-igpd5mlj0o8d0s0p1f3rl00lrqvuflb5.apps.googleusercontent.com

  //end mathan


  // const [loggedIn, setloggedIn] = useState(false);
  // const [user, setUser] = useState([]);



  // _signIn = async () => {
  //   console.log('sign in');
    
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const {idToken,
  //       accessToken} = await GoogleSignin.signIn();
      
  //       console.log('idTokenidToken',idToken);

  //     setloggedIn(true);

  //     const credential = auth.GoogleAuthProvider.credential(
  //       idToken,
  //       accessToken,
  //     );
  //     const data =  await auth().signInWithCredential(credential);

  //     console.log("datadatadata",data);

  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       alert('Cancel');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       alert('Signin in progress');
  //       // operation (f.e. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       alert('PLAY_SERVICES_NOT_AVAILABLE');
  //       // play services not available or outdated
  //     } else {
  //       console.log(error);
  //       // some other error happened
  //     }
  //   }
  // };

  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   console.log(user);
  //   if (user) setloggedIn(true);
  // }

  // signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     auth()
  //       .signOut()
  //       .then(() => alert('Your are signed out!'));
  //     setloggedIn(false);
  //     // setuserInfo([]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  // useEffect(() => {

  //   console.log('useEffect');
  
  //   GoogleSignin.configure({
  //     scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
  //     webClientId: '227052343413-igpd5mlj0o8d0s0p1f3rl00lrqvuflb5.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  //   //  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //   });
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

//use it

//   useEffect(() => {
//     GoogleSignin.configure({
//       scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//       webClientId: '881874748341-19vtopr4mr4dqdmqg715ph5pikd2cold.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//       offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//       //hostedDomain: '', // specifies a hosted domain restriction
//       //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
//       forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//       accountName: '', // [Android] specifies an account name on the device that should be used
//       iosClientId: '881874748341-19vtopr4mr4dqdmqg715ph5pikd2cold.apps.googleusercontent.com',
      
//        // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//     });
  
  
//   }, [])

 

// // Somewhere in your code
// const signIn = async () => {
//   try {
//      await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();

//     console.log("userInfouserInfo",userInfo);

//     setIsLoadingList(true);

//     try {
//        dispatch(Ltout(purgeStoredState));
//          await dispatch(loginSocialGoogleAction(userInfo.user.photo,userInfo.user.name,userInfo.user.email,navigation)).then(() => {

//            setIsLoadingList(false);
//           // navigation.navigate('Home');
//        });  

//      }catch{
//        console.log('no return');

//      }


     
//     //this.setState({ userInfo });
//   } catch (error) {
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       // user cancelled the login flow
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       // operation (e.g. sign in) is in progress already
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       // play services not available or outdated
//     } else {
//       // some other error happened
//     }
//   }
// };


// getCurrentUserInfo = async () => {
//   try {
//     const userInfo = await GoogleSignin.signInSilently();
//     this.setState({ userInfo });
//   } catch (error) {
//     if (error.code === statusCodes.SIGN_IN_REQUIRED) {
//       // user has not signed in yet
//     } else {
//       // some other error
//     }
//   }
// };

// isSignedIn = async () => {
//   const isSignedIn = await GoogleSignin.isSignedIn();
//   setState({ isLoginScreenPresented: !isSignedIn });
// };


// getCurrentUser = async () => {
//   const currentUser = await GoogleSignin.getCurrentUser();
//   setState({ currentUser });
// };


// signOut = async () => {
//   try {
//     await GoogleSignin.revokeAccess();
//     await GoogleSignin.signOut();
//     setState({ user: null }); // Remember to remove the user from your app's state as well
//   } catch (error) {
//     console.error(error);
//   }
// };


// revokeAccess = async () => {
//   try {
//     await GoogleSignin.revokeAccess();
//     console.log('deleted');
//   } catch (error) {
//     console.error(error);
//   }
// };


const [value, onChangeText] = React.useState('+61');
const [value1, onChangeText1] = React.useState('');


  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);

  const{loginData1} =LoginStatus
  const [isLoadingList, setIsLoadingList] = useState(false);

  const [loginData,setLoginData] = useState({});
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userDob , setUserDob] = useState('');
  const [token, setToken] = useState('');
  const [profilePic, setProfilePic] = useState('');
 
  
  const getResponseInfo =async (error, result,accToken) => {
    if (error) {
      //Alert for the Error
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log('checking mathan');
      console.log('accTokenaccToken',accToken);
      
      //response alert
      console.log('test mathan',JSON.stringify(result));
      setUserEmail('Email',+ result.email);
      setUserName('Welcome ' + result.name);
      setToken('User Token: ' + result.id);
      setProfilePic(result.picture.data.url);


      setIsLoadingList(true);

      try {
         dispatch(Ltout(purgeStoredState));
           await dispatch(loginSocialAction(result.id,result.name,result.email,navigation)).then(() => {

             setIsLoadingList(false);
             signOut();

            // navigation.navigate('Home');
         });  

       }catch{
         console.log('no return');

       }


       
      
      // let abort = new AbortController();
      // var form = new FormData();
      // form.append('fb_id',result.id),
      // form.append('name',result.name),
      // form.append('email',result.email),
      // form.append('dob',""),
 

      // console.log("formformformform",form);

      //      fetch(
      //         'http://tokyo.shiftlogics.com/api/user/loginfb',
      //          {
      //             method: 'POST',
      //             headers: new Headers({
      //             Accept: 'application/json',
      //             'Content-Type': 'multipart/form-data',
      //            }),
      //             body: form,
      //         },
      //         {signal: abort.signal}, 
      //          )
      //         .then((response) => response.json())
      //         .then((data) => {
      //           console.log("data value",data);
      //             if (data.status === 'success')  {
      //                 setIsLoadingList(false);
      //                 setLoginData(data.data)
      //               console.log("data value",data);

      //               if (data.data.phone_verified == "1"){

      //                 console.log("phone verified1");
      //                 navigation.navigate('loginWithPhone');

      //               }else{
      //                 navigation.navigate('Home');
      //                 console.log("phone verified0");
                      

      //               }
      //               /*
      //                 data value 
      //                 {"data": 
      //                 {"email": "mathanbeme@gmail.com", 
      //                 "email_verified": 1, 
      //                 "id": 120, 
      //                 "name": "Mathan Narayanaperumal", 
      //                 "phone": null, 
      //                 "phone_verified": 0, 
      //                 "token": "3gbFsskIKJ8QjWQsP5grwDaQBCf74GXZx1tjdmYzVSLtUtXlzR62zQhMFTHeBDmugtzcrlnkF4FiJ8QK"
      //                  }, 
      //                  "status": 
      //                  "success", 
      //                  "statuscode": "1"}
      //                 */

      //              } else {
      //                setIsLoadingList(false);
      //               console.log("data value",data);
      //              }
      //             })
      //             .catch((e) => {
      //              console.log(e);   
      //             })
      //             return () => {
      //             abort.abort();
      //             };


    }
  };

  const fbLogout = (accessToken) =>{
    let logout = new GraphRequest(
      'me/permissions/',
      {
        accessToken: accessToken,
        httpMethod: 'DELETE',
      },
      (error, result) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
        } else {
          LoginManager.logOut();
          console.log('Logout Successful');
        }
      },
    );
    new GraphRequestManager().addRequest(logout).start();
  }


  const onLogout = () => {
    //Clear the state after logout
    setUserName(null);
    setToken(null);
    setProfilePic(null);
     
  };


   const onPress2 = () => {
      navigation.navigate('CreateAccount');
    }
    const onPress3 = () => {
      loginWithFacebook()
    }

    const onPress4 = () => {

   
    }

    const onPressLoginWithPhone = () => {
       navigation.navigate('loginWithPhone');
    }

    const dimissAction = () => {
       navigation.goBack();
    }
 
    const loginWithFacebook = () => {

      setIsLoadingList(true);

      LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        function(result) {
          if (result.isCancelled) {
            setIsLoadingList(false);
            console.log("==> Login cancelled");
          } else {
            // console.log(
            //   "==> Login success with permissions: " +
            //     result.grantedPermissions.toString()


            // );

  
            AccessToken.getCurrentAccessToken().then((data) => {
              console.log('mathan',data);
              console.log(data.accessToken.toString());
              const processRequest = new GraphRequest(
                '/me?fields=name,email,picture.type(large)',
                null,
                getResponseInfo,
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(processRequest).start();
            });

          }
         },
         function(error) {
          setIsLoadingList(false);
          console.log("==> Login fail with error: " + error);
         }
       );
    }

    return (
              <View style={{flex: 1, flexDirection: 'column' }}>
              <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
              <ImageBackground
                source={require('./Image/Login_bg.png')}
                style={{width: '100%', height: '100%'}}>
              <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
              <View style={StylesAll.field_Box}>
              <Image
                source={require('./Image/tokyo.png')}
                style={{marginBottom: 30}}
                />
            <Text style={StylesAll.main_Title}>LOGIN</Text>
            <Text>You are just one step away from chef-made food</Text>
            <Text></Text>
           

            <Formik
                initialValues={{
                   phoneNumber: '',
                }}
                validationSchema={phoneSchema}
                onSubmit={async (values) => {
               
                  setIsLoadingList(true)

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
         createAlertWithTwoButton(data.msg,'','')
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
          //              <View style={{flex:1}}>
          //              <Text style = {{fontSize : 20,fontWeight : "bold",paddingTop: 10,}}>Enter your number</Text>
          //              <Text style = {{fontSize : 10,paddingTop : 10}}>your're just one step away from chef-made food. </Text>
          //               <View style={{flex:1}}>
          //               <View style={{flexDirection:'row'}}>
          //                <TextInput
          //                defaultValue={'+60'}
          //                style={styles.phoneCode}
          //                placeholderTextColor="#957C1F"
          //                onChangeText={text => onChangeText(text)}
          //               />
          //               <TextInput
          //                 style={styles.phoneCodeText}
          //                 placeholder="Enter the phone Number"
          //                 placeholderTextColor="#957C1F"
          //                 onChangeText={props.handleChange('phoneNumber')}
          //                value={props.values.phoneNumber}
          //               />
          //             </View>
          //             <Text  >
          //               {props.touched.phoneNumber && props.errors.phoneNumber}
          //             </Text>
          //           </View>
          //           <View  style={{flex:1 ,justifyContent:"flex-end"}} >
          // <View>
          //              <TouchableOpacity onPress={props.handleSubmit} >
          //              <View style = {{justifyContent : "center", height : 50,backgroundColor : "#F1D049",alignItems : "center",marginBottom : 20,borderRadius : 6}}>
          // <Text style = {{fontSize : 15,fontWeight : "bold",color : "#fff"}}> NEXT</Text>
          // </View>
          //             </TouchableOpacity> 

          //             </View> 
          //           </View>
          //         </View>

          <View>
          <View style={StylesAll.inputFieldBox}>
            <TextInput
               defaultValue={'+60'}
              style={{flex:0.15}}
              onChangeText={(text) => onChangeText(text)}
              value={value} keyboardType="number-pad"
            />
            <View style={{width:1 ,height:15 ,borderWidth:1,  position:"relative",top:13 ,borderColor:"#cccccc"}}></View>

            <TextInput
              style={StylesAll.inputwrap2}
              //onChangeText={(text) => onChangeText1(text)}
              onChangeText={props.handleChange('phoneNumber')}
              value={props.values.phoneNumber}
              placeholder="Mobile Number"
              keyboardType="number-pad"
            />
          </View>
             <Text style={{color:'red'}}>
               {props.touched.phoneNumber && props.errors.phoneNumber}
            </Text>

          <TouchableOpacity onPress={props.handleSubmit}>
            <View style={StylesAll.commonButton}>
              <Text style={StylesAll.btnText}>SUBMIT</Text>
            </View>
          </TouchableOpacity>

          </View>

                )}
              </Formik>

            <Text></Text>
           
            <Text style={{textAlign: 'center'}}>Continue as guest</Text>

           
              <View style={StylesAll.ltguestWrapper}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems:"center",
                    width: '100%',
                  }}>
                  <Text style={StylesAll.line1}></Text>
                  <Text style={{paddingHorizontal: 20}}>or</Text>
                  <Text style={StylesAll.line1}></Text>
                </View>

                {Platform.OS === 'ios' ? (
                  <TouchableOpacity onPress={() =>{
                    handleResponse();
                  }}>
                  <View style={StylesAll.appleButton}>
                   <Image source={require('./Image/icons8-apple-logo.png')} style={{width:20 ,height:20 ,marginRight:5}} resizeMode="contain"/>
                      <Text style={[StylesAll.btnText, {textAlign: 'center'}]}>
                        Continue with Apple
                      </Text>
                  </View>
                    </TouchableOpacity>
                ) : null}
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 4, 
                    marginTop: 15,
                    justifyContent:'center',
                    alignItems:'center'
                  }}>
                  <TouchableOpacity onPress={onPress3}>
                    <View style={StylesAll.fbButton}>
                    <Image source={require('./Image/icons8-facebook-f.png')} style={{width:20,height:20 ,marginRight:5}} resizeMode="contain"/>
                    <Text style={[StylesAll.btnText,{fontSize:12}]}>Login with Facebook</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={_signIn}> 
                    <View style={StylesAll.googleButton}>
                    <Image source={require('./Image/iconfinder_Google.png')} style={{width:20,height:20 ,marginRight:5}} resizeMode="contain"/>
                    <Text style={[{fontSize:12}]}>Sign in with Google</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Text></Text>
                <TouchableOpacity onPress={onPress2}>
                <Text style={{textAlign:"center"}}>Register with email</Text>
                </TouchableOpacity>
              </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View>{isLoadingList ? <ActivityIndi/>:<View></View> }</View>     
    </View>



//       <SafeAreaView style={{backgroundColor: COLORS.app_theme,flex: 1,}}>
     
//       <View style={{flex:1 ,backgroundColor:'white'}}>
//        <View style = {styles.topHeaderView}>
//        <Text style = {[styles.toptext,StylesAll.LoginBoldFont]}>Tokyo Secret</Text>
//        <Text style = {[styles.toptext1,StylesAll.LoginBoldFont]}>People are queing up for our freshly half-backed  Hanjuku Cheese Tart!</Text>
       
//       <View style = {styles.imageView}>
//       <TouchableOpacity onPress={dimissAction}>
//       <Image style={styles.list}
//         source={require('./Image/close.png')}/> 
//       </TouchableOpacity>
//       </View>
     
//       </View>
//       <View style = {styles.bottomHeaderView}>
//       <View> 
//       <Text styles = {styles.textMala}>MALAYSIA</Text>
//       <Text style = {styles.textLets}>Let's get started </Text>
//       </View>

//       <View style={styles.text}>
//       <TouchableOpacity  onPress={onPressLoginWithPhone}  style={{borderRadius:20}}>
//       <Text style={[{color :'white'},StylesAll.boldFont]}>
//         Login with Phone Number
//      </Text>
//      </TouchableOpacity>
//      </View>

//      <Text style = {styles.textOr}>
//       ---- or ----
//      </Text>

//        <View style = {styles.apple}>
//        <TouchableOpacity>
//        <Text style={[{color :'white'},StylesAll.boldFont]}>
//        Continue with apple
//        </Text>
//        </TouchableOpacity>
//        </View>

//       <View style= {styles.faceGoogleButton}>
//       <TouchableOpacity style = {styles.faceBook} onPress={onPress3}>
//       <Text style={[{color :'white'},StylesAll.boldFont]}>
//       Facebook
//       </Text>
//       </TouchableOpacity>
      
     
//     <TouchableOpacity style = {styles.google} onPress={_signIn}>
//      <Text style={[{color :'black'},StylesAll.boldFont]}>
//      Google
//      </Text>
//      </TouchableOpacity>  
       
// </View>

//      <TouchableOpacity onPress={onPress2}>
//      <Text style = {styles.textClear}>
//       Register with email
//      </Text>
//     </TouchableOpacity >

//     <TouchableOpacity onPress={() =>{
//       navigation.goBack()
//     }}>
//      <Text style = {styles.textClear}>
//     Continue as guest
//     </Text> 
//     </TouchableOpacity>
//       </View>
//       <View>{isLoadingList ? <ActivityIndi/>:<View></View> }</View>     
//       </View>
//       </SafeAreaView>
 
    );
};
 

const styles = StyleSheet.create({
 
  containerAndroid:{
    flex: 1,
  },
  containerIOS:{
    flex: 1,marginTop : 40
  },

  faceGoogleButton:{
      justifyContent:'space-between',
      flexDirection:"row",
      alignItems: "center"
   },
  textOr: {
     paddingTop: 10,
     color : 'black',
    // fontWeight: 'light',
     alignItems: "center",
     textAlign: "center",
     fontSize: 20,
  },
textMala: {
     paddingTop : 5,
     color : 'black',
   // fontWeight: 'light',
},
textLets: {
      paddingTop : 5,
      color : 'black',
      // fontWeight:'bold',
      fontSize: 15,
},
textClear: {
      textAlign: "center",
      alignItems: "center",
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      padding: 10,
      color : "black",
     // fontWeight:'bold',
      fontSize: 13,
},
texttext: {
       width:"43%",
       borderRadius: 6,
       textAlign: "center",
       alignItems: "center",
       marginLeft: 10,
       marginRight: 10,
       marginTop: 10,
       padding: 10,
       backgroundColor: '#EFCB38'
   },

faceBook:{
 
       width:"48%",
       borderRadius: 6,
       textAlign: "center",
       alignItems: "center",
       marginTop: 10,
       padding: 10,
       backgroundColor: 'blue',
      
},

google:{
   borderWidth : 1,
  borderColor : "black",
     width:"48%",
     borderRadius: 6,
     textAlign: "center",
      alignItems: "center",
      
      marginTop: 10,
      padding: 10,
      backgroundColor: 'white',
      
},
   apple:{
      borderRadius :6,
     textAlign: "center",
      alignItems: "center",
      marginTop: 10,
      padding: 10,
      color : "white",
     // fontWeight:'bold',
      fontSize: 13,
      backgroundColor: 'black' 
   },
text: {
     borderRadius: 6,
     textAlign: "center",
      alignItems: "center",
      marginTop: 10,
      padding: 10,
      color : "white",
    //  fontWeight:'bold',
      fontSize: 13,
      backgroundColor: '#EFCB38'
   },
  imageView:{
  position:"absolute",top:0,right:20
  },
    mainView:{
   
     flex: 1,
    backgroundColor: 'white',
     padding:0,
     flexDirection: "column",
     height:windowHeight,
   
  },

  topHeaderView:{
    height : 50,
    flex: 1,
    backgroundColor : "#EFCB38",
    position:"relative",
  
  },

  bottomHeaderView:{
   flex: 1,
   flexDirection:"column",
   marginLeft: 20,
   marginRight: 20,
   marginTop : 20
  },


     list:{
    width:40,
    height:40,
    marginLeft : 10,
    marginTop : 10,
    
  },
 

  toptext:{
    color:'white',
    paddingLeft:10,
      marginTop : 10,
  },
   search:{
    marginLeft:10,
    marginTop : 20,
    justifyContent : "flex-start",
   

  },

  toptext1:{
    color:'white',
    paddingLeft:10,
    paddingRight : 10,
    paddingTop : 50
  },

  
});
export default Loginscreen;