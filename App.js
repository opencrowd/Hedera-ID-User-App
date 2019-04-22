import React from 'react';
import { NavigatorIOS, Text, View, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './app/Login';
import ProfileCombinationSelector from './app/ProfileCombinationSelector';
import FileIdRegistration from './app/FileIdRegistration';
import FileViewer from './app/FileViewer';
import QrCodeSelector from './app/QrCodeSelector';

const AppNavigate = createStackNavigator(
  {Login, ProfileCombinationSelector, FileIdRegistration, FileViewer, QrCodeSelector},
  {initialRouteName: 'Login', headerMode: 'none'}
);
export default createAppContainer(AppNavigate);