import React from 'react';
import { NavigatorIOS, Text, View, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './app/Login';
import QrCodeSelector from './app/QrCodeSelector';
import FileIdRegistration from './app/FileIdRegistration';
import FileViewer from './app/FileViewer';
//import Registration from './app/Registration';


// const AppNavigate = createStackNavigator({
//   Login: {
//     screen: Login,
//   },
//   QrCodeSelector: {
//     screen: QrCodeSelector
//   }
// });

const AppNavigate = createStackNavigator(
  {Login, QrCodeSelector, FileIdRegistration, FileViewer},
  {initialRouteName: 'Login', headerMode: 'none'}
);
export default createAppContainer(AppNavigate);