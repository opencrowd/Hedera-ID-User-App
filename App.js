import React from 'react';
import { NavigatorIOS, Text, View, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './app/Login';
import ProfileCombinationSelector from './app/ProfileCombinationSelector';
import FileIdRegistration from './app/FileIdRegistration';
import FileViewer from './app/FileViewer';
import QrCodeSelector from './app/QrCodeSelector';
import QrScanner from './app/QrScanner';
import QrScanFileViewer from './app/QrScanFileViewer';

const AppNavigate = createStackNavigator(
  {Login, ProfileCombinationSelector, FileIdRegistration, FileViewer, QrCodeSelector, QrScanner, QrScanFileViewer},
  {initialRouteName: 'Login', headerMode: 'none'}
  //{initialRouteName: 'QrScanner', headerMode: 'none'}
  );
export default createAppContainer(AppNavigate);