
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ActivityIndi from './ActivityIndi';
import {Formik} from 'formik';
import * as yup from 'yup';
import {StylesAll} from './commanStyle/objectStyle';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FeedBackData = yup.object({
  email: yup
    .string()
    .required('Kindly enter your email id')
    .email('Please enter valid email'),
  subject: yup.string().required('Kindly enter your Subject'),
  description: yup.string().required('Kindly enter your description'),
});

const feedBack = ({navigation}) => {
  const [isLoadingList, setIsLoadingList] = useState(Boolean);

  const createAlertWithTwoButton = (itemValue) =>
    Alert.alert(
      itemValue,
      ' ',
      [
        {
          text: 'cancel',
          style: 'cancel',
        },
        {text: 'ok', onPress: () => navigation.goBack()},
      ],
      {cancelable: false},
    );

  return (
    <View style={StylesAll.flexScreen}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>

      <SafeAreaView style={StylesAll.flexScreen}>
        <Formik
          initialValues={{
            email: '',
            subject: '',
            description: '',
          }}
          validationSchema={FeedBackData}
          onSubmit={async (values) => {
            setIsLoadingList(true);
            let abort = new AbortController();
            var form = new FormData();
            form.append('title', values.subject);
            form.append('email', values.email);
            form.append('description', values.description);
            fetch(
              'http://tokyo.shiftlogics.com/api/user/feedback',
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
                  console.log('datadatadata', data);
                  createAlertWithTwoButton(data.data);
                  setIsLoadingList(false);
                } else {
                  setIsLoadingList(false);
                }
              })
              .catch((e) => console.log(e));
            return () => {
              abort.abort();
            };
          }}>
          {(props) => (
            <View style={StylesAll.innerWrapper}>
                <Image source={require('./Image/tokyo.png')} />
                <View style={[StylesAll.flexWtrapper, {paddingTop: 30}]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[StylesAll.main_Title, {}]}>
                  Your feedback matters
                </Text>
                <Text>How was your experience with us ?</Text>
                <Text></Text>
               
                <TextInput style={StylesAll.inputBox} 
                      onChangeText = {props.handleChange('email')}
                      placeholder="Email"
                     values =  {props.values.email}
                />

                <Text style={{color:'red',paddingVertical : 5}}>{props.touched.email && props.errors.email} </Text> 
                
                <TextInput style={StylesAll.inputBox}
                      onChangeText = {props.handleChange('subject')}
                      placeholder="Subject" 
                       values =  {props.values.subject}
                />

              <Text style={{color:'red',paddingVertical : 5}}>{props.touched.subject && props.errors.subject} </Text>
               
                <TextInput
                  style={[
                    {
                      borderWidth: 1,
                      borderColor: '#cccccc',
                      borderRadius: 11,
                      paddingHorizontal: 15,
                      paddingVertical: 50,
                    },
                  ]}
                  multiline={true}
                  placeholder="Describe you feedback"
                  onChangeText = {props.handleChange('description')}
                  values =  {props.values.description}
                />
                <Text style={{color:'red',paddingVertical : 5}}>{props.touched.description && props.errors.description} </Text>

                </ScrollView>
              </View>

                 
              <View style={{flex: 0.2, justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={props.handleSubmit}>
                  <View style={StylesAll.commonButton}>
                    <Text style={StylesAll.btnText}>SUBMIT</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            
          )}
        </Formik>
      </SafeAreaView>
      <View>{isLoadingList ? <ActivityIndi/>:<View></View> }</View>
    </View>

    //     <View style={{flex:1 ,backgroundColor:"#fff" ,padding: 0 ,paddingTop: 0,}}>
    //       <ScrollView
    // >

    // <View>
    // <ImageBackground source = {require('./Image/feedback.png')}
    // style={{width:"100%" ,marginTop : 20}} resizeMode="cover"
    //  >

    //     <Formik
    //    initialValues={{
    //     email: '',
    //     subject : '',
    //     description : '',
    //    }}
    //     validationSchema={FeedBackData}
    //     onSubmit={async (values) => {
    //       setIsLoadingList(true)
    //     let abort = new AbortController();
    //     var form = new FormData();
    //     form.append('title',values.subject);
    //     form.append('email',values.email);
    //     form.append('description',values.description);
    //    fetch(
    //      'http://tokyo.shiftlogics.com/api/user/feedback',
    //      {
    //            method: 'POST',
    //            headers: new Headers({
    //            Accept: 'application/json',
    //            'Content-Type': 'multipart/form-data',
    //        }),
    //        body: form,
    //      },
    //      {signal: abort.signal},
    //     )
    //      .then((response) => response.json())

    //      .then((data) => {
    //        if (data.status === 'success') {
    //           console.log("datadatadata",data);
    //           createAlertWithTwoButton(data.data)
    //           setIsLoadingList(false)
    //        } else {
    //           setIsLoadingList(false)
    //        }
    //      })
    //      .catch((e) => console.log(e));
    //    return () => {
    //      abort.abort();
    //    };
    //   }}>

    // {(props) => (

    // <View style={{flex :1 ,backgroundColor:"#fff",      padding:10,marginTop : 100,marginLeft: 20,marginRight: 20,borderRadius : 10,shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.50,
    // shadowRadius:4.84,}}>

    // {/* <TextInput style={styles.phoneCodeText}
    //     placeholder="Enter the Phonenumaber"
    //     onChangeText= {props.handleChange('phoneNumber')}
    //     values = {props.values.phoneNumber}></TextInput>
    //     </View>

    //     <Text style={{color:'red'}}>{props.touched.phoneNumber && props.errors.phoneNumber}</Text>
    //    */}

    // <Text style={styles.welcome}>Send us your feedback</Text>
    // <View style={styles.searchbar}>
    //  <Image style={styles.group}
    //       source={require('./Image/email-symbol.png')}/>
    //       <TextInput placeholder="Email" style={styles.textInput}
    //        onChangeText = {props.handleChange('email')}
    //        values =  {props.values.email}
    //       ></TextInput>

    // </View>
    // <Text style={{color:'red'}}>{props.touched.email && props.errors.email} </Text>
    // <View style={styles.searchbar}>
    // <Image style={styles.group}
    //             source={require('./Image/subject-symbol.png')}/>
    //       <TextInput placeholder="Subject" style={styles.textInput}
    //       onChangeText = {props.handleChange('subject')}
    //       values =  {props.values.subject}
    //       ></TextInput>

    // </View>
    // <Text style={{color:'red'}}>{props.touched.subject && props.errors.subject} </Text>
    // <Text style = {{fontSize : 12, margin:5,}}>Describe your feedback</Text>

    // <TextInput placeholder="" style={styles.textInput1} multiline={true}
    //  onChangeText = {props.handleChange('description')}
    //  values =  {props.values.description}
    // ></TextInput>
    // <Text style={{color:'red'}}>{props.touched.description && props.errors.description} </Text>
    // <TouchableOpacity onPress={props.handleSubmit}>

    // <View style = {styles.submit}>
    // <Text style = {{color : '#fff'}}>
    //      SUBMIT
    // </Text>
    // </View>

    // </TouchableOpacity>
    // </View>

    // )}
    // </Formik>

    // </ImageBackground>
    // </View>
    // <View>{isLoadingList ? <ActivityIndi/>:<View></View> }</View>
    // </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,

    margin: 5,
  },

  group: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginTop: 10,
  },
  submit: {
    padding: 10,
    margin: 5,
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#C7451F',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    color: 'red',
  },
  textInput: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    margin: 5,
  },
  textInput1: {
    padding: 10,
    margin: 5,
    backgroundColor: 'lightgray',
  },
});

export default feedBack;
