// Logout Button
import React from 'react';
import { StyleSheet, Text, View, Button,
ActivityIndicator,
NetInfo,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';


export default class Logout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {token: '',isLoadedToken: false,  connectionStatus: false };
    }
    async userLogout() {
        try {
          AsyncStorage.getItem('token').then((thisToken) => {
            this.setState({token:  thisToken } );
            // For RESTful API, next time, use DELETE request!!
            fetch('https://hallsf.imperial.ac.uk/eHalls/0_app/removeToken.php', {
              method: 'POST',
              headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                       },
              body: JSON.stringify({token: this.state.token})
            })
            .then(    (response) => response.json()     )
            .then(    (responseData) => {
                // In future log the logout time in app memory to display to the user at the login screen
            })
            .catch((err) => { console.log(err); }); // END FETCH

          });
          // DELETE ALL STORED COOKIES!
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('usertype');
          await AsyncStorage.removeItem('ticketData');
          await AsyncStorage.removeItem('forename');
          await AsyncStorage.removeItem('hall');
          //Alert.alert('Logout Success!');
          Actions.Login();
        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
    }



    componentDidMount() {

        AsyncStorage.getItem('token').then((storedToken) => {
          this.setState({ token: storedToken, isLoadedToken: true })
        });


        NetInfo.isConnected.fetch().then(isConnected => {
          this.setState({connectionStatus: isConnected});
        });

        const dispatchConnected = isConnected => this.setState({connectionStatus: isConnected});

        NetInfo.isConnected.fetch().then().done(() => {
            NetInfo.isConnected.addEventListener('change', dispatchConnected);
        });
    }

    render() {
        if (!this.state.isLoadedToken) {
            return (
            <ActivityIndicator />
            )
        }
        else {
            return(
                <View>
                        <Text>{"\n"}</Text>
                        <Text>{"\n"}</Text>
                        <Button
                            title="Logout"
                            onPress={() =>
                              this.userLogout()
                            }
                        />
                        <Text>{"\n"}</Text>
                        <Text>{"\n"}</Text>
                        <Text>{"\n"}</Text>
                </View>
            );
        }
    }
}
