import React from 'react';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  NavigatorIOS,
  StyleSheet,
  Image,
} from 'react-native';

export default class Login extends React.Component {
  
  render() {
    const {navigate} = this.props.navigation;
    return (

      <KeyboardAvoidingView style={styles.container} behavior="position">
        <Text style={{marginBottom:25,fontSize:40, color: 'white', textAlign: 'center'}}>Hedera Persona</Text>
        <View style={{alignItems:'center', justifyContent:'center'}}>
            <Feather name="shield" size={180} color="white"/>
            <FontAwesome name="user" size={80} color="white" style={styles.icon} />
        </View>
        <View style={{marginTop:10}}>
            <TextInput style={styles.textbox} placeholder={"Username"}></TextInput>
            <TextInput style={styles.textbox} placeholder={"Pin"} secureTextEntry={true}></TextInput>
        </View>
        <TouchableOpacity onPress={()=>{navigate('FileIdRegistration')}}>
            <Text style={{marginTop:20,fontSize:20, color: 'white', textAlign: "center"}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigate('Registration')}}>
            <Text style={{marginTop:20,fontSize:15, color: 'white', textAlign: "center"}}>Create Account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#372248'
    //backgroundColor: '#924bcc'
  },
  textbox: {
    borderRadius: 10,
    borderWidth: 1,
    width: 300,
    height: 50,
    marginTop: 20,
    paddingLeft:10,
    backgroundColor: 'white'
  },
  icon: {
    position: 'absolute',
    bottom: 60
  }
});
