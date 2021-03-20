import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { StylesAll } from './commanStyle/objectStyle'

export const SLIDER_WIDTH = Dimensions.get('window').width 
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

export const My_Data = 'Mathan'



const CarouselCardItem = ({ item, index }) => {
  return (
    <View  >
       
    { item.postImage.map((ee) =>{
       
          
     return( 
       <View   style={[{}, ]} key={index}>


   <Image 
    source={{uri:`http://shiftlogics.com/Tokyo/${ee.pImage}`}}
                      resizeMode= 'cover'
                       style={[styles.imageStyle ,{borderRadius:11}  ]}
                        key={index}
             />

             </View>
     ) 
   })
   } 
  
    </View>
  )
}
const styles = StyleSheet.create({

  container: {

    width: ITEM_WIDTH,

    
   
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  
  },


  shadowLayout:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5, 
  }
})

export default CarouselCardItem