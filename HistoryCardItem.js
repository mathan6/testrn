import React,{useEffect,useState} from 'react';
import {Text,Dimensions,StatusBar,View,StyleSheet,Image,ScrollView,ImageBackground,FlatList,TouchableOpacity} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import  {COLORS} from './Styles/colors'
import ActivityIndi from "./ActivityIndi";
import { StylesAll } from "./commanStyle/objectStyle";


const HistoryCardItem = ({item,index}) => {
    return(

        <View>
          <View style={StylesAll.historyLists}>
          <View style={StylesAll.hs_row_wrapper}>
            <Text style={StylesAll.commom_color}>02 Feb 2021 ,9:30 pm</Text>

            <View style={StylesAll.common_successBtn}>
              <Text style={{color: '#967421', fontFamily: 'Roboto-Bold'}}>
                Success
              </Text>
            </View>
          </View>

          <View style={StylesAll.hs_row_wrapper}>
            <Text style={StylesAll.payId}>Payment ID:PM1000001022</Text>

            <Text style={StylesAll.hs_Amount}> - RM 10.00</Text>
          </View>
        </View>

        <View style={StylesAll.historyLists}>
          <View style={StylesAll.hs_row_wrapper}>
            <Text style={StylesAll.commom_color}>02 Feb 2021 ,9:30 pm</Text>

            <View style={StylesAll.common_successBtn}>
              <Text style={{color: '#967421', fontFamily: 'Roboto-Bold'}}>
                Success
              </Text>
            </View>
          </View>

          <View style={StylesAll.hs_row_wrapper}>
            <Text style={StylesAll.payId}>Payment ID:PM1000001022</Text>

            <Text style={StylesAll.hs_Amount}> - RM 10.00</Text>
          </View>
        </View>
         
        </View>

    );
};



export default HistoryCardItem;
