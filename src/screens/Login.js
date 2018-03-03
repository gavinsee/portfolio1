import React from 'react';
import { Text, View, Button,
TextInput,
ScrollView,
Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';

import {get_request_basic} from '../lib/request.js'

import {stylesLoginScreen as styles, stylesLogin} from '../lib/styling.js'
import saveItem from '../lib/storage.js';

import Label from '../components/_Label.js';
import ListOfHalls from '../components/_ListOfHalls.js';

export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = { myusername: '', mypassword: '', usertype: false, connectionStatus: false, hall: "Wi", user_params: {},
      response_data:null, Loaded_ResponseData: null};
    }
    checkAuthDetailsV2 = (username, password) => {
      if(username=="" || password=="") {
        Alert.alert("Please enter a username or password");
      }
      else {
        this.setState({user_params: {username: username, password: password, hall: hall}})
        get_request_basic.bind(this)(standard_response_cache.bind(this), 'Student', 'login', true);
      }
    }

    standard_response_cache(data, state_var) {
      if(data['login'] === true) {
          saveItem('username', data['username'], 'token', data['token'], 'forename', data['forename'], 'usertype', data['usertype'], 'ticketData', 'null', 'hall', data['hall']);
          Actions.LoggedOn({cameFromLogin: 'true'});
      }
      else {
          Alert.alert("Username/Password not found for this hall")
      }
    }

    updateSelectedHall(selectedHall) {
      this.setState({hall: selectedHall});
    }

    render() {

            return (
                <View style={styles.fitting}>
                    <View style={styles.container}>
                        <Text style={styles.header}>eHalls</Text>
                    </View>
                    <ScrollView style={{width: '100%', flex: 1, flexDirection: 'column',}}>
                        <View style={styles.content}>
                            <Label text="Imperial College Username (e.g. abc12)" />
                            <TextInput
                                style={stylesLogin.textInput}
                                value={this.state.myusername}
                                onChangeText={myusername => this.setState({myusername})}
                            />
                            <Text>{"\n"}</Text>
                            <Label text="Password" />
                            <TextInput
                                secureTextEntry={true}
                                style={stylesLogin.textInput}
                                value={this.state.mypassword}
                                onChangeText={mypassword => this.setState({mypassword})}
                            />
                            <Text>{"\n"}</Text>
                            <ListOfHalls updateSelectedHall={this.updateSelectedHall.bind(this)} />
                            <Text>{"\n"}</Text>

                            <Button
                                title="Login"
                                styles={{button: stylesLogin.alignRight, label: stylesLogin.label}}
                                onPress={  () => {
                                    this.checkAuthDetailsV2(this.state.myusername, this.state.mypassword)
                                    } }
                            />
                        </View>
                    </ScrollView>
                </View>
        );
    }
}








