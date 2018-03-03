// Warden's (and authorised user) Event listing

import React from 'react';
import { StyleSheet, Text, View, Button,
ScrollView,
Alert,
ActivityIndicator,
Picker, NetInfo, RefreshControl, TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


export default class EventListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usertype: '',
            token: '',
            isLoadedUsertype: false,
            isLoadedToken: false,
            eventID: 'null',
            wardenEventList: 'null',
            listRetrieved: false,
            usertypeWarden: false,
            eventPickerID: 4,
            renderingToggle: false,
            connectionStatus: false,
            refreshing: false,
            hall: '',
            Loaded_Hall: false,
        };
    };

    _rerender = () => {
        this.setState(function(currentState,props){
            return {renderingToggle: !currentState.renderingToggle}
        });
    }



    componentDidMount() {
        AsyncStorage.getItem('hall').then((storedToken) => {
          this.setState({ hall: storedToken, Loaded_Hall: true })
        });


        AsyncStorage.getItem('token').then((storedToken) => {
          this.setState({ token: storedToken, isLoadedToken: true })
        });


        AsyncStorage.getItem('usertype').then((storedUsertype) => {
          this.setState({ usertype: storedUsertype, isLoadedUsertype: true })
        });


        NetInfo.isConnected.fetch().then(isConnected => {
          this.setState({connectionStatus: isConnected});
        });

        const dispatchConnected = isConnected => this.setState({connectionStatus: isConnected});

        NetInfo.isConnected.fetch().then().done(() => {
            NetInfo.isConnected.addEventListener('change', dispatchConnected);
        });
    }



    WardensButton() { // Returns text shown to Wardens
        button1 =<View><Text style={{color: '#0000FF', fontWeight: '900'}}>Wardens & Authorised Users: </Text>
                <Text>Please select the event for which you wish {"\n"}to use the barcode scanner for:</Text>
                </View>
                ;
        button2 =
                        <View><Button title="Barcode Scanner (HS+Wardens)"
                        onPress={() =>
                            {
                                if(this.state.eventID=="null") {
                                    Alert.alert("Please select an event first!");
                                }else{
                                    var theEventID = this.state.eventID.split('.')[0];
                                    Actions.TicketScanner({someInfo: ' Duty Log ', modalVisibleTrue: false, eventID: theEventID});
                                }
                            }
                        }
                    /></View>;
        return {text: button1, button: button2}
    }

    fetchListAsPromise() { // Retrieve list of events from the API
        fetch('https://hallsf.imperial.ac.uk/eHalls/0_app/returnEventsList.php', {
          method: 'POST', // Must use GET for RESTful API in future []
          headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
                   },
          body: JSON.stringify({token: this.state.token, hall: this.state.hall})
        })
        .then(    (response) => response.json()     )
        .then(    (responseData) => {
            var process = responseData.process;
            var errorMessage = responseData.errorMessage;
            var eventData = responseData.eventData;
            if(process=="success" && eventData.length != 0) { // [] [CHECK]
                this.setState({listRetrieved: true, wardenEventList: JSON.stringify(eventData), usertypeWarden: true});
                const ConstantEventData = JSON.parse(this.state.wardenEventList);
                if(this.state.eventID=="null") {
                    this.setState({eventID: ConstantEventData[0].EventID + "." + ConstantEventData[0].id});
                }
            }
        })
        .catch((err) => { console.log(err); });
    }


    render() {
        if (!this.state.isLoadedToken  // Wait for the auth token to load
            || !this.state.isLoadedUsertype
            || !this.state.Loaded_Hall
        ) {
            return (
            <ActivityIndicator />
            )
        }
        else if(this.state.connectionStatus == false) {
            return (
                <View>
                <Text> Scanner is Waiting for an Internet Connection </Text>
                <ActivityIndicator />
                </View>
            )
        }
        else {
            button1 = <Text>{"\n"}</Text>;
            button2 = <Text>{"\n"}</Text>;
            if(this.state.usertype=="WARDEN" || this.state.usertype == "BARCODEACCESS") {
                var WardensButton = this.WardensButton();
                button1 = WardensButton.text;
                button2 = WardensButton.button;
                if(!this.state.listRetrieved) {
                    this.fetchListAsPromise();
                }
                else {
                    if(this.state.usertypeWarden == true) {
                        const ConstantEventData = JSON.parse(this.state.wardenEventList);
                        var WardenEventListPickerItems = [];
                        for(var i=0;i<ConstantEventData.length;i++) {
                            var uniqueValueID = ConstantEventData[i].EventID + "." + ConstantEventData[i].id;
                            WardenEventListPickerItems.push(<Picker.Item key={ConstantEventData[i].id} label={ConstantEventData[i].EventName} value={uniqueValueID} />);
                        } // Could use map() and callback function for this in future
                    }
                    else {
                        WardenEventListPickerItems = "null";
                    }
                }
            }


            return (
                <View>
                                {this.state.usertypeWarden ? (
                                    <View style={{borderWidth: 4, padding: 5, borderColor: '#3d9970'}}>
                                    {button1}
                                        <Picker
                                          selectedValue={this.state.eventID}
                                          onValueChange={(itemValue, itemIndex) => this.setState({eventID: itemValue, eventPickerID: itemIndex})}>
                                        {WardenEventListPickerItems}
                                        </Picker>
                                    {button2}
                                    </View>

                                ) : (
                                    <View><Text>{"\n"}</Text>
                                    <Text>{"\n"}</Text></View>
                                )}
                </View>

            );
        }
    }
}
