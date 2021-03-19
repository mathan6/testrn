/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Post from './Post';
import {Buffer} from 'buffer';
global.Buffer = Buffer;

import Rewards from './Rewards';
import React, {useCallback} from 'react';
import Loginscreen from './Loginscreen';
import CreateAccount from './CreateAccount';
import loginWithPhone from './loginWithPhone';
import feedBack from './feedBack';
import MyInvites from './MyInvites';
import Friends from './Friends';
import VoucherData from './VoucherData';
import NewFile from './NewFile';
import Outlet from './Outlet';
import Menu from './Menu';
import ScanQr from './ScanScreen';
import Reservation from './Reservation';
import History from './History';
import TransactionDetail from './TransactionDetails';
import Test from './Test';
import DepartmentSection from './DepartmentSection';
import menuDashboard from './menuDashboard';
import ResentOtp from './ResentOtp';
import ContactsData from './ContactsData';
import AppTest from './AppTest';
import WebViewComman from './webViewTK';
import ReservationOutlet from './ReservationOutlet';
import Voucherdetail from './VoucherDetail';
import {COLORS} from './Styles/colors';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from './Dashboard';
import {Drawercontent} from './DrawerContent';
import Drawer from './RightSlide';
import Detail from './Detail';
import Payment from './Payment';
import TopUp from './TopUp';
import SampleTab from './SampleTab';
import Timer from './TimerEx';
import SplashScreen from './SplashScreen';
import Reserve from './Reservation';
import RewardDetails from './RewardDetails';





import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './Home';

const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();

// const DrawerLists = (navigation) => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       drawerContent={(props) => <Drawercontent {...props} />}
//       drawerStyle={{width: 320}}>
//          <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="Voucher" component={VoucherData} />
//       <Drawer.Screen name="Member" component={MyDesign} />
//       <Drawer.Screen name="Rewards" component={Rewards} />
//       <Drawer.Screen name="Profile" component={Detail} />

//     </Drawer.Navigator>
//   );
// };

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 0,
            backgroundColor: COLORS.app_bgtheme,
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Roboto-Regular',
          },
        }}
        headerMode='none'
        >
          
          {/* <Stack.Screen
          name="Timer"
          options={{title: 'Timer'}}
          component={Timer}
        />  
 
          {/* <Stack.Screen
          name="SampleTab"
          options={{headerShown: false}}
          component={SampleTab}
        /> */}
{/* 
        <Stack.Screen
          name=" "
          options={{headerShown: false}}
          component={Post}
        /> */}

      <Stack.Screen
          name="SplashScreen"
          options={{headerShown: false}}
          component={SplashScreen}
        />
       <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
         
         <Stack.Screen 
          name="Reserve"
          options={{headerShown: false}}
          component={Reserve}
           />
          {/* <Stack.Screen
          name="Post"
          options={{headerShown: false}}
          component={Post}
        />
  */}

        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home'}}
        /> */}

        <Stack.Screen
          name="Login"
          component={Detail}
          options={{title: 'Loginscreen'}}
        />


 
        <Stack.Screen
          name="Loginscreen"
          component={Loginscreen}
          options={{title: 'Login',headerShown: false}}
        />

        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{title: ' '}}
        />

        <Stack.Screen
          name="loginWithPhone"
          component={loginWithPhone}
          options={{title: 'loginWithPhone'}}
        />

        <Stack.Screen
          name="feedBack"
          component={feedBack}
          options={{title: 'FEEDBACK'}}
        />

        <Stack.Screen
          name="Rewards"
          component={Rewards}
          options={{title: 'REWARDS'}}
        />

        <Stack.Screen
          name="WebViewComman"
          component={WebViewComman}
          options={{title: ' '}}
        />
        <Stack.Screen
          name="Friends"
          component={Friends}
          options={{title: 'Friends'}}
        />



<Stack.Screen
          name="RewardDetails"
          component={RewardDetails}
          options={{title: 'RewardDetails'}}
        />
        <Stack.Screen
          name="MyInvites"
          component={MyInvites}
          options={{title: 'INVITE'}}
        />

        <Stack.Screen
          name="VoucherData"
          component={VoucherData}
          
          options={{title: 'VOUCHER'}}
        />

        <Stack.Screen
          name="Outlet"
          component={Outlet}
          options={{title: 'Outlet'}}
        />

        <Stack.Screen name="Menu" component={Menu} options={{title: 'Menu'}} />

        <Stack.Screen
          name="NewFile"
          component={NewFile}
          options={{title: 'NewFile'}}
        />

        <Stack.Screen
          name="ScanQr"
          component={ScanQr}
          options={{title: 'ScanQr'}}
        />

        <Stack.Screen
          name="History"
          component={History}
          options={{title: 'History'}}
        />

        <Stack.Screen
          name="Reservation"
          component={Reservation}
          options={{title: 'MY RESERVATION'}}
        />

        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetail}
          options={{title: 'TransactionDetail'}}
        />

        <Stack.Screen
          name="DepartmentSection"
          component={DepartmentSection}
          options={{title: 'DepartmentSection'}}
        />

        <Stack.Screen
          name="menuDashboard"
          component={menuDashboard}
          options={{title: 'MENU'}}
        />

        <Stack.Screen
          name="ResentOtp"
          component={ResentOtp}
          options={{title: 'ResentOtp'}}
        />

        <Stack.Screen
          name="ContactsData"
          component={ContactsData}
          options={{title: 'ContactsData'}}
        />

        <Stack.Screen
          name="AppTest"
          component={AppTest}
          options={{title: 'AppTest'}}
        />

        <Stack.Screen
          name="ReservationOutlet"
          component={ReservationOutlet}
          options={{title: 'ReservationOutlet'}}
        />

        <Stack.Screen
          name="Voucherdetail"
          component={Voucherdetail}
          options={{title: 'Voucherdetail'}}
        />

        {/* <Stack.Screen
            name = "DrawerLists"
          options={{headerShown: false}}
        component={DrawerLists}
          /> */}

        <Stack.Screen
          name="Drawer"
          options={{headerShown: false}}
          component={Drawer}
        />

        <Stack.Screen
          name="Detail"
          options={{title: 'PROFILE'}}
          component={Detail}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{title: 'MEMBER',
        
        headerStyle:{
          backgroundColor:"#fff",
          headerTintColor: 'red',
        }
       }}
          
         
        />
        
        <Stack.Screen
          name="Payment"
          options={{title: 'Payment'}}
          component={Payment}
        />
 
          <Stack.Screen
          name="TopUp"
          options={{title: 'TopUp'}}
          component={TopUp}
        />
    
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//ScanScreen

export default App;
