import React from 'react';
import { StyleSheet, Text, View, Button,
TextInput,
Alert, NetInfo, ActivityIndicator, Picker} from 'react-native';
import {AsyncStorage} from 'react-native';

export default class ListOfHalls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    connectionStatus: false,
                    HallsData: '',
                    Loaded_HallsData: false,
                    selectedHall: 'Wilson House',
                    selectedIndex: 4, // Because Wilson House is the best
                };
    }

    componentDidMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
          this.setState({connectionStatus: isConnected});
        });

        const dispatchConnected = isConnected => this.setState({connectionStatus: isConnected});

        NetInfo.isConnected.fetch().then().done(() => {
            NetInfo.isConnected.addEventListener('change', dispatchConnected);
        });


        this.getHalls();
    }

    async saveItem(item, selectedValue) {
        try {
              await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
              console.error('AsyncStorage error: ' + error.message);
        }
    }

    async getHalls()  {
        try {
            fetch('https://hallsf.imperial.ac.uk/eHalls/0_app/getListOfHalls.php', {
            method: 'POST',
            headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
                   },
            body: JSON.stringify({GetArgumentHere: 'GetArgumentValueHere'})
            })
            .then(    (response) => response.json()     )
            .then(    (responseData) => {
                console.log("response from 'get halls' api: " + responseData.process);
                ThisHallsData = responseData.HallsData;
                this.setState({HallsData: JSON.stringify(ThisHallsData), Loaded_HallsData: true});
            })
            .catch((err) => { console.log(err); })

        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }



    PickerFunctionForUpdate(itemValue, itemIndex) {
        this.setState({selectedHall: itemValue, selectedIndex: itemIndex});

        ThisHallsDataMain = JSON.parse(this.state.HallsData);
        for(var i=0;i<ThisHallsDataMain.length;i++) {
            if(ThisHallsDataMain[i].HallName == itemValue) {
                this.props.updateSelectedHall(ThisHallsDataMain[i].HallAbbreviation);
                break; // Don't frown!
            }
        }

    }

    render() {
        if(!this.state.Loaded_HallsData) { // Invoked when user loads app without an internet connection
            return (
                <View>
                    <View>
                        <Text> Retrieving List of Imperial College Halls </Text>
                    </View>
                    <View>
                                <Button
                                    title="Click to here to retrieve!"
                                    onPress={  () => {
                                        this.getHalls()
                                        } }
                                />
                    </View>
                </View>
            );
        }
        else {
            ThisHallsDataMain = JSON.parse(this.state.HallsData);
            var HallsPickerItems = [];
            for(var i=0;i<ThisHallsDataMain.length;i++) {
                var uniqueValueID = ThisHallsDataMain[i].id;
                HallsPickerItems.push(<Picker.Item key={ThisHallsDataMain[i].id} label={ThisHallsDataMain[i].HallName} value={ThisHallsDataMain[i].HallName} />);
            } // Use map() next time

            return (
                <View>
                <Picker style={styles.picker}
                  selectedValue={this.state.selectedHall}
                  onValueChange={(itemValue, itemIndex) =>
                                    this.PickerFunctionForUpdate(itemValue, itemIndex)
                                }>
                {HallsPickerItems}
                </Picker>
                </View>
            );
        }
    }
}

var styles = StyleSheet.create({
  picker: {
    width: 300,
  },
});
