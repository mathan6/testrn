import React, {useState, useEffect} from 'react';
import {
  Text,
  Dimensions,
  StatusBar,
  SafeAreaView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ActivityIndi from './ActivityIndi';
import DepartmentSection from './DepartmentSection';
import {COLORS} from './Styles/colors';
import {StylesAll} from './commanStyle/objectStyle';


const Menusubcategory = ({navigation ,route}) => {


  const [isLoadingList, setIsLoadingList] = useState(true);
  const [CategoryProduct, setCategoryProduct] = useState([]);
 

  let globalCatid = route.params?.productId.id




  console.log(globalCatid)



  useEffect(() => {


    let abort = new AbortController();
    var form = new FormData();


    form.append('cateid', route.params?.productId.id);


    fetch(
      'http://tokyo.shiftlogics.com/api/category/betasubcategory',
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
       
          setCategoryProduct(data.data);

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

  return (
    <View style={StylesAll.commonWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
      <SafeAreaView
        style={{flex: 1, flexDirection: 'column'}}>
    <View style={{marginBottom : 30}}>
<TouchableOpacity onPress={()=>navigation.goBack()}>
<View style={[StylesAll.commonHeader]}>
<Image source={require('./Image/back.png')}  resizeMode="contain"   style={StylesAll.headArrow}/>
  <Text style={[StylesAll.headTitle ,{textTransform:"uppercase"}]}>{route.params?.productId.name}</Text>
</View>
</TouchableOpacity>

</View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={CategoryProduct}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Menu', {productId: item  , subCat : route.params?.productId.id});



              }}>
              <View style={StylesAll.listBox}>
                <Image
                  source={{
                    uri: `http://shiftlogics.com/Tokyo/${item.image}`,
                  }}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
                <View style={StylesAll.listBoxlayer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      paddingTop: 80,
                    }}>
                    <Text style={StylesAll.btnText}>{item.subcatename}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
      <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
    </View>
  );
};

export default Menusubcategory;
