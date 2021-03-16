

import React from 'react';
import {Text,Dimensions, View, StyleSheet, Image, ScrollView, ImageBackground, FlatList,TouchableOpacity,TextInput, Constants} from 'react-native';
 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BottomView = ({dataValue}) => {


    console.log('ggggg',dataValue);

    return(
            <View style={{flex: 1}}>
                    <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between'}}>
                    <Image source={require('./Image/sample.jpg')}
                    style={{width:'100%',height: 250}}>
                    </Image>

                    <View style={{height: 60,margin: 20,backgroundColor: 'red',alignItems: 'center',justifyContent: 'center',borderRadius: 20}}>
                    <Text style={{color:'white',fontSize: 18}}>Redeem</Text>
                    </View>
                    </View>
            </View>
    );
}
export default BottomView;
 