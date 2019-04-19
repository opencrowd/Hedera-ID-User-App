import React from 'react';
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


export default class FileViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileId: this.props.navigation.getParam('fileId'),
            data: null
        };
    }

    fileIdToUrl() {
        const baseUrl = 'http://3.83.187.253:8080/hedera/file/';
        let fileId = this.state.fileId;
        let fileIdUrl = fileId.replace(/,/g, '/');
        return baseUrl + fileIdUrl;
    }

    componentDidMount() {
        fetch(this.fileIdToUrl())
        .then(response => response.json())
        .then(data => { 
            console.log(data); 
            this.setState({data}); 
        })
        .catch(e => console.log(e))
    }

    render() {
        let photoData = "", name = "", is21 = null, is18 = null, address = "";
        if (this.state.data != null && this.state.data.content != null) {
            let profileData = JSON.parse(this.state.data.content);
             console.log(profileData);
             photoData = 'data:image/jpg;base64,' + profileData.photo;
             name = profileData.name;
             is21 = profileData.is21;
             is18 = profileData.is18;
             address = profileData.address;
        }

        return (
        <View style={styles.container}>
            <Text style={{fontSize:25, color: 'white', marginBottom:30}}>File ID:{"  " + this.state.fileId}</Text>
            <Image style={{width: 200, height: 200}} source={{uri: photoData}} />
            
            <Text style={{fontSize:20, color: 'white', marginBottom:10}}>Name:{" " + name}</Text>
            <Text style={{fontSize:20, color: 'white', marginBottom:10}}>Address:{" " + address}</Text>
            <Text style={{fontSize:20, color: 'white', marginBottom:10}}>Is 18:{" " + is18}</Text>
            <Text style={{fontSize:20, color: 'white', marginBottom:10}}>Is 21:{" " + is21}</Text>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('QrCodeSelector')}}>
                <Text style={{marginTop:20,fontSize:20, color: 'white', textAlign: "center"}}>Generate QR Code</Text>
            </TouchableOpacity>
        </View>
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
