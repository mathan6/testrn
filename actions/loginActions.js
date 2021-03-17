import {LOGIN_FAIL, LOGIN_REQ, LOGIN_RESPONSE, LOG_OUT,LOGIN_PHONE,LOGIN_SOCIAL,LOGIN_SOCIAL_GOOGLE,LOGIN_SOCIAL_APPLE} from './Constants';
import {
  Alert} from "react-native";
export const loginAction = (values, code, load) => async (dispatch) => {
 
   //let myValue =  values.slice(1) 

  // console.log("myValue",myValue);
   
  try {
    var form = new FormData();
    form.append('phone',code+values.phoneNumber)
    
    await fetch("http://tokyo.shiftlogics.com/api/user/loginphone", {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        dispatch({type: LOGIN_RESPONSE, payload: data});
      });
  } catch (error) {
      dispatch({type: LOGIN_FAIL});
  }
};

export const loginSocialAction = (idValue,name,email,navigation) => async(dispatch,myData) => {
  let abort = new AbortController();
  var form = new FormData();
  form.append('fb_id',idValue),
  form.append('name',name),
  form.append('email',email),
  form.append('dob',""),
 
   fetch(
          'http://tokyo.shiftlogics.com/api/user/loginfb',
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
 
            dispatch({type: LOGIN_SOCIAL_APPLE, payload: data});
  
            Alert.alert(
              data.status,
              "",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => {
                  if (data.status === 'success')  {
                  if (data.data.phone_verified == "1"){
                    navigation.navigate('loginWithPhone');
                  }else{
                    navigation.navigate('Home');
                    console.log("phone verified0");
                  }
                }
                } }
              ],
              { cancelable: false }
            );


              })
              .catch((e) => {
               console.log(e);   
              })
              return () => {
              abort.abort();
              };
}

//    NSString *req = [NSString stringWithFormat:@"google_id=%@&email=%@&name=%@&dob=",userId,email,fullName];

//http://tokyo.shiftlogics.com/api/user/loginapple

 



export const loginSocialAppleAction = (idValue,name,email,navigation) => async(dispatch) => {

  console.log("funcation");
  let abort = new AbortController();
  var form = new FormData();
  form.append('apple_id',idValue),
  form.append('name',email),
  form.append('email',name),
  form.append('dob',""),


  console.log("formformformform",form);

       fetch(
          'http://tokyo.shiftlogics.com/api/user/loginapple',
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
            dispatch({type: LOGIN_SOCIAL_GOOGLE, payload: data});

                 console.log("data value",data);

            
                Alert.alert(
                  data.status,
                  "",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => {
                      if (data.status === 'success')  {
                      if (data.data.phone_verified == "1"){
                        navigation.navigate('loginWithPhone');
                      }else{
                        navigation.navigate('Home');
                        console.log("phone verified0");
                      }
                    }
                    } }
                  ],
                  { cancelable: false }
                );
                

              })
              .catch((e) => {
               console.log(e);   
              })
              return () => {
              abort.abort();
            };
}


export const loginSocialGoogleAction = (idValue,name,email,navigation) => async(dispatch) => {

  console.log("funcation");
  let abort = new AbortController();
  var form = new FormData();
  form.append('google_id',idValue),
  form.append('email',email),
  form.append('name',name),
  form.append('dob',""),


  console.log("formformformform",form);

       fetch(
          'http://tokyo.shiftlogics.com/api/user/logingoogle',
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
            dispatch({type: LOGIN_SOCIAL_GOOGLE, payload: data});

                 console.log("data value",data);

              if (data.status === 'success')  {
                if (data.data.phone_verified == "1"){
                  navigation.navigate('loginWithPhone');
                }else{
                  navigation.navigate('Post');
                  console.log("phone verified0");
                }
               } else {
                 console.log("data value",data);
               }
              })
              .catch((e) => {
               console.log(e);   
              })
              return () => {
              abort.abort();
            };
}


 
export const loginPhoneAction = (apiToken, otpData, phone ) => async (dispatch) => {
 console.log('apiToken',apiToken);
 console.log('otpData',otpData);
 console.log('apiToken',apiToken);
 try {
   var form = new FormData();
   form.append('api_token',apiToken),
        form.append('otp', otpData),
        form.append('phone', phone),
   
   await fetch("http://tokyo.shiftlogics.com/api/user/loginotpverified", {
     method: 'POST',
     headers: new Headers({
       Accept: 'application/json',
       'Content-Type': 'multipart/form-data',
     }),
     body: form,
   })
     .then((response) => response.json())
     .then((data) => {
       console.log('datadatadata',data);
       dispatch({type: LOGIN_PHONE, payload: data});
     
       Alert.alert(
        data.status,
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => {
            
          } }
        ],
        { cancelable: false }
      );

     });
 } catch (error) {
     dispatch({type: LOGIN_FAIL});
 }
};


export const Ltout = () => async (dispatch) => {
  try {
    dispatch({type: LOG_OUT});
  } catch (error) {
    console.log(error);
  }
};