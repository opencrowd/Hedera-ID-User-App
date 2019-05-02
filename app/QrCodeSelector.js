import React from 'react';
import { Entypo } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  NavigatorIOS,
  StyleSheet,
  Switch,
  Image,
  KeyboardAvoidingView,
  Picker
} from 'react-native';


export default class QrCodeSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileId: this.props.navigation.getParam('fileId'),
            selectedCombinationIndex: 0,
            //savedCombinations: this.props.navigation.getParam('savedCombinations')
            savedCombinations: [{name: 'Bar ID', combination: '0,0,1663:10101'}, {name: 'Name and Address', combination: '0,0,1663:11001'},  {name: 'Full ID', combination: '0,0,1663:11111'}]
        };
        
        this.setSelectedCombination = this.setSelectedCombination.bind(this);
    }

    setSelectedCombination(index) {
        this.setState({selectedCombinationIndex: index});
    }

    render() {
        // Scrollable list of profile combinations. Highlight selected (bgcolor light purple?)
        let qrText = this.state.savedCombinations[this.state.selectedCombinationIndex].combination;
        return ( 
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <Text style={{fontSize:20, color: 'white', marginBottom:30}}>Select a Profile Preset:</Text>
            {this.state.savedCombinations.map((combination, i) => <ProfilePresetRow key={i} action={() => this.setSelectedCombination(i)} name={combination.name} value={combination.combination} selected={this.state.selectedCombinationIndex == i}/>)}
            <View style={{overflow: 'hidden', marginTop: 30}}>
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

const ProfilePresetRow = ({action, name, value, selected}) => {
    return (
        <TouchableWithoutFeedback onPress={action}>
            <Text style={selected ? styles.profilePresetSelected : styles.profilePreset}> {name}</Text>
        </TouchableWithoutFeedback>
    );
} 

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#372248'
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
  },
  profilePreset: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
      width: 250,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
      paddingTop: 8,
      paddingBottom: 8,
      marginBottom: 8
  },
  profilePresetSelected: {
    fontSize: 20,
    textAlign: 'center',
    width: 250,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 8,
    backgroundColor: 'white',
    color: '#372248'
  }
});
