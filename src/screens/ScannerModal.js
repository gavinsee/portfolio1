import React from 'react';
import { StyleSheet, Text, View, Image, WebView, Button, AppRegistry,
TextInput,
ScrollView,
Alert,
Modal,
TouchableHighlight,
ActivityIndicator } from 'react-native';

import {
  StackNavigator
} from 'react-navigation';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
//import BarcodeScanner from 'react-native-barcodescanner';
import Expo from 'expo';

export default class ScannerModal extends React.Component {

  constructor(props) {
    super(props)
    // set state with passed in props
    this.state = {
      message: props.error,
      hide: props.hide,
      barcode: props.barcode,
      eventID: props.eventID,
      Loaded_AuthToken: false,
      authToken: '',
      putCompleted: false,
      process: 'is null',
      errorMessage: 'is null',
      hall: '',
      Loaded_Hall: false,
    }

    this.dismissModal = this.dismissModal.bind(this)
  }

    componentWillMount() {
        PromiseAuthToken =  AsyncStorage.getItem('token');
        PromiseHall = AsyncStorage.getItem('hall');

        Promise.all([PromiseAuthToken, PromiseHall]).then(data => {
            this.setState({ authToken: data[0], Loaded_AuthToken: true,
            hall: data[1], Loaded_Hall: true });
            this.verifyTicket.bind(this)();
        });
    }


  dismissModal() {
    this.setState({hide: true})
  }


  verifyTicket() {
      fetch('https://hallsf.imperial.ac.uk/eHalls/0_app/verifyTickets.php', {
        method: 'POST', // RESTful API means that PUT request should be used in the future
        headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
                 },
        body: JSON.stringify({token: this.state.authToken, ticket: this.state.barcode, eventID: this.state.eventID, hall: this.state.hall})
      })
      .then(    (response) => response.json()     )
      .then(    (responseData) => {
          var process = responseData.process;
          var errorMessage = responseData.errorMessage;
          this.setState({putCompleted: true, process: process, errorMessage: errorMessage});
      })
      .catch((err) => { console.log(err); });
  }

  render() {
    if (!this.state.Loaded_AuthToken) {
        return (
        <View>
        <Text> Authorisation Token Processing </Text>
        <ActivityIndicator />
        </View>
        )
    }
    else {
        if(this.state.hide){
          return (
            <View>
            </View>
          )
        } else {

            if(!this.state.putCompleted) {
                return (//when state gets updated, ActivityIndicator will vanish
                    <View>
                    <Text> Wait for Internet Connection </Text>
                    <ActivityIndicator />
                    </View>
                )
            }
            else { // Start else for guarentee of everything is completed to present status
                var theImages = [
                    require('./../assets/tick.png'),
                    require('./../assets/cross.png'),
                ];
                if(this.state.process=="success") {
                    var theImageChosen = 0;
                }
                else {
                    var theImageChosen = 1;
                }
                // In future, don't use <Text>{"\n"}</Text> - Use StyleSheet instead!
                return ( // Start Return
                    <View>
                      <View>

                            <Text>{"\n"}</Text>
                            <Text>{"\n"}</Text>
                            <Text>{"\n"}</Text>
                            <Text>{"\n"}</Text>
                            <Text>The Barcode is the following: {this.state.barcode}</Text>
                            <Text>{"\n"}</Text>
                            <Text>{"\n"}</Text>

                        </View>
                        <View style={{justifyContent: 'center',alignItems: 'center',}}>
                            <TouchableHighlight onPress={() => {Actions.pop({ refresh: { test: true }})} }>
                                <Image source={theImages[theImageChosen]} style={{ width: 200, height: 200 }} />
                            </TouchableHighlight>
                        </View>
                        <View style={{justifyContent: 'center',alignItems: 'center',}}>
                            <Text>{"\n"}</Text>
                            <Text style={{fontSize: 14, justifyContent: 'center', width: 250, color: '#ff0000', fontWeight: '900', textAlign: 'center'}}>Press the tick/cross to go back to the scanner</Text>
                            <Text>{"\n"}</Text>
                            <Text>{"\n"}</Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{fontSize: 20, justifyContent: 'center'}}>{this.state.errorMessage}</Text>
                        </View>
                        <Text>{"\n"}</Text>
                        <Text>{"\n"}</Text>

                        <Button onPress={() => {
                            Actions.pop({ refresh: { test: true }})
                        } } title="<< Back to Barcode Camera Scanner" />
                    </View>
                ) // End Return
            }
          }
    }
  } // end render
} // end class
