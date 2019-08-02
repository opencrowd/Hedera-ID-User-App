import React from 'react';
import { Entypo } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  NavigatorIOS,
  StyleSheet,
  Switch,
  Image,
  KeyboardAvoidingView,
  ToastAndroid
} from 'react-native';
import PageHeader from './Header.js'

export default class ProfileCombinationSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileId: this.props.navigation.getParam('fileId'),
            combinationName: "",
            savedCombinations: [],
            toggles: [
                {name: 'Share my Photo', active: true},
                {name: 'Share my Name', active: false},
                {name: 'Share my Age (18+)', active: false},
                {name: 'Share my Age (21+)', active: false},
                {name: 'Share my Address', active: false}
            ]
        };

        this.toggleSwitch = this.toggleSwitch.bind(this);
    }

    toggleSwitch (index) {
        this.setState(state => {
            state.toggles[index].active = !state.toggles[index].active;
            return state;
        });
    }

    getQrCodeText() {
        let qrText = this.state.fileId + ":";
        this.state.toggles.forEach((toggle) => qrText += toggle.active ? '1' : '0');
        return qrText;
    }

    setCombinationName(name) {
        this.setState({combinationName: name});
    }

    saveCombination() {
        this.setState(prevState => ({
            savedCombinations: [...prevState.savedCombinations, {name: prevState.combinationName, combination: this.getQrCodeText()}],
            combinationName: ""
        }));
        ToastAndroid.showWithGravity('Combination Saved!',ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    goToQrCodeScreen() {
        this.props.navigation.navigate('QrCodeSelector', {fileId: this.state.fileId, savedCombinations: this.state.savedCombinations});
    }

    render() {
        let qrText = this.getQrCodeText();
        return ( 
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <PageHeader />
            <Text style={{fontSize:25, color: 'white', marginTop:20, marginBottom:20}}>File ID:{"  " + this.state.fileId}</Text>
            {this.state.toggles.map((toggle, i) => <SwitchRow key={i} action={() => this.toggleSwitch(i)} value={toggle.active} displayText={toggle.name}/>)}
            <TextInput value={this.state.combinationName} onChangeText={t => this.setCombinationName(t)}
                style={styles.textbox} placeholder="Enter Preset Name"/>
            
            <View style={{display: 'flex', flexDirection: 'row', paddingTop: 20, paddingBottom: 20}}>
                <TouchableOpacity onPress={()=>this.saveCombination()}>
                    <Text style={styles.button}>Save Preset</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.goToQrCodeScreen()}>
                    <Text style={styles.button}>View Presets</Text>
                </TouchableOpacity>
            </View>

            <View style={{overflow: 'hidden'}}>
                <QRCode
                value={qrText}
                size={150}
                bgColor='black'
                fgColor='white'/>
            </View>
        </KeyboardAvoidingView>
        );
    }
}

const SwitchRow = ({displayText, action, value}) => {
    return (
        <View style={{display: 'flex', flexDirection:'row', paddingLeft: 40, paddingRight: 40, marginBottom:15}}>
            <Text style={{flex: 4, fontSize:15, color: 'white'}}>{displayText}</Text>
            <Switch style={{flex: 1}} onValueChange={action} value={value}/>
        </View>
    );
} 

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    alignItems:'center',
    // justifyContent:'center',
    backgroundColor: '#5a3f99'
    //backgroundColor: '#924bcc'
  },
  header: {
    textAlign: 'left'
  },
  headerText: {
    fontFamily: 'open-sans',
    fontSize: 20,
    color: '#cab4ff'
  },
  headerTextBold: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#ffbe31'
  },
  textbox: {
    borderRadius: 10,
    borderWidth: 1,
    width: 300,
    height: 50,
    marginTop: 10,
    paddingLeft:10,
    backgroundColor: 'white'
  },
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#521d6d',
    color: 'white',
    padding: 8,
    fontSize: 18,
    marginLeft: 14,
    marginRight: 14
  },
  icon: {
    position: 'absolute',
    bottom: 60
  }
});
