import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StylesAll } from "./commanStyle/objectStyle";
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';

 
  const ReservationOutlet = ({navigation,route}) => {

  const mapRef = React.createRef();
  const [showUserLocation ,setShowUserLocation] = useState(true);

const [position , setPosition] = useState({
  latitude: 10.000,
  longitude : 10.000,
  latitudeDelta : 0.0001,
  longitudeDelta : 0.0001,
});

useEffect(() => {
 
  Geolocation.getCurrentPosition((pos) => {
    const crd = pos.coords;
    console.log('lat',crd.latitude);
    console.log('long',crd.longitude);
    setPosition({
      latitude: crd.latitude,
      longitude: crd.longitude,
      latitudeDelta: 0.0421,
      longitudeDelta: 0.0421,
    });
  }).catch((err) => {
    requestPermissions();
    console.log(err);
  },
  Platform.OS === 'android' ? {} : { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000  }
  );

  
}, [])

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
         <View style={[StylesAll.flexWtrapper]}>
          <View style={{flex:1}}>
          <MapView
              style={{flex:1}}
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
              <TouchableOpacity onPress={()=>{
                navigation.navigate('Outlet')
              }}>
                <View style={StylesAll.commonButton}>
                  <Text style={StylesAll.btnText}>NAVIGATE NOW</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{paddingHorizontal: 30, paddingVertical: 20}}>
            <Text style={[StylesAll.boldFont]}>Address</Text>
 
            <Text>{route.params?.dataValue.address}</Text>
            <Text></Text>
            <Text style={[StylesAll.boldFont]}>Phone</Text>

            <Text>{route.params?.dataValue.name}</Text>
          </View>
        </View>

        <View
          style={[
            StylesAll.flexWtrapper,
            {justifyContent: 'flex-end', paddingHorizontal: 15},
          ]}>
          <TouchableOpacity>
            <View style={StylesAll.commonButton}>
              <Text style={StylesAll.btnText}>ORDER NOW</Text>
            </View>
          </TouchableOpacity>
        </View>  
      </SafeAreaView>
    </View>
  );
}

export default ReservationOutlet;