import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import PageHeader from './Header.js'
import { Font } from 'expo';

export default class FileViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileId: this.props.navigation.getParam('fileId'),
            data: null,
            fontLoaded: false
        };
    }

    async componentDidMount() {
      await Font.loadAsync({
        'open-sans' : require('../assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
        'open-sans-bold' : require('../assets/fonts/Open_Sans/OpenSans-Bold.ttf'),
      });
      this.setState({ fontLoaded: true });
    }

    fileIdToUrl() {
        const baseUrl = 'http://18.207.131.70:8080//hedera/file/';
        let fileId = this.state.fileId;
        let fileIdUrl = fileId.replace(/,/g, '/');
        return baseUrl + fileIdUrl;
    }

    async componentDidMount() {
        this.setState({ fontLoaded: true });
        fetch(this.fileIdToUrl())
        .then(response => response.json())
        .then(data => { 
            console.log(data); 
            this.setState({data}); 
        })
        .catch(e => console.log(e))
    }
    
    goToQrCodeScreen() {
        this.props.navigation.navigate('ProfileCombinationSelector', {fileId: this.state.fileId});
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
            <PageHeader />
            <Text style={{fontSize:25, color: 'white', marginTop: 40, marginBottom:30}}>File ID:{"  " + this.state.fileId}</Text>
            <Image style={{width: 200, height: 200, marginBottom: 20}} source={{uri: photoData}} />
            <View style={styles.profileInfoRow}>
                <Text style={styles.profileInfoHeader}>Name:</Text>
                <Text style={styles.profileInfoValue}>{name}</Text>
            </View>
            <View style={styles.profileInfoRow}>
                <Text style={styles.profileInfoHeader}>Address:</Text>
                <Text style={styles.profileInfoValue}>{address}</Text>
            </View>
            <View style={styles.profileInfoRow}>
                <Text style={styles.profileInfoHeader}>Is 18:</Text>
                <Text style={styles.profileInfoValue}>{"" + is18}</Text>
            </View>
            <View style={styles.profileInfoRow}>
                <Text style={styles.profileInfoHeader}>is 21:</Text>
                <Text style={styles.profileInfoValue}>{"" + is21}</Text>
            </View>
            <TouchableOpacity style={{marginTop: 20}} onPress={()=>this.goToQrCodeScreen()}>
                {/* <Text style={{marginTop:20,fontSize:20, color: 'white', textAlign: "center"}}>Generate QR Code</Text> */}
                <Text style={styles.button}>Generate QR Code</Text>
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
    // justifyContent:'center',
    backgroundColor: '#5a3f99'
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
  profileInfoRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  profileInfoHeader: {
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
    paddingLeft: 5,
    textAlign: 'left',
    flex: 2
  },
  profileInfoValue: {
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
    paddingLeft: 5,
    textAlign: 'left',
    flex: 5
    },
  profileInfoText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
    textAlign: 'center'
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
  }
});
