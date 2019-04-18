import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';

import { StyleSheet, View, TextInput, Button, Text, Image, Picker} from 'react-native';

export default class QrCodeSelectorTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIdType: 'ageOnly',
      fileId: '' 
    };

    this.setSelectedIdType = this.setSelectedIdType.bind(this);
  }

  getFileId() {
    let fileIdMap = {'ageOnly': 'abc123age101928', 'ageAndAddress': 'add1203age193414'};
    var fileId = fileIdMap[this.state.selectedIdType];
    return fileId;
  }

  setSelectedIdType(idType) {
    this.setState({selectedIdType: idType});
  }

  render() {
    let fileId = this.getFileId();
    const propsId = this.props.navigation.getParam('fileId');
    console.log(propsId);
    return (
      <View style={styles.container}>
      <Text style={{color: 'black'}}>{propsId}</Text>
        <IdTypeButton action={this.setSelectedIdType} idtype='ageOnly'/>
        <IdTypeButton action={this.setSelectedIdType} idtype='ageAndAddress'/>
          <QRCode
            value={fileId}
            size={200}
            bgColor='black'
            fgColor='white'/>
      </View>
    );
  }
}
const IdTypeButton = ({ idtype, action }) => (
   <View>
      <Button onPress={() => action(idtype)} title={idtype}/>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});