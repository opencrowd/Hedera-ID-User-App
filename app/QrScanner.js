import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class App extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedFileIdWithPermissions: null,
    fileId: null,
    canViewPhoto: false,
    canViewName: false,
    canViewAge18: false,
    canViewAge21: false,
    canViewAddress: false
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedFileIdWithPermissions) {
      LayoutAnimation.spring();
      this.setState({ lastScannedFileIdWithPermissions: result.data });
      this._parseFileIdWithPermissions();
    }
  };

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  _parseFileIdWithPermissions = () => {
    let fileIdWithPermissions = this.state.lastScannedFileIdWithPermissions.split(":");
    this.setState({
      fileId: fileIdWithPermissions[0],
      canViewPhoto: fileIdWithPermissions[1][0] === "1",
      canViewName: fileIdWithPermissions[1][1] === "1",
      canViewAge18: fileIdWithPermissions[1][2] === "1",
      canViewAge21: fileIdWithPermissions[1][3] === "1",
      canViewAddress: fileIdWithPermissions[1][4] === "1"
    })
  };

  _handleViewFileDetails = () => {
    Alert.alert(
      'View Identity Info?',
      this.state.lastScannedFileIdWithPermissions,
      [
        {
          text: 'Yes',
          onPress: () =>this._goToQrScanFileViewerScreen()
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _goToQrScanFileViewerScreen() {
    this.props.navigation.navigate('QrScanFileViewer', {
      fileId: this.state.fileId, 
      canViewPhoto: this.state.canViewPhoto,
      canViewName: this.state.canViewName,
      canViewAge18: this.state.canViewAge18,
      canViewAge21: this.state.canViewAge21,
      canViewAddress: this.state.canViewAddress
    });
  }

  _handlePressCancel = () => {
    this.setState({ lastScannedFileIdWithPermissions: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedFileIdWithPermissions) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handleViewFileDetails}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});
