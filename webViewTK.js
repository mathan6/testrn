import React,{Component} from 'react';
import {WebView} from 'react-native-webview'

const WebViewComman = ({ navigation, route }) => {
 
    return( 
        <WebView
        source={{
          uri: route.params?.urlString
        }}
        startInLoadingState={true}
      />   

    );
};

export default WebViewComman;
