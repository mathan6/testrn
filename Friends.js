
import React from 'react';
import { Text,Dimensions,StatusBar, View, StyleSheet, Image, ScrollView, ImageBackground, FlatList,TouchableOpacity ,Platform,TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from "./Styles/colors";
import { StylesAll } from "./commanStyle/objectStyle";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Friends = ({navigation}) => {

  const headerView = () => {
      return(
        <View> 
          <Text style={{color:'gray',textAlign:'center',padding:10}}>AVAILABLE REWARDS FOR YOU</Text>
        </View>


    );
  };

    const onPress2 = () => {
         navigation.navigate('MyInvites');
      }

      const renderItem = ({item}) => {
        return (
          <View style={StylesAll.rewardLists}>
            <View style={{height: 200}}>
              <Image
                source={item.image}
                style={[
                  StylesAll.imageStyle,
                  {borderTopLeftRadius: 10, borderTopRightRadius: 10,backgroundColor:COLORS.app_brownlightheme},
                ]}
                resizeMode= 'cover'
              />
            </View>
    
            <View style={{flexDirection: 'row', padding: 15, alignItems: 'center'}}>
              <View style={{flexDirection: 'column', flex: 1, paddingRight: 10}}>
                <Text style={StylesAll.md_Title} numberOfLines={3}>
                  {item.name}
                </Text>
                <Text></Text>
                <Text numberOfLines={2}>{item.desc}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() =>{
                  onPress2()
                }}>
                  <View style={StylesAll.sm_Button}>
                    <Text style={StylesAll.btnText}>Invite</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      };
  
return(
 
<View style={{backgroundColor:COLORS.app_bgtheme}}>
<FlatList 
contentContainerStyle={{padding:30}}
   
   showsVerticalScrollIndicator={false}
  
      data= {[
      {
        "id" : 1,
        "name" : 'GET 1 Hanjuku Cheeese Tart',
        "desc" : 'Invite 5 of your friends to download our app and get 1 * Hanjuku Cheese Tart',
        "image" : require('./Image/appInvite.png')
      },
      {
        "id" : 2,
        "name" : 'Get RM5 Voucher',
        "desc" : 'Refer a friend and get RM5 voucher for both you and your friend',
        "image" : require('./Image/girls.jpeg')
      },

    ]}
 
 renderItem={renderItem}
 />
</View>

    );

}
export default Friends;
 
 