// List the ticket's that are owned by the user
import React from 'react';
import { StyleSheet,
        Text,
        View,
        Button,
        ActivityIndicator,
        Alert,
        NetInfo,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';


export default class TicketListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    token: '',
                    Loaded_Token: false,

                    ticketData: null,
                    Loaded_TicketData:false,

                    connectionStatus: false,
                    renderingToggle: false,

                    hall: '',
                    Loaded_Hall: false,
        };
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.refreshToggle != this.props.refreshToggle) {
            this.refreshTickets(true);
        }
    }



    async saveItem(item, selectedValue) {
        try {
              await AsyncStorage.setItem(item, selectedValue);
            } catch (error) {
              console.error('AsyncStorage error: ' + error.message);
        }
    }

    _rerender = () => {
        this.setState(function(currentState,props){
            return {renderingToggle: !currentState.renderingToggle}
        });
    }


    async refreshTickets(ConnectionMessage) {
        if((ConnectionMessage==true) && (this.state.connectionStatus==false)) {
            Alert.alert("Please ensure you are connected to the internet");
        }
        try {
          AsyncStorage.getItem('token').then(   (thisToken) => {
                fetch('https://hallsf.imperial.ac.uk/eHalls/0_app/returnTickets.php', {
                method: 'POST',
                headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                       },
                body: JSON.stringify({token: thisToken, hall: this.state.hall})
                })
                .then(    (response) => response.json()     )
                .then(    (responseData) => {
                    if(parseInt(responseData.count)>0) {
                        this.saveItem('ticketData', JSON.stringify(responseData.ticketData)); // For offline use
                        this.setState({
                            ticketData: JSON.stringify(responseData.ticketData), Loaded_TicketData: true
                        });
                    }
                    else { // Response to save when there are no valid tickets
                        this.saveItem('ticketData', null);
                    }
                    this.props.action();
                    this._rerender();

                })
                .catch((err) => { console.log(err); })

            });

        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }






    componentDidMount() {
        AsyncStorage.getItem('hall').then((storedToken) => {
          this.setState({ hall: storedToken, Loaded_Hall: true })
        });

        AsyncStorage.getItem('token').then((storedToken) => {
          this.setState({ token: storedToken, Loaded_Token: true })
        });

        AsyncStorage.getItem('ticketData').then((ThisTicketData) => { // Promise won't be fulfilled if it doesn't exist
            this.setState({
               ticketData: ThisTicketData, Loaded_TicketData: true
            });
        });


        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({connectionStatus: isConnected});
        });

        const dispatchConnected = connectionObject => this.setState({connectionStatus: connectionObject.type});

        NetInfo.isConnected.fetch().then().done(() => {
            NetInfo.isConnected.addEventListener('connectionChange', dispatchConnected);
        });

        this.refreshTickets(false);
    }




    render() {

        if (!this.state.Loaded_TicketData
        || !this.state.Loaded_Token
        || !this.state.Loaded_Hall
        ) {
            return (
            <View><Text>Busy</Text>
            <ActivityIndicator /></View>
            )
        }
        else {
            const ConstantTicketData = JSON.parse(this.state.ticketData);
            console.log(ConstantTicketData)
            console.log(this.state.ticketData)
            console.log('What that the response you expected?')
            var ticketMessage;
            if (ConstantTicketData !== null) {
                ticketMessage = <Text style={{justifyContent:'center', textAlign:'center'}}>Your event tickets are below</Text>;
                var TheTicketList = [];
                for(let i=0;i<ConstantTicketData.length;i++) {
                    TheTicketList.push(<View key={ConstantTicketData[i].id}><Button color="#3d9970" title={ConstantTicketData[i].TextToShow} onPress={() =>
                        Actions.Ticket({ticketNumber: ConstantTicketData[i].TicketNumber, eventName: ConstantTicketData[i].EventName, eventDateTime: ConstantTicketData[i].EventDateTime})
                    }  /><Text>{"\n"}</Text></View>); // [] Could do this with map() and callback function instead.
                }
            }
            else {
                ticketMessage = <Text style={{justifyContent:'center', textAlign:'center'}}>You have no event tickets - please try updating your tickets below</Text>;
                var TheTicketList = <Text></Text>;
            }

            return (
                <View>
                {ticketMessage}
                <Text>{"\n"}</Text>
                {TheTicketList}
                <Text style={{padding:30, justifyContent:'center', textAlign:'center', color:'#FF0000', fontWeight: '900'}}>Slide down to refresh your tickets.</Text>
                <Text>{"\n"}</Text>
                </View>
            )

        }
    }
}
