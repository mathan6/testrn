
import React from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import {COLORS} from '../Styles/colors';

 export const StylesAll = StyleSheet.create({  

    main_Title: {
        fontFamily: 'Roboto-Bold',
        color: '#000',
        fontSize: 25,
        letterSpacing: 1,
        marginBottom: 10,
      },
    
      commonWrapper: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: '#fafbfb',
        flex: 1,
        flexDirection: 'column',
      },
    
      field_Box: {
        marginTop: 40,
        paddingHorizontal: 30,
        flexDirection: 'column',
      },
    
      inputFieldBox: {
        height: 45,
        borderColor:"#cccccc",
        borderWidth: 1,
        borderRadius: 50,
        flexDirection: 'row',
        paddingHorizontal: 10,
      },

      inputwrap1: {flex: 0.1},
    
      inputwrap2: {flex: 1,paddingHorizontal:10},
    
      commonButton: {
        backgroundColor: '#9A7527',
        borderRadius: 20,
       paddingHorizontal:40,
       
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:10
      },
    
      btnText: {color: '#fff', fontFamily: 'Roboto-Medium'},
    
      ltguestWrapper: {
        flexDirection: 'column',
   
        marginTop: 20,
      },
    
      fbButton: {
        backgroundColor: '#2874f0',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 50, flexDirection:"row" ,justifyContent:"center" ,alignItems:"center",
      },
      googleButton: {
        borderRadius: 50,
        borderWidth: 1,
        paddingHorizontal: 12,
        
        borderColor: '#2874f0',
        paddingVertical: 10,
        marginHorizontal: 5,flexDirection:"row" ,justifyContent:"center" ,alignItems:"center"
      },

      appleButton: {
      backgroundColor: '#000',
      paddingHorizontal: 20,
      paddingVertical: 12,
      width: '100%',
      borderRadius: 50,
      marginTop: 20, 
      width: '100%', flexDirection:"row" ,justifyContent:"center" ,alignItems:"center"
      },
    
      line1: {borderWidth: 1  , borderColor: '#F3F4F4', width: '45%', height: 1},
    
      qrBox: {
        backgroundColor: '#fff',
        padding: 40,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      },
    
      qrbottomBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#9A7527',
        padding: 20,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
      },
    
      listBox: {
        position: 'relative',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
      },
    
      listBoxlayer: {
        position: 'absolute',
        top: 0,
        backgroundColor: '#000000a3',
        width: '100%',
        height: '100%',
        right: 0,
        left: 0,
      },
      productLists: {
        flexDirection: 'row',
        width: '100%',
        height: 180,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    
      md_Title: {color: '#000', fontFamily: 'Roboto-Bold'},
    
      rewardLists: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
       
    
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 20,
      },
    
      imageStyle: {width: '100%', height: '100%'},
    
      sm_Button: {
        backgroundColor: COLORS.app_browntheme,
        paddingHorizontal: 15,
        borderRadius: 20,
        paddingVertical: 10,
      },
    
      historyLists: {
        flexDirection: 'column',
        borderBottomWidth: 3,
        marginBottom: 25,
        borderBottomColor: '#F3F4F4',
      },
    
      hs_row_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15,
      },
    
      hs_Amount: {fontFamily: 'Roboto-Bold', fontSize: 14},
    
      payId: {fontFamily: 'Roboto-Bold', color: '#9C9C9C', fontSize: 14},
    
      commom_color: {color: '#9C9C9C', fontFamily: 'Roboto-Medium'},
    
      common_successBtn: {
        backgroundColor: '#DDDDDD',
        paddingHorizontal: 19,
        paddingVertical: 6,
        borderRadius: 20,
      },
    
      Wallet_layer1:{backgroundColor:"#fff" ,paddingVertical:30 ,paddingHorizontal:30,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.00,
      
      elevation: 1, borderBottomWidth:3 ,   borderBottomColor: '#F3F4F4',},
    
      wl_ammount:{fontSize:22 ,fontFamily:"Roboto-Bold" ,color:"#9A7527"},


      listButton: {
        backgroundColor: '#9A7527',
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    
        elevation: 3,
      },
    
      btnIcons: {
        width: 20,
        height: 20,
        marginRight: 10,
      },
    
      memberStatus: {
        backgroundColor: '#9A7527',
        padding: 10,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        position: 'relative',
        left: 26,
      },
    
      flexWtrapper: {flex: 1},
      whitecolor: {
        color: '#fff',
      },
      boldFont: {
        fontFamily: 'Roboto-Bold',
      },

       flexScreen:{flex:1 ,
       flexDirection:"column",
       backgroundColor:"#fafbfb"
       },
      
        innerWrapper:{paddingHorizontal:40 ,
        paddingVertical:20 ,
        flex:1 ,
        flexDirection:"column"},

        common_Modal:{flex:1 ,flexDirection:"column" ,backgroundColor:"#000000a3" ,padding:30 }, 
        modalBox:{  backgroundColor:"#fff" ,paddingVertical:30 ,paddingHorizontal:20 ,borderRadius:15},
        redeemQrbox:{backgroundColor:"#fff" ,padding:20 ,width:240 ,height:240},
        inputBox:{borderWidth:1 ,borderColor:"#cccccc" ,borderRadius:50 ,height:45  ,paddingHorizontal:15},
        mediumBtn:{minWidth:120 ,borderRadius:50,padding:12},

        cancelBtn:{
          backgroundColor:"#CCCCCC" ,
          
          },
          viewBtn:{
            backgroundColor: '#9A7527' 
          
          },
          ltcancelbtn:{
            backgroundColor: '#CCCCCC',
            borderRadius: 50,
            paddingVertical: 15,
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          },
        
    iosTop: {
        backgroundColor:  '#EFCB38',
        paddingTop: 50,
        paddingBottom:10,
        textAlign: 'center',
        color:'#fff',
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
   },
   androidTop: { 
       backgroundColor:  '#EFCB38',
       padding: 10,
       textAlign: 'center',
       color:'#fff',
       fontFamily: 'Roboto-Bold',
       fontSize: 20,
   },
   lightFont: {
       fontFamily: 'Roboto-Light',
       fontSize : 15,
   },
   mediamFont: {
       fontFamily: 'Roboto-Medium',
       fontSize : 15,
   },

   VerylightFont: {
    fontFamily: 'Roboto-Light',
    fontSize : 12,
},

   lightmediamFont: {
    fontFamily: 'Roboto-Medium',
    fontSize : 10,
},


   boldFont: {
       fontFamily: 'Roboto-Bold',
       fontSize : 15,
   },

   boldFont2: {
    fontFamily: 'Roboto-Bold',
    fontSize : 20,
},

   boldFontLight: {
    fontFamily: 'Roboto-Medium',
    fontSize : 12,
    },

    LoginBoldFont2: {
      fontFamily: 'Roboto-Bold',
      fontSize : 12,
  },
  
   LoginBoldFont: {
    fontFamily: 'Roboto-Bold',
    fontSize : 22,
},

 alertMsg: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
     marginTop: Dimensions.get('window').height/2.7,
     alignContent:'center',
 }
 
});


 
 