import React, { useState, useEffect } from 'react';
import { Text,Dimensions,StatusBar, View, StyleSheet, Image, ScrollView, ImageBackground, FlatList,TouchableOpacity ,Platform,TouchableHighlight,Button,PermissionsAndroid,Linking} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import FlatListItemSeparator  from './FlateListSeparatro';


import ActivityIndi from "./ActivityIndi";
import { StylesAll } from "./commanStyle/objectStyle";
import {COLORS} from "./Styles/colors";
import { loginAction } from './actions/loginActions';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Outlet = ( {navigation} ) => {

  const mapRef = React.createRef();

  const [outlet, setOutlet] = useState([]);

  const [isLoadingList, setIsLoadingList] = useState(true);

  const [showUserLocation ,setShowUserLocation] = useState(true);

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
      error => Alert.alert('Error', JSON.stringify(error));
    }).catch((err) => {
      requestPermissions();
      Alert.alert('Error', JSON.stringify(error))
      //console.log(err);
    },
    Platform.OS === 'android' ? {} : { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000  }
    );

      let abort = new AbortController();
      
   
      fetch(
        'http://tokyo.shiftlogics.com/api/outlet/viewOutlet',
        {
          method: 'POST',
          headers: new Headers({
             Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }),
          //  body: form,
        },
        {signal: abort.signal},
      )
        .then((response) => response.json())
  
        .then((data) => {
          if (data.status === 'success') {
            
            console.log('data data data', data.data);
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
    }, [ ]);

    

    const onPress2 = () => {   
     }

const [position , setPosition] = useState({
  latitude: 10.000,
  longitude : 10.000,
  latitudeDelta : 0.0001,
  longitudeDelta : 0.0001,
});

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
     authorizationLevel: 'whenInUse',
   });
  }
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
}


const gh =(cor)=>{

  let myData = cor.split(',');
  console.log('first Data',Number(myData[0]))
  console.log('first Data',Number(myData[1]))

  Linking.openURL(
    `google.navigation:q=${myData[0]}+${myData[1]}`,
  )

  // {cor.split(',').map((step)=> {
  //   console.log('stepstepstep',step);
  // })}

  // if (showUserLocation == true){
  //       setShowUserLocation(false);
  //     }else{
  //       setShowUserLocation(true);
  //   }

  // setPosition({
  //   latitude : parseFloat(myData[0]) ,
  //   longitude: parseFloat(myData[1]),
  //   latitudeDelta : 0.5,
  //   longitudeDelta : 0.5
  // });
 
}
 

return(

    <View style={{flex: 1,flexDirection : 'column'}}>
        <View style={{flex: 1.5}}>
        <MapView
         ref={mapRef}
         style={{ flex:1.5}}
         mapType="standard"
         showsUserLocation={setShowUserLocation}
         
         followsUserLocation={true}
         showsCompass={true}
         showsPointOfInterest={false}
        //region={this.state.region}
         //onRegionChange={this.onRegionChange}
         region={position}
         //coordinates={position}
         initialRegion={position} 
         >

      <MapView.Marker
       coordinate={position} />   
      </MapView>
      <View style={{flex:1, backgroundColor: 'white',marginBottom: 0,width: '100%',borderRadius: 20}}>
 
              <FlatList 
                 backgroundColor= 'white'
                 showsVerticalScrollIndicator={false}
                 ItemSeparatorComponent={FlatListItemSeparator}
                 data= {outlet}
                 keyExtractor={(item, index) => item.id}
                 renderItem={({item}) =>  
 
            <TouchableOpacity onPress={()=>
            
            gh(item.coordinates)
            
            }>
             <View style={{flex:1,paddingHorizontal: 20,paddingVertical:15}}>
             <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
             <View style={{flex: 0.8,alignContent:'center',alignItems: 'center',justifyContent: 'center',paddingHorizontal:30}}>
             <View style={{width:100,height: 100}}>
             <Image  source={{
                        uri: `http://shiftlogics.com/Tokyo/${item.out_image}`,
                      }}
                      resizeMode="cover"
             style={{width:'100%',height: '100%'}}
             />
             </View>
             </View>
             <View style={{flex: 2,flexDirection:'column',justifyContent: 'space-evenly',padding:5}}>
             <Text numberOfLines={1}  style={StylesAll.boldFont}>{item.outlet_name}</Text>
             <Text numberOfLines={2} style={[{marginTop:10,color:'gray'},StylesAll.lightmediamFont]}>{item.address}</Text>
             <Text style={[{marginTop:10},StylesAll.VerylightFont]} >{item.work_hour}</Text>
             </View>
             
             </View>
             </View>

             </TouchableOpacity>
            }/>

        </View>
 
         </View>

        <View>{isLoadingList ? <ActivityIndi/>:<View></View> }</View>
    </View>
    );

}

export default Outlet;
 
const styles = StyleSheet.create({
mainContainer: {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
},
navBar: {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f1f1f1',
  height: 30,
},
body: {
  flex: 3,
  display: 'flex',
},
 
  carsection: {
    flex:1,
    backgroundColor:'white',
    flexDirection: 'row',
    height:90,
    margin:  10,
    borderRadius: 20,
  },
  carsection2: {
    flex:1,
     backgroundColor: 'red',

  },
  carsection1: {
    height : 90,
    flexDirection: 'column',
    
    margin: 10,
  },
});