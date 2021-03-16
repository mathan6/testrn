import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width 
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

export const My_Data = 'Mathan'

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
       
    { item.postImage.map((ee) =>{
          console.log('eeeeeeee',ee.pImage);
          
     return( 
   <Image 
    source={{uri:`http://shiftlogics.com/Tokyo/${ee.pImage}`}}
                      resizeMode= 'cover'
                       style={styles.imageStyle}
                        key={index}
             />
     ) 
   })
   } 
  
    </View>
  )
}
const styles = StyleSheet.create({

  container: {

    width: ITEM_WIDTH,
    height: '100%',
    backgroundColor:'white'
   
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

})

export default CarouselCardItem