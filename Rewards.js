 
import React from 'react';
import {Text,View,FlatList,StyleSheet,ImageBackground, Image,TouchableOpacity,Platform,StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Friends from './Friends';
import HomeScreen from './HomeScreen';
import {COLORS} from './Styles/colors'

import {StylesAll} from './commanStyle/objectStyle';
import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import MyInvites from './MyInvites';
import { SafeAreaView } from 'react-native';

import { Ltout,loginAction,loginPhoneAction } from './actions/loginActions'
import { useDispatch,useSelector } from "react-redux";
import { purgeStoredState } from "redux-persist";
import  MyTabBar from './SampleTab';


 
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
			<Tab.Screen name="My Rewards" component={HomeScreen} />
			<Tab.Screen name="Invite Friends" component={Friends} />
		</Tab.Navigator>
	);
}
 
const Rewards = ( {navigation} ) => {
    return (
   
      <View style={{ backgroundColor: '#fafbfb',flex: 1,
      flexDirection: 'column',paddingVertical: 20}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex:  1}}>

      <View style={{marginBottom:20}}>
    <TouchableOpacity onPress={()=>navigation.goBack()}>
<View style={[StylesAll.commonHeader ,{paddingHorizontal:25,paddingTop:0}]}>
<Image source={require('./Image/back.png')}/>
<Text style={[StylesAll.main_Title ,{marginBottom:0 ,fontSize:20}]}>REWARDS</Text>
</View>
</TouchableOpacity>

</View>
        <MyTabs/>

          {/* <Tab.Navigator  initialRouteName="Home"
            tabBarOptions={{
            indicatorStyle: {position : 'absolute'},
            activeTintColor: 'black',
            name: "mathan",
            labelStyle: { fontSize: 12 },
            backgroundColor: "#fafbfb"
          }}>
           <Tab.Screen name="My Rewards"  component={HomeScreen} />
           <Tab.Screen name="Invire Friends" component={Friends} />
           </Tab.Navigator>  */}
           </SafeAreaView>
       </View>
        
    );
}


export default Rewards;
 
 