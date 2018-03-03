import {AsyncStorage} from 'react-native';
import { Buffer } from 'buffer'

import {http_request } from './request.js';

//export const get_request = http_request('Bearer', 'GET', null);
//export async  function http_request(auth_scheme, request_method, request_body, component_action, controller, action, ConnectionMessage=false) {

export async function get_request (ConnectionMessage, Controller, Action, TurnOffAuth=false) {
  return http_request.bind(this)('Bearer', 'GET', null, standard_get_action.bind(this), Controller, Action);
};

function standard_get_action(data, state_var) {
  this.setState({get_data: data, Loaded_GetData: true});
}

export async  function get_request_oldspec(ConnectionMessage, Controller, Action, TurnOffAuth=false) {
    console.log('Function called properly')
    //if((ConnectionMessage==true) && (this.state.connectionStatus==false)) {
    //    Alert.alert("Please ensure you are connected to the internet");
    //}
    console.log('About to try running whilst watching exceptions');
    try {
      console.log('Running....')
      let api_url = 'https://hallsf.imperial.ac.uk/eHalls/0_api/' + Controller + '/' + Action;
      console.log(api_url);
      console.log('Did URL print okay?');
      let send_data_request;
      console.log('Did request get Initialised?');
      if(TurnOffAuth == false) {
        let get_token = AsyncStorage.getItem('token');
        console.log('Did Token request get created?');
        send_data_request = get_token.then(   (thisToken) => {
              return fetch(api_url, {
              method: 'GET',
              headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + Buffer.from(thisToken, 'ascii').toString('base64')
                     },
              //body: JSON.stringify({token: thisToken, hall: this.state.hall})
            });
            console.log('Did send promise get created?');
        }); // returns another promise
      }
      else {
        send_data_request = fetch(api_url, {
              method: 'GET',
              headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                     },
              body: JSON.stringify({hall: this.state.hall})
        }); // another promise
      }
      console.log('About to retrieve...');
      let retrieved_data = send_data_request.then((response) => response.json()); // NB: the 'return' is built into this arrow function ECMA6 notation

      console.log('Promise for retrieval made.');
      retrieved_data.then(    (responseData) => {
        console.log('Promise success.');
        this.setState({
            get_data: JSON.stringify(responseData), Loaded_GetData: true
        });
        console.log(json.stringify(responseData));
        return true;
      }).catch((err) => { console.log(err); return false; })
    } catch (error) {
        console.log('Some error: ' + error.message);
        return false
    }
};
