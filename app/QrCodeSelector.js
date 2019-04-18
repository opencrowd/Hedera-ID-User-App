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
} from 'react-native';


export default class QrCodeSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileId: this.props.navigation.getParam('fileId'),
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
            state.toggles[index].active = !state.toggles[index].active;
            return state;
        });
    }

    getQrCodeText() {
        let qrText = this.state.fileId + ":";
        this.state.toggles.forEach((toggle) => qrText += toggle.active ? '1' : '0');
        console.log(qrText);
        return qrText;
    }

    render() {
        let qrText = this.getQrCodeText();
        return (
        <View style={styles.container}>
            <Text style={{fontSize:25, color: 'white', marginBottom:30}}>File ID:{"  " + this.state.fileId}</Text>
            {this.state.toggles.map((toggle, i) => <SwitchRow key={i} action={() => this.toggleSwitch(i)} value={toggle.active} displayText={toggle.name}/>)}
            <View style={{overflow: 'hidden'}}>
                <QRCode
                value={qrText}
                size={200}
                bgColor='black'
                fgColor='white'/>
            </View>
        </View>
        );
    }
}

const SwitchRow = ({displayText, action, value}) => {
    return (
        <View style={{display: 'flex', flexDirection:'row', marginBottom:15}}>
            <Text style={{flex: 4, fontSize:18, color: 'white'}}>{displayText}</Text>
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
    marginTop: 20,
    paddingLeft:10,
    backgroundColor: 'white'
  },
  icon: {
    position: 'absolute',
    bottom: 60
  }
});
