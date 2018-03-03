import React from 'react';
import { Text, View,Button, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';

import { BarCodeScanner, Permissions } from 'expo';

export default class TicketScanner extends React.Component {
     constructor(props) {
        super(props);
        this.state = { myusername: '', mypassword: '', usertype: '', token: '', hasCameraPermission: null, modalVisible: this.props.modalVisibleTrue, barcode: '' };
      }
    // barCodeTypes={['EAN_13', 'QR_CODE']}
    static navigationOptions = {
        title: 'Barcode Scanner',
    };
    async componentWillReceiveProps() {
        this.setState({modalVisible: false});
    }

      async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
      }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (typeof hasCameraPermission === 'null') {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <View style={{flex: 1}}>


                <BarCodeScanner onBarCodeRead={this.handleBarCodeRead2}  style={StyleSheet.absoluteFill} />

                <Button disabled={true} title="Please place the barcode/qr code in the camera's sight" onPress={()=> {
                    Actions.refresh()}}/>

            </View>
          );
        }
      }

    handleBarCodeRead2 = (data) => {
        if(this.state.modalVisible != true) {
            this.setModalVisible(true);
            Actions.TicketScannerModal({error: "This barcode is....", hide: false, barcode: data.data, eventID: this.props.eventID})
        }
    }
}
