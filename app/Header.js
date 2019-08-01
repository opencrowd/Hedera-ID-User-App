import React from 'react';
import { Font } from 'expo';
import { Entypo } from '@expo/vector-icons';
import {
  Text,
  StyleSheet,
  Image,
  View
} from 'react-native';


export default class PageHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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

    render() {
        header = this.state.fontLoaded ? ( 
        <View style={styles.topNav}>
            <Image style={styles.logo} source={require("../assets/hp_logo_small.png")}/>
            <Text style={styles.headerText}>  HEDERA</Text>
            <Text> </Text>
            <Text style={styles.headerTextBold}>PERSONA     </Text>
            <Entypo name="menu" size={40} color="#cab4ff"/>
        </View>
            ) : null
        return (
            <View>
                {header}
            </View>
        );
    }
}



const styles = StyleSheet.create({
  topNav: {
    paddingTop: 15,
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
    alignItems: "center"
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
  }
});
