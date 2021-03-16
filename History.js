
import React,{useEffect,useState} from 'react';
import {Text,Dimensions,StatusBar,View,StyleSheet,Image,ScrollView,ImageBackground,FlatList,TouchableOpacity,SafeAreaView} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import  {COLORS} from './Styles/colors'
import ActivityIndi from "./ActivityIndi";
import { StylesAll } from "./commanStyle/objectStyle";
import HistoryCardItem from './HistoryCardItem';
import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import MyTabBar from './SampleTab';

import PaymentList from './PaymentList';
import TopUpList from './TopUpList';


const Tab = createMaterialTopTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
			<Tab.Screen name="Payment" component={PaymentList} />
			<Tab.Screen name="Top Up" component={TopUpList} />
           

		</Tab.Navigator>

	);
}
 

const History = ({navigation}) => {
 
    return(
          <View style={{ backgroundColor: '#fafbfb',flex: 1,
          flexDirection: 'column',paddingVertical: 20}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
            <SafeAreaView style={{flex: 1}}>
            <MyTabs/>
       </SafeAreaView>
 </View>

    );

};

export default History;

