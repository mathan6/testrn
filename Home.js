import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import {COLORS} from './Styles/colors';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ActivityIndi from './ActivityIndi';
import {StylesAll} from './commanStyle/objectStyle';

import {useNavigation} from '@react-navigation/native';
import {Ltout, loginAction, loginPhoneAction} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';

import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
  My_Data,
} from './CarouselCardItem';
import SampleData from './SampleData';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Outlet from './Outlet';
// import { DrawerActions } from '@react-navigation/native';

const Home = ({navigation}) => {


  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//

  const LoginStatus = useSelector((state) => state.loginDetails);

  const {loginData} = LoginStatus;

  const isCarousel = React.useRef(null);

  const [isLoadingList, setIsLoadingList] = useState(true);

  const [viewPostData, setViewPostData] = useState([]);

  
  const{status} = LoginStatus;


  useEffect(() => {

    if (status === "failure"){
       dispatch(Ltout(purgeStoredState))
    }else{
      console.log("ssssssssssssucesss");
    }

    let abort = new AbortController();
    var form = new FormData();

    fetch(
      'http://tokyo.shiftlogics.com/api/newpost/viewNewpost',
      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        // body: form,
      },
      {signal: abort.signal},
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          console.log('datadatadata', data.data);

          setViewPostData(data.data);
          setIsLoadingList(false);
        } else {
          setIsLoadingList(false);
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };
  }, []);

  const onPress2 = () => {
    navigation.navigate('Reservation');
  };

  const onPress3 = () => {
    navigation.navigate('menuDashboard');
  };

  const onPress4 = () => {
    navigation.navigate('ScanQr');
  };

  const renderItem = ({item}) => {
    return (
      <View style={[{flex: 1, padding: 10}]}>
        {item.postImage.map((ee) => {
          console.log('eeeeeeeemathannn', ee.pImage);
          return (
            <View
              style={[
                {flex: 1,borderRadius:15},
                
                {overflow: 'hidden'},
              ]}>
              <Image
                source={{uri: `http://shiftlogics.com/Tokyo/${ee.pImage}`}}
                style={{width: windowWidth / 1.8, height: '100%'}}
                resizeMode="cover"></Image>
            </View>
          );
        })}
      </View>
    );
  };

  const listHeaderView = () => {
    return (
      <View>
        <Text>Header</Text>
      </View>
    );
  };

  return (
    <View style={StylesAll.flexScreen}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={StylesAll.flexScreen}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 20,
          }}>
          <View style={{padding: 20}}>
            <Image
              style={{width: 150, height: 50}}
              source={require('./Image/tokyo.png')}></Image>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
            <View style={{padding: 20}}>
              <Image
                style={{width: 30, height: 30}}
                source={require('./Image/mainmenu.png')}></Image>
            </View>
          </TouchableOpacity>
        </View>
        
        { loginData == null ? null:
        <Text
        style={[
          {padding: 10, paddingLeft: 30},
          COLORS.dashboard_name,
          StylesAll.mediamFont,
        ]}>
       Hi, {loginData.name} 
      </Text>}
        

        <View style={{flex: 1.2, paddingLeft: 20, paddingBottom: 10}}>
          <Text
            style={[
              {paddingTop: 10, paddingLeft: 10, paddingBottom: 10},
              StylesAll.boldFont2,
            ]}>
            Latest Vouchers
          </Text>

          <Carousel
            layout="default"
            layoutCardOffset={9}
            ref={isCarousel}
            data={viewPostData}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={0}
            useScrollView={true}
            loop={true}
            autoplay={true}
            //ListHeaderView={listHeaderView}
            autoplayDelay={0.3}
          />
        </View>

        <View style={{flex: 2.2, paddingLeft: 20, paddingBottom: 10}}>
          <Text
            style={[
              {paddingTop: 10, paddingLeft: 10, paddingBottom: 10},
              StylesAll.boldFont2,
            ]}>
            Popular
          </Text>
          <FlatList
            horizontal
            numColumns={1}
            showsHorizontalScrollIndicator={false}
            data={viewPostData}
            //ListEmptyComponent={EmptyListMessage}
            keyExtractor={(item) => item.id}
            //keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
          <View style={{flexDirection:"row" ,justifyContent:"space-around" ,paddingTop:15}}>

          <TouchableOpacity onPress={() =>{
            navigation.navigate('menuDashboard')
          }}>
          <View  style={styles.labelBox}>
          <Image source={require('./Image/menuNew.png')} style={styles.labelIcons}/>
          <Text  style={StylesAll.boldFontLight2}>Menu</Text>

          </View>

          </TouchableOpacity>

          <TouchableOpacity onPress={() =>{
            navigation.navigate('ScanQr')
          }}>
          <View style={styles.labelBox}>
          <Image source={require('./Image/orderNew.png')}  style={styles.labelIcons}  />
          <Text  style={StylesAll.boldFontLight2}>Order</Text>

          </View>

          </TouchableOpacity>


          <TouchableOpacity onPress={() =>{
            navigation.navigate('Reserve')
          }}>
          <View style={styles.labelBox}>
          <Image source={require('./Image/reserveNew.png')}  style={styles.labelIcons}/>

          <Text  style={StylesAll.boldFontLight2}>Reserve</Text>

          </View>

          </TouchableOpacity>


          <TouchableOpacity onPress={() =>{
             navigation.navigate('Outlet')
          }}>

          <View style={styles.labelBox}> 
          <Image source={require('./Image/outletNew.png')} style={styles.labelIcons}/>

          <Text style={StylesAll.boldFontLight2}>Outlets</Text>


          </View>


          </TouchableOpacity>




        </View>

          {/* <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={viewPostData}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        autoplay={true}
        ListHeaderView={listHeaderView}
        autoplayDelay={0.3}
      /> */}

          {/* <View style= {{flexDirection : 'column'}}>
          <TouchableOpacity onPress={()=> {navigation.navigate('Outlet')}}>
          <View style = {styles.ListHeaderView}>
          <Image style={styles.list}
          source={require('./Image/outlets.png')}/>
          <Text style={styles.logintext1}>
          Outlets
          </Text>
          </View>
          </TouchableOpacity>
           
          <TouchableOpacity onPress={onPress2}>
          <View style = {styles.ListHeaderView}>
          <Image style={styles.list}
          source={require('./Image/reserve.png')}/>
          <Text style={styles.logintext1}>
          Reserve
         </Text>
         </View>
         </TouchableOpacity>
          </View>

          <View style= {{flexDirection : 'column'}}>
          <TouchableOpacity onPress={onPress3}>
          <View style = {styles.ListHeaderView}>
          <Image style={styles.list}
          source={require('./Image/menu.png')}/>
          <Text style={styles.logintext1}>
          Menu
          </Text>
          </View>
          </TouchableOpacity>
           
         <TouchableOpacity onPress={onPress4}>
         <View style = {styles.ListHeaderView}>
         <Image style={styles.list}
          source={require('./Image/scan.png')}/>
          <Text style={styles.logintext1}>Scan to Order</Text>
         </View>
         </TouchableOpacity>

        </View> */}
        </View>
      </SafeAreaView>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

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
    backgroundColor: '#EECA39',
    width: 300,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
  },

  carbackground: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#424242',
  },
  section1: {
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#2AFD89',
  },
  searchbar: {
    flexDirection: 'row',
    backgroundColor: '#00D35F',
    justifyContent: 'space-between',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
  },
  group: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  section1word: {
    backgroundColor: '#2AFD89',
  },
  sec1wordinside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#2AFD89',
  },
  text1: {
    fontWeight: 'bold',
  },
  text2: {
    fontWeight: 'bold',
    color: 'white',
    borderBottomWidth: 4,
    borderColor: 'white',
    paddingBottom: 10,
    width: 75,
    textAlign: 'center',
  },
  end: {
    flexDirection: 'row',
    backgroundColor: '#191919',
    padding: 10,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  picture: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  endtext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 10,
  },
  loginView: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'white',
    padding: 0,
  },
  listView: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 0,
  },
  list: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  loginHeaderView: {
    backgroundColor: '#00000012',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ListHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  logintextView: {
    marginLeft: 0,
  },
  logintext1: {
    color: 'black',
    paddingLeft: 3,
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
  },
  logintext2: {
    color: 'gray',
    fontWeight: 'normal',
    fontSize: 15,
    paddingLeft: 10,
  },
  search: {
    width: 70,
    height: 70,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },

  androidios: {
    backgroundColor: '#EFCB38',
    padding: 10,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  labelIcons:{width:25 ,height:25 ,marginBottom:10  } ,

  labelBox:{alignItems:"center"}
});
