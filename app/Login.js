import React from 'react';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { Font } from 'expo';
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

  state = {
    fontLoaded : false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans' : require('../assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
      'open-sans-bold' : require('../assets/fonts/Open_Sans/OpenSans-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  
  render() {
    const {navigate} = this.props.navigation;
    return (

      <KeyboardAvoidingView style={styles.container} behavior="position">
        {/* <Text style={{marginBottom:25,fontSize:40, color: 'white', textAlign: 'center'}}>Hedera Persona</Text> */}
        <View style={{alignItems:'center', justifyContent:'center'}}>
            {/* <Feather name="shield" size={180} color="white"/>
            <FontAwesome name="user" size={80} color="white" style={styles.icon} /> */}
            <Image style={{marginBottom: 15}} source={require("../assets/hp_logo_large.png")}/>
            {this.state.fontLoaded ? 
            (<Text>
              <Text style={styles.title} >HEDERA</Text>
              <Text>  </Text>
              <Text style={styles.titleBold} >PERSONA</Text>
            </Text>
              ) : null
            }
        </View>
        <View style={{marginTop:10}}>
        
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image style={{marginTop: 15}} source={require("../assets/icon_user.png")}/> */}
            <TextInput style={styles.textbox} placeholder={"Username"}></TextInput>
        </View>
            <TextInput style={styles.textbox} placeholder={"Pin"} secureTextEntry={true}></TextInput>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={()=>{navigate('FileIdRegistration')}}>
            <Text style={{paddingTop: 5, fontSize:20, color: 'white', textAlign: "center"}}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigate('Registration')}}>
            <Text style={{marginTop:20,fontSize:15, color: "#ffbe31", textAlign: "center"}}>New here? Create Account</Text>
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
    backgroundColor: '#5a3f99'
    //backgroundColor: '#924bcc'
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 30,
    color: '#cab4ff'
  },
  titleBold: {
    fontFamily: 'open-sans-bold',
    fontSize: 30,
    color: '#ffbe31'
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
  },
  loginButton: {
    borderRadius: 10,
    borderWidth: 1,
    width: 300,
    height: 50,
    marginTop: 20,
    paddingLeft:10,
    backgroundColor: 'black'
  }
});
