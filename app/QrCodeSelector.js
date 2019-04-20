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
  KeyboardAvoidingView
} from 'react-native';


export default class QrCodeSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileId: this.props.navigation.getParam('fileId'),
            combinationName: "",
            savedCombinations: [],
            toggles: [
                {name: 'Photo', active: true},
                {name: 'Name', active: false},
                {name: 'Age 18', active: false},
                {name: 'Age 21', active: false},
                {name: 'Address', active: false}
            ]
        };

        this.toggleSwitch = this.toggleSwitch.bind(this);
    }

    toggleSwitch (index) {
        this.setState(state => {
            state.toggles[index].active = !state.toggles[intdex].active;
            return state;
        });
    }

    getQrCodeText() {
        let qrText = this.state.fileId + ":";
        this.state.toggles.forEach((toggle) => qrText += toggle.active ? '1' : '0');
        console.log(qrText);
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
    }

    render() {
        let qrText = this.getQrCodeText();
        return ( 
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <Text style={{fontSize:25, color: 'white', marginBottom:30}}>File ID:{"  " + this.state.fileId}</Text>
            {this.state.toggles.map((toggle, i) => <SwitchRow key={i} action={() => this.toggleSwitch(i)} value={toggle.active} displayText={toggle.name}/>)}
            <TextInput value={this.state.combinationName} olnChangeText={t => this.setCombinationName(t)}
                style={styles.textbox} placeholder="Enter Preset Name"/>
            
            <TouchableOpacity onPress={()=>this.saveCombination()}>
                <Text style={{marginTop:5, marginBottom:25, fontSize:20, color: 'white'}}>Save Preset</Text>
            </TouchableOpacity>

            <View style={{overflow: 'hidden'}}>
                <QRCode
                value={qrText}
                size={180}
                bgColor='black'
                fgColor='white'/>
            </View>
        </KeyboardAvoidingView>
        );
    }
}

const SwitchRow = ({displayText, action, value}) => {
    return (
        <View style={{display: 'flex', flexDirection:'row', marginBottom:15}}>
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
    justifyContent:'center',
    backgroundColor: '#372248'
    //backgroundColor: '#924bcc'
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
  icon: {
    position: 'absolute',
    bottom: 60
  }
});
