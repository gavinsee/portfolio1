import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
//import {AsyncStorage} from 'react-native';
/*import Barcode from 'react-native-barcode-builder';*/
import QRCode from 'react-native-qrcode';


export default class Ticket extends React.Component {

     constructor(props) {
        super(props);
        this.state = { myusername: '', mypassword: '', usertype: '', token: ''};
      }

    static navigationOptions = {
        title: 'Event Ticket',
    };
    render() {
        const dimensions = Dimensions.get('window');
        const imageHeight = Math.round(dimensions.width * 9 / 16);
        const imageWidth = dimensions.width - 100;

        const { navigate } = this.props.navigation;
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text>{"\n"}</Text>
                <Text style={{fontSize: 20, fontWeight: '900', color: '#000000'}}>{this.props.eventName}</Text>
                <Text>{"\n"}</Text>

                <QRCode
                value={this.props.ticketNumber}
                size={imageWidth}
                bgColor='black'
                fgColor='white'/>
                <Text>{this.props.ticketNumber}</Text>
                <Text>{"\n"}</Text>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#FF0000'}}>{this.props.eventDateTime}</Text>
                <Text>{"\n"}</Text>
                <Button onPress={() => {
                    Actions.pop()
                } } title="<< Back to Home Page" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fitting: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333',
    },
    header: {

        color: '#ffffff',
        fontWeight: 'bold',
        fontSize:36,
    },
    stretch: {
        width: 90,
        height: 85,
    },
    content: {
        marginTop: 40,
        backgroundColor: '#EEEEEE',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderTopWidth: 5,
        borderColor: '#f56954',
    }
});
