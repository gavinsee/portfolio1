import {AsyncStorage, NetInfo} from 'react-native';
import { Buffer } from 'buffer'


export const get_request = http_request.bind(this, 'Bearer', 'GET', null);
export const post_request = http_request.bind(this, 'Bearer', 'POST');
export const put_request = http_request.bind(this, 'Bearer', 'PUT');
export const patch_request = http_request.bind(this, 'Bearer', 'PATCH');
export const post_request_userpass = http_request.bind(this, 'Basic', 'POST');
export const get_request_no_auth = http_request.bind(this, false, 'GET', null);
export const get_request_basic = http_request.bind(this, 'Basic', 'GET', null);

export default async  function http_request(auth_scheme, request_method, request_body, component_action, controller, action, ConnectionMessage=false) {

    try {
      console.log('Function called properly');
      const connectionStatus = await NetInfo.getConnectionInfo().then((connectionInfo) => {
        if(connectionInfo.type != 'none' && connectionInfo.type != 'unknown')   return true;
        if(ConnectionMessage==true) Alert.alert("Please ensure you are connected to the internet");
        throw new Error('No internet connection')
        return false;
      });

      console.log('About to try running whilst watching exceptions');
      console.log('Running....')
      let api_url = 'https://hallsf.imperial.ac.uk/eHalls/0_api/' + controller + '/' + action;
      console.log(api_url);
      console.log('Did URL print okay?');

      console.log('Did request get Initialised?');

      let http_headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Hall-Abbr': this.state.user_params.hall // X = Experimental
      };

      if(auth_scheme && (auth_scheme.toLowerCase() === 'bearer')) {
        //let thisToken = await AsyncStorage.getItem('token'); // Or alternatively:
        thisToken = this.state.user_params.token;
        console.log('Did Token request get created?');
        http_headers.Authorization = auth_scheme.toLowerCase() + ' ' + Buffer.from(thisToken, 'ascii').toString('base64');
      }
      else if(auth_scheme && (auth_scheme.toLowerCase() === 'basic')) {
        console.log('Did Token request get created for userpass?');
        http_headers.Authorization = auth_scheme.toLowerCase() + ' ' + Buffer.from(this.state.user_params.username + ':' + this.state.user_params.password, 'ascii').toString('base64');
      }

      request_info = { method: request_method, headers: http_headers };
      if(request_method.toLowerCase() !== 'get') { request_info.body = JSON.stringify(request_body)   }

      let send_data_request = fetch(api_url, request_info);
      console.log('Did send promise get created?');

      console.log('About to retrieve...');
      let retrieved_data = send_data_request.then((response) => response.json());

      console.log('Promise for retrieval made.');
      retrieved_data.then(    (responseData) => {
        console.log('Promise success.');
        //this.setState({
        //    get_data: JSON.stringify(responseData), Loaded_GetData: true
        //});
        component_action(JSON.stringify(responseData), true)
        console.log(JSON.stringify(responseData));
      });
    } catch(e) {
      console.log('Error occurred: ' + e.name + ' ---> '+ e.message);
    }
};
