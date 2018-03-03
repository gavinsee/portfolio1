import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import {AsyncStorage} from 'react-native';


import { Permissions, Notifications } from 'expo'; // PUSH

export default class PushNotifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = { token: '', Loaded_Token: false,
            Pushnotification: {},Pushtoken: 'null',Pushmessage: 'null',
            hall: '', Loaded_Hall: false,
            };
    }


    /* --------------- START PUSH  ---------------*/
    async registerForPushNotificationsAsync() {
      const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return;
      }

      // Get the token that uniquely identifies this device
      let Pushtoken = await Notifications.getExpoPushTokenAsync();
      this.setState({Pushtoken: Pushtoken});

      // POST the token to our backend so we can use it to send pushes from there
      return fetch("https://hallsf.imperial.ac.uk/eHalls/0_app/updateUserToken.php", {
        method: 'POST', // RESTful API called, POST, PUT, GET, DELETE
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pushtoken: Pushtoken, hall: this.state.hall, token: this.state.token})
      });
    }

    componentDidMount() {
        this.registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }



    _handleNotification = (notification) => {
        // In future, push notifications will be added to the user's feed
        // []
    };
    /* --------------- END PUSH  ---------------*/

    componentWillMount() {
        AsyncStorage.getItem('token').then((storedToken) => {
          this.setState({ token: storedToken, Loaded_Token: true })
        });
        AsyncStorage.getItem('hall').then((storedToken) => {
          this.setState({ hall: storedToken, Loaded_Hall: true })
        });
    }



    // Will make this into a Push Notification feed component in the future
    // which is why it was implemented in this way
    render() {
        if (!this.state.Loaded_Token || !this.state.Loaded_Hall // Wait for the auth token to load
        ) {
            return (
            <ActivityIndicator />
            )
        }
        else {
            return (
                <Text></Text>
            );
        }
    }
}
