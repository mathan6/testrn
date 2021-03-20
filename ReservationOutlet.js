import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {StylesAll} from './commanStyle/objectStyle';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const ReservationOutlet = ({navigation, route}) => {
  const mapRef = React.createRef();
  const [showUserLocation, setShowUserLocation] = useState(true);

  const [position, setPosition] = useState({
    latitude: 10.0,
    longitude: 10.0,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;

      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    }).catch(
      (err) => {
        requestPermissions();
        console.log(err);
      },
      Platform.OS === 'android'
        ? {}
        : {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
    );
  }, []);

  return (
    <View style={{flex: 1, flexDirection: 'column' ,backgroundColor:"#fafbfb"}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>

        <View style={[StylesAll.flexWtrapper]}>
          <View style={StylesAll.headWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={[StylesAll.commonHeader, {marginBottom: 20}]}>
              <Image
                source={require('./Image/back.png')}
                style={StylesAll.headArrow}
                resizeMode="contain"
              />
              <Text style={[StylesAll.headTitle]}>OUTLETS</Text>
            </View>
          </TouchableOpacity>
          </View>

          




          <MapView
            style={{flex: 2}}
            ref={mapRef}
            mapType="standard"
            showsUserLocation={setShowUserLocation}
            followsUserLocation={true}
            showsCompass={true}
            showsPointOfInterest={false}
            //region={this.state.region}
            //onRegionChange={this.onRegionChange}
            region={position}
            //coordinates={position}
            initialRegion={position}>
            <MapView.Marker coordinate={position} />
          </MapView>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              paddingHorizontal: 40,
              paddingVertical: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                let myData = route.params?.dataValue.coordinates.split(',');
               

                Linking.openURL(
                  `google.navigation:q=${
                    myData.length > 0 ? Number(myData[0]) : ''
                  }+${myData.length > 0 ? Number(myData[1]) : ''}`,
                );
              }}>
              <View style={StylesAll.commonButton1}>
                <Text style={StylesAll.btnText1}>NAVIGATE NOW</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{paddingHorizontal: 44, paddingVertical: 20}}>
          <Text style={[StylesAll.boldFont]}>Address</Text>

          <Text>{route.params?.dataValue.address}</Text>
          <Text></Text>
          <Text style={[StylesAll.boldFont]}>Phone</Text>

          <Text>{route.params?.dataValue.name}</Text>
        </View>

        <View
          style={[
            StylesAll.flexWtrapper,
            {
              justifyContent: 'flex-end',
              paddingHorizontal: 40,
              paddingVertical: 20,
              flex: 0.5,
            },
          ]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ScanQr');
            }}>
            <View style={StylesAll.commonButton1}>
              <Text style={StylesAll.btnText1}>ORDER NOW</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ReservationOutlet;
