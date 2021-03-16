import React, {useState, useEffect} from 'react';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import {Formik} from 'formik';
import * as yup from 'yup';
import ActivityIndi from './ActivityIndi';
import CheckBox from '@react-native-community/checkbox';
import {COLORS} from './Styles/colors';
import {StylesAll} from './commanStyle/objectStyle';
import {Ltout, loginAction, loginPhoneAction} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';
import FlatListItemSeparator from './FlateListSeparatro';

import {
  StatusBar,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  CheckBoxProps,
  Touchable,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';

import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native'

  
const ReservationSchema = yup.object({
  reserName: yup.string().required('kindly enter name field'),
  reserPhone: yup.string().required('kindly enter phone number field').min(10, 'It must be 10 Characters'),
  reserDescription: yup.string().required('kindly  enter Reservation Notes'),
  agreeToReservation: yup.bool().required('Kindly Select Agress'),
});

const Reservation = ({navigation}) => {

  const isFocused = useIsFocused()

  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  
  const LoginStatus = useSelector((state) => state.loginDetails);

  const {loginData} = LoginStatus;

  const ReservationAgree = () => {
    Alert.alert('Alert', 'Please Select agree to the reservation terms', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };

  const loginAlertWithTwoButton = () => {
    Alert.alert('Alert', 'Please Login to Reservation', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Detail');
        },
      },
    ]);
  };

  const createAlertWithTwoButton = (itemValue) =>
    Alert.alert('Cancel Reservation', 'Are you sure you want to cancel?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('cancel pressed'), setSelectedFlateList(false);
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('ok'), removeReservationAPI(itemValue);
        },
      },
    ]);

  const [viewReservation, setViewReservation] = useState([]);
  var today = new Date();

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(true);

  const [selectedDate, setSelectedDate] = useState('Date');
  const [selectedTime, setSelectedTime] = useState('Time');

  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(1);

  const [outlet, setOutlet] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const [modelVisible, setModalVisible] = useState(false);
  const [modelVisible1, setModalVisible1] = useState(false);
  const [case1, setCase1] = useState(true);
  const [case2, setCase2] = useState(false);
  const [case3, setCase3] = useState(false);
  const [case4, setCase4] = useState(false);

  const [currentSelectedOutLet, setCurrentSelectedOutlet] = useState({});

  const [currentId, setCurrentId] = useState('');

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [ouletView, setOutletView] = useState(false);
  const [selectedFlateList, setSelectedFlateList] = useState(null);

  const [currentMyReservation, setCurrentMyReservation] = useState(null);

  const renderMyReservationItem = ({item}) => (
    <TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '120', height: '100%'}}></View>
        <View style={{flex: 1, backgroundColor: 'red'}}></View>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (loginData != null) {
      setIsLoadingList(true);
      let abort = new AbortController();
      var form = new FormData();
      form.append('api_token', loginData.token);
      fetch(
        'http://tokyo.shiftlogics.com/api/reservation/viewReservation',
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
            console.log('data.datadata.datadata.data', data.data);

            setViewReservation(data.data);
            let abort = new AbortController();
            fetch(
              'http://tokyo.shiftlogics.com/api/outlet/viewOutlet',
              {
                method: 'POST',
                headers: new Headers({
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                }),
              },
              {signal: abort.signal},
            )
              .then((response) => response.json())

              .then((data) => {
                if (data.status === 'success') {
                  setOutlet(data.data);
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
        })
        .catch((e) => console.log(e));
      return () => {
        abort.abort();
      };
    } else {
      console.log('please log');
      setIsLoadingList(false);
      setViewReservation([]);
      // loginAlertWithTwoButton();
    }
  }, [isFocused]);

  const removeReservationAPI = (itemValue) => {
    let abort = new AbortController();
    var form = new FormData();
    form.append('id', itemValue);

    fetch(
      'http://tokyo.shiftlogics.com/api/reservation/cancelReservation',
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
          viewReservationAPI();
          setSelectedFlateList(false);
        } else {
          setSelectedFlateList(false);
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };
  };

  const viewReservationAPI = () => {
    let abort = new AbortController();
    var form = new FormData();
    form.append('api_token', loginData.token);
    fetch(
      'http://tokyo.shiftlogics.com/api/reservation/viewReservation',
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
          setViewReservation(data.data);
        } else {
          setIsLoadingList(false);
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };
  };

  const onChange = (event, selectedDate) => {
    console.log('current Date Mathan', Moment(selectedDate).format('hh:mm:ss'));
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios' ? true : false);
    setDate(currentDate);
    setSelectedTime(Moment(selectedDate).format('hh:mm:ss'));
  };

  const myDateFuncation = (date) => {
    console.log('mathan test');
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const increment = () => {
    setAdult((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (adult == 1) {
    } else {
      setAdult((prevCount) => prevCount - 1);
    }
  };

  const incrementChildren = () => {
    console.log('test....increment');
    setChildren((prevCount) => prevCount + 1);
  };

  const decrementChildren = () => {
    if (children == 1) {
      console.log('test....');
    } else {
      setChildren((prevCount) => prevCount - 1);
      console.log('test');
    }
  };

  const step0 = () => {
    setSelectedDate('Date');
    setSelectedTime('Time');
    setAdult(1);
    setChildren(1);
    setCase1(true);
    setCase2(false);
    setCase3(false);
    setCase4(false);
  };

  const step1 = () => {
    if (selectedDate == 'Date') {
      setSelectedDate(
        today.getFullYear() +
          '-' +
          parseInt(today.getMonth() + 1) +
          '-' +
          today.getDate(),
      );
    }

    setCase1(false);
    setCase2(true);
    setShow(true);
  };

  const step2 = () => {
    if (selectedTime == 'Time') {
      setSelectedTime(Moment(today.getDay()).format('hh:mm:ss'));
    } else {
    }
    setCase3(true);
    setCase2(false);
  };

  const step3 = () => {
    setCase4(true);
    setCase3(false);
    setCase2(false);
  };

  const openModel1 = () => {
    setModalVisible(true);
    setModalVisible1(false);
  };

  const openModel2 = (id) => {
    setCurrentId(id);
    console.log('id value currentId', currentId);
    console.log('id value', id);

    setModalVisible(false);
    setModalVisible1(true);
  };

  const closeModel1Model2 = () => {
    setModalVisible(false);
    setModalVisible1(false);
  };

  const ListHeader = () => {
    return (
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={StylesAll.boldFont2}>Select Outlet</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View
            style={{
              width: 50,
              height: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Image
              resizeMode="contain"
              style={{width: '100%', height: '100%', tintColor: 'black'}}
              source={require('./Image/close.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // const FlatListItemSeparator = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 1,
  //         marginLeft: 10,
  //         marginRight: 10,
  //         backgroundColor: 'lightgray',
  //       }}
  //     />
  //   );
  // };

  const EmptyListMessage = ({item}) => {
    if (loginData === null) {
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
    } else {
      return (
        <View style={StylesAll.alertMsg}>
          <Image
            style={{width: 40, height: 40}}
            source={require('./Image/opps.png')}
            resizeMode="cover"
          />
          <Text style={[{marginTop: 5}, StylesAll.boldFont]}>
            No new Reservation at this time!
          </Text>
        </View>
      );
    }
  };

  return (

    <View style={{flex: 1, flexDirection: 'column',padding: 20,backgroundColor:'#fafbfb'}}>
    <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1}}>
        <Text style={[{textAlign:'center',textAlign:'center',padding:10},StylesAll.boldFont2]}>MY RESERVATION</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={viewReservation}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={EmptyListMessage}
          style={{flex: 1}}
          renderItem={({item}) => (
            <View style={{padding: 10, flex: 1, position: 'relative'}}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedFlateList(item.id);
                  console.log('id value', item.id);
                  setOutletView(true);
                  setCurrentMyReservation(item);
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                  }}>
                  <View style={{flex: 1}}>
                    <Image
                      source={{
                        uri: `http://shiftlogics.com/Tokyo/${item.out_image}`,
                      }}
                      resizeMode="cover"
                      style={{
                        height: '100%',
                        width: '100%',
                        borderBottomLeftRadius: 20,
                        borderTopLeftRadius: 20,
                        backgroundColor: 'gray',
                      }}
                    />
                  </View>

                  <View style={{flexDirection: 'column', margin: 10, flex: 2}}>
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: 'Roboto-Bold',
                          fontSize: 15,
                        }}>
                        {item.outlet_name}@
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: 'Roboto-Bold',
                          fontSize: 15,
                        }}
                        numberOfLines={1}>
                        {item.address}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={require('./Image/calNew.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: COLORS.app_browntheme,
                          }}
                          resizeMode="cover"
                        />
                        <Text
                          style={[{marginLeft: 3}, StylesAll.lightmediamFont]}
                          numberOfLines={1}>
                          {item.date}
                        </Text>
                      </View>

                      <View
                        style={{
                          marginLeft: 3,
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('./Image/timeNew.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: COLORS.app_browntheme,
                          }}
                          resizeMode="cover"
                        />
                        <Text
                          style={[
                            {color: 'black', marginLeft: 2},
                            StylesAll.lightmediamFont,
                          ]}
                          numberOfLines={1}>
                          {item.time}
                        </Text>
                      </View>

                      <View
                        style={{
                          marginLeft: 3,
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('./Image/userNew.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: COLORS.app_browntheme,
                          }}
                          resizeMode="cover"
                        />
                        <Text
                          style={[
                            {color: 'black', marginLeft: 2},
                            StylesAll.lightmediamFont,
                          ]}>
                          {item.pax1}-{item.pax2}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                      }}>
                      <View
                        style={{flex: 1, height: 1, backgroundColor: 'lightgray'}}
                      />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1.5, flexDirection: 'column'}}>
                        <Text
                          style={[{color: 'gray'}, StylesAll.boldFontLight]}>
                          Submitted
                        </Text>
                        <Text
                          style={[{color: 'black'}, StylesAll.boldFontLight]}>
                          {Moment(item.created_at).format('yyy-MM-DD, hh:mm a')}
                        </Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text
                          style={[{color: 'gray'}, StylesAll.boldFontLight]}>
                          Status
                        </Text>

                        {item.status == '1' ? (
                          <Text
                            style={[
                              {color: COLORS.appBrown},
                              StylesAll.boldFontLight,
                            ]}>
                            Pending
                          </Text>
                        ) : item.status == '2' ? (
                          <Text
                            style={[
                              {color: COLORS.app_browntheme},
                              StylesAll.boldFontLight,
                            ]}>
                            Accepted
                          </Text>
                        ) : item.status == '3' ? (
                          <Text
                            style={[
                              {color: COLORS.appBrown},
                              StylesAll.boldFontLight,
                            ]}>
                            Cancelled
                          </Text>
                        ) : (
                          <Text
                            style={[
                              {color: COLORS.appBrown},
                              StylesAll.boldFontLight,
                            ]}>
                            Completed
                          </Text>
                        )}
                      </View>
                    </View>

                    <View
                      style={{flex: 1, flexDirection: 'column', marginTop: 5}}>
                      <Text style={[{color: 'gray'}, StylesAll.boldFontLight]}>
                        Remarks
                      </Text>
                      <Text style={[{color: 'black'}, StylesAll.boldFontLight]}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              {selectedFlateList === item.id ? (
                <View
                  style={{
                    position: 'absolute',
                    flex: 1,
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    borderRadius: 20,
                    margin: 10,
                    backgroundColor: '#00000070',
                    color: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      width: 30,
                      height: 30,
                    }}
                    onPress={() => {
                      setSelectedFlateList(false);
                    }}>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: 40,
                        height: 40,
                      }}
                      onPress={() => {
                        setSelectedFlateList(false);
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: '100%', height: '100%'}}
                        source={require('./Image/close.png')}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'column', margin: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('item.iditem.iditem.id', item.id);
                        createAlertWithTwoButton(item.id);
                      }}>
                      <View
                        style={{
                          backgroundColor: COLORS.app_redtheme,
                          padding: 10,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 30,
                          marginBottom: 10,
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{width: 25, height: 25}}
                          source={require('./Image/iicon.png')}
                        />
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: 10,
                            fontFamily: 'Roboto-Bold',
                            fontSize: 15,
                          }}>
                          Cancel Reservation
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        console.log(
                          'currentMyReservationcurrentMyReservation',
                          currentMyReservation,
                        );

                        navigation.navigate('ReservationOutlet', {
                          dataValue: currentMyReservation,
                        });
                      }}>
                      <View
                        style={{
                          backgroundColor: COLORS.appBrown,
                          padding: 10,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 30,
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{width: 25, height: 25, tintColor: 'white'}}
                          source={require('./Image/opps.png')}
                        />
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: 10,
                            fontFamily: 'Roboto-Bold',
                            fontSize: 15,
                          }}>
                          View More
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
          )}
        />

        <Modal
          animationType="none"
          transparent={true}
          visible={modelVisible1}
          onRequestClose={() => {
            Alert.alert('Model has been closed');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'gray',
              paddingHorizontal: 25,
              paddingTop: 100,
              paddingVertical: 40,
            }}>
            <ScrollView>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  paddingHorizontal: 0,
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    openModel1();
                  }}
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{
                        width: '100%',
                        height: '100%',
                        tintColor: 'black',
                      }}
                      source={require('./Image/close.png')}
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal:10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1.2}}>
                    <Image
                      source={{
                        uri: `http://shiftlogics.com/Tokyo/${currentSelectedOutLet.out_image}`,
                      }}
                      resizeMode="cover"
                      style={{height: 120, width: '100%'}}></Image>
                  </View>

                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'column',
                      marginLeft: 15,
                      marginRight: 10,
                      marginBottom: 20,
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      alignContent: 'center',
                    }}>
                    <Text style={StylesAll.boldFont}>
                      {currentSelectedOutLet.outlet_name}
                    </Text>
                    <Text style={[StylesAll.boldFontLight]}>
                      {currentSelectedOutLet.email}
                    </Text>
                    <Text
                      style={[
                        {color: 'gray', paddingTop: 10},
                        StylesAll.boldFontLight,
                      ]}>
                      {currentSelectedOutLet.address}
                    </Text>
                  </View>
                </View>

                <View style={{backgroundColor: COLORS.app_browntheme}}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      margin: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: COLORS.app_browntheme,
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('./Image/callWNew.png')}
                        style={{height: 15, width: 15}}
                        resizeMode="cover"
                      />

                      <Text
                        style={[
                          {color: 'white', marginLeft: 2},
                          StylesAll.boldFont,
                        ]}>
                        {selectedDate}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: COLORS.app_browntheme,
                        marginLeft: 2,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('./Image/timeWNew.png')}
                        style={{height: 15, width: 15}}
                        resizeMode="cover"
                      />
                      <Text
                        style={[
                          {color: 'white', marginLeft: 2},
                          StylesAll.boldFont,
                        ]}>
                        {selectedTime}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: COLORS.app_browntheme,
                        marginLeft: 2,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('./Image/userWNew.png')}
                        style={{height: 15, width: 15}}
                        resizeMode="cover"
                      />
                      <Text
                        style={[
                          {color: 'white', marginLeft: 2},
                          StylesAll.boldFont,
                        ]}>
                        {adult}-{children}
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  {case1 ? (
                    <View style={{flexDirection: 'column'}}>
                      <View style={{backgroundColor: 'white', flex: 1}}>
                        <Text
                          style={[
                            {padding: 10, color: 'black'},
                            StylesAll.boldFont,
                          ]}>
                          Select Visit Date
                        </Text>
                        <Calendar
                          // Initially visible month. Default = Date()
                          //current={'2021-01-01'}
                          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                          minDate={'2012-05-10'}
                          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                          maxDate={'2030-05-30'}
                          // Handler which gets executed on day press. Default = undefined
                          onDayPress={(day) => {
                            console.log('selected day', day.dateString);
                            setSelectedDate(day.dateString);
                          }}
                          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                          monthFormat={'yyyy MM'}
                          // Handler which gets executed when visible month changes in calendar. Default = undefined
                          onMonthChange={(month) => {
                            console.log('month changed', month);
                          }}
                          // Hide month navigation arrows. Default = false
                          hideArrows={false}
                          // Do not show days of other months in month page. Default = false
                          hideExtraDays={true}
                          // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                          // day from another month that is visible in calendar page. Default = false
                          disableMonthChange={true}
                          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                          firstDay={1}
                        />
                      </View>

                      <TouchableOpacity onPress={() => step1()}>
                        <View
                          style={{
                            padding: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.app_browntheme,
                            borderRadius: 50,
                            marginTop: 40,
                            margin: 10,
                          }}>
                          <Text style={[StylesAll.boldFont, {color: 'white'}]}>
                            NEXT
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      {case2 ? (
                        <View>
                          <View style={{backgroundColor: 'white'}}>
                            {show && (
                              <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                              />
                            )}
                          </View>

                          <TouchableOpacity onPress={() => step2()}>
                            <View
                              style={{
                                backgroundColor: COLORS.white,
                                padding: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.app_browntheme,
                                borderRadius: 50,
                                marginTop: 40,
                                margin: 10,
                              }}>
                              <Text
                                style={[StylesAll.boldFont, {color: 'white'}]}>
                                NEXT
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View>
                          {case3 ? (
                            <View style={{flexDirection: 'column'}}>
                              <View style={{backgroundColor: 'white'}}>
                                <View
                                  style={{
                                    flexDirection: 'column',
                                    backgroundColor: 'White',
                                    marginLeft: 10,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 40,
                                    marginBottom: 40,
                                  }}>
                                  <Text style={{color: 'black', padding: 20}}>
                                    Pax (Adult)
                                  </Text>
                                  <View
                                    style={{
                                      backgroundColor: 'white',
                                      marginLeft: 5,
                                      marginRight: 5,
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <TouchableOpacity onPress={decrement}>
                                      <View
                                        style={{
                                          backgroundColor:
                                            COLORS.app_browntheme,
                                          borderRadius: 40 / 2,
                                          width: 40,
                                          height: 40,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        <Text style={{color: 'white'}}>-</Text>
                                      </View>
                                    </TouchableOpacity>

                                    <Text
                                      style={{
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                      }}>
                                      {adult}
                                    </Text>

                                    <TouchableOpacity onPress={increment}>
                                      <View
                                        style={{
                                          flex: 1,
                                          backgroundColor:
                                            COLORS.app_browntheme,
                                          borderRadius: 40 / 2,
                                          width: 40,
                                          height: 40,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        <Text style={{color: 'white'}}>+</Text>
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                  <Text style={{color: 'black', padding: 20}}>
                                    Pax (Children)
                                  </Text>
                                  <View
                                    style={{
                                      backgroundColor: 'white',
                                      marginLeft: 5,
                                      marginRight: 5,
                                      marginBottom: 5,
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <TouchableOpacity
                                      onPress={decrementChildren}>
                                      <View
                                        style={{
                                          flex: 1,
                                          backgroundColor:
                                            COLORS.app_browntheme,
                                          borderRadius: 40 / 2,
                                          width: 40,
                                          height: 40,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        <Text style={{color: 'white'}}>-</Text>
                                      </View>
                                    </TouchableOpacity>

                                    <Text
                                      style={{
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                      }}>
                                      {children}
                                    </Text>

                                    <TouchableOpacity
                                      onPress={incrementChildren}>
                                      <View
                                        style={{
                                          backgroundColor:
                                            COLORS.app_browntheme,
                                          borderRadius: 40 / 2,
                                          width: 40,
                                          height: 40,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        <Text style={{color: 'white'}}>+</Text>
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                              <TouchableOpacity onPress={() => step3()}>
                                <View
                                  style={{
                                    backgroundColor: COLORS.app_browntheme,
                                    padding: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 50,
                                    marginTop: 40,
                                    margin: 10,
                                  }}>
                                  <Text
                                    style={[
                                      StylesAll.boldFont,
                                      {color: 'white'},
                                    ]}>
                                    NEXT
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <View>
                              <Formik
                                initialValues={{
                                  reserName: '',
                                  reserPhone: '',
                                  reserDescription: '',
                                  agreeToReservation: false,
                                }}
                                validationSchema={ReservationSchema}
                                onSubmit={async (Value) => {
                                  setIsLoading(true);


                                  console.log(Value.reserName);

                                  if (toggleCheckBox1 == true) {
                                    let abort = new AbortController();
                                    var form = new FormData();
                                    form.append('api_token', loginData.token);
                                    form.append('outID', currentId);
                                    form.append('date', selectedDate);
                                    form.append('time', selectedTime);
                                    form.append('pax1', adult);
                                    form.append('pax2', children);
                                    form.append('name', Value.reserName);
                                    form.append('phone', Value.reserPhone);
                                    form.append(
                                      'description',
                                      Value.reserDescription,
                                    );
                                    form.append(
                                      'out_area',
                                      toggleCheckBox == true ? 'yes' : 'no',
                                    );

                                    console.log('add formformformform', form);

                                    fetch(
                                      'http://tokyo.shiftlogics.com/api/reservation/addReservation',
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
                                          setIsLoading(false);

                                          closeModel1Model2();

                                          viewReservationAPI();
                                          console.log(
                                            'successsuccesssuccesssuccess',
                                            data.data,
                                          );
                                        } else {
                                          setIsLoading(false);
                                          console.log(
                                            'failedfailedfailed',
                                            data,
                                          );
                                        }
                                      })
                                      .catch((e) => console.log(e));

                                    return () => {
                                      abort.abort();
                                    };
                                  } else {
                                    setIsLoading(false);
                                    ReservationAgree();
                                  }

                                  console.log('mathan testing');
                                }}>
                                {(props) => (
                                  <View style={{flexDirection: 'column'}}>
                                    <ScrollView>
                                      <View
                                        style={{
                                          backgroundColor: 'white',
                                          padding: 10,
                                          flexDirection: 'column',
                                        }}>
                                        <TextInput
                                          style={{
                                            backgroundColor: COLORS.textbox_bg,
                                            borderWidth: 1,
                                            borderColor: COLORS.grey_line,
                                            paddingHorizontal:15,
                                            borderRadius: 30,
                                            marginBottom: 5,
                                            marginTop: 5,
                                            height:45,
                                          }}
                                          onChangeText={props.handleChange(
                                            'reserName',
                                          )}
                                          value={props.values.reserName}
                                          placeholder={'Name'}
                                        />
                                        <Text style={{color: COLORS.redTheme}}>
                                          {props.touched.reserName &&
                                            props.errors.reserName}
                                        </Text>

                                        <TextInput
                                          style={{
                                            backgroundColor: COLORS.textbox_bg,
                                            borderWidth: 1,
                                            borderColor: COLORS.grey_line,
                                            paddingHorizontal:15,
                                            borderRadius: 30,
                                            marginBottom: 5,
                                            height:45,
                                          }}
                                          onChangeText={props.handleChange(
                                            'reserPhone',
                                          )}
                                          value={props.values.reserPhone}
                                          placeholder={
                                            'Phone Number'
                                          }></TextInput>
                                        <Text style={{color: COLORS.redTheme}}>
                                          {props.touched.reserPhone &&
                                            props.errors.reserPhone}
                                        </Text>

                                        <TextInput
                                          style={{
                                            backgroundColor: COLORS.textbox_bg,
                                            borderWidth: 1,
                                            borderColor: COLORS.grey_line,
                                            paddingHorizontal:15,
                                            borderRadius: 30,
                                            marginBottom: 5,
                                            height:45,
                                          }}
                                          onChangeText={props.handleChange(
                                            'reserDescription',
                                          )}
                                          value={props.values.reserDescription}
                                          placeholder={'Notes'}></TextInput>
                                        <Text style={{color: COLORS.redTheme}}>
                                          {props.touched.reserDescription &&
                                            props.errors.reserDescription}
                                        </Text>

                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            alignContent: 'flex-start',
                                            borderRadius: 5,
                                            padding: 10,
                                            
                                          }}>
                                          <CheckBox
                                            tintColor={COLORS.grey_line}
                                            onTintColor={COLORS.app_browntheme}
                                            onCheckColor={COLORS.app_browntheme}
                                            boxType="square"
                                            disabled={false}
                                            value={toggleCheckBox}
                                            onValueChange={(newValue) =>
                                              setToggleCheckBox(newValue)
                                            }
                                          />
                                          <Text style={{paddingLeft: 10}}>
                                            Outdoor Area
                                          </Text>
                                        </View>

                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            alignContent: 'flex-start',
                                            borderRadius: 5,
                                            paddingHorizontal: 10,
                                            marginBottom: 10,
                                          }}>
                                          <CheckBox
                                            tintColor={COLORS.grey_line}
                                            onTintColor={COLORS.app_browntheme}
                                            onCheckColor={COLORS.app_browntheme}
                                            boxType="square"
                                            disabled={false}
                                            value={toggleCheckBox1}
                                            onValueChange={(newValue) =>
                                              setToggleCheckBox1(newValue)
                                            }
                                          />
                                          <Text style={{paddingLeft: 10}}>
                                            I agree to the reservation terms
                                          </Text>
                                        </View>
                                      </View>
                                    </ScrollView>
                                    <TouchableOpacity
                                      onPress={props.handleSubmit}>
                                      <View
                                        style={{
                                          backgroundColor: 'red',
                                          padding: 15,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          backgroundColor:
                                            COLORS.app_browntheme,
                                          flexDirection: 'row',
                                          borderRadius: 50,
                                          margin: 10,
                                          marginTop: 20,
                                        }}>
                                        <Text
                                          style={[
                                            {
                                              color: 'white',
                                              textAlign: 'center',
                                            },
                                            StylesAll.boldFont,
                                          ]}>
                                          Submit
                                        </Text>
                                        {isLoading ? (
                                          <ActivityIndicator
                                            size="small"
                                            color="white"
                                          />
                                        ) : (
                                          <Text></Text>
                                        )}
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                )}
                              </Formik>
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>

        <Modal
          animationType="none"
          transparent={true}
          visible={modelVisible}
          onRequestClose={() => {
            Alert.alert('Model has been closed');
          }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 25,
              backgroundColor: 'gray',
              justifyContent: 'center',
              flexDirection: 'column',
              paddingVertical: 40,
            }}>
            <View
              style={{
                flex: 1,
                borderRadius: 20,
                overflow: 'hidden',
                marginTop: 50,
              }}>
              <FlatList
                backgroundColor="white"
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={ListHeader}
                ItemSeparatorComponent={FlatListItemSeparator}
                data={outlet}
                //keyExtractor={(item) => item.id}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentSelectedOutlet(item);
                      openModel2(item.id);
                      step0();
                    }}>
                    <View style={{flex: 1, flexDirection: 'row', padding: 15,justifyContent:'center',alignItems:'center'}}>
                      <View style={{flex: 1.2}}>
                        <Image
                          source={{
                            uri: `http://shiftlogics.com/Tokyo/${item.out_image}`,
                          }}
                          resizeMode="cover"
                          style={{height: 120, width: '100%'}}></Image>
                      </View>

                      <View
                        style={{
                          flex: 2,
                          flexDirection: 'column',
                          marginLeft: 15,
                          marginRight: 10,
                          marginBottom: 20,
                          marginTop: 20,
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          alignContent: 'center',
                        }}>
                        <Text style={StylesAll.boldFont}>
                          {item.outlet_name}
                        </Text>
                        <Text style={[StylesAll.boldFontLight]}>
                          {item.email}
                        </Text>
                        <Text
                          style={[
                            {color: 'gray', paddingTop: 10},
                            StylesAll.boldFontLight,
                          ]}>
                          {item.address}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>

      { (loginData === null) ?  <View></View> :

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{width: '100%', margin: 10}}
          onPress={() => {
            setModalVisible(true);
          }}>
          <View
            style={[
              {
                width: '100%',
                backgroundColor: COLORS.app_browntheme,
                justifyContent: 'center',
                padding: 15,
                borderRadius: 50,
                alignItems: 'center',
              },
            ]}>
            <Text style={[{color: 'white'}, StylesAll.boldFont]}>
              NEW RESERVATION{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    }
      <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>

      </SafeAreaView>
    </View>
  );
};

export default Reservation;

const styles = StyleSheet.create({
  list: {
    width: 30,
    height: 30,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  m: {tintColor: 'red'},
});
