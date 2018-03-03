let hall_data = AsyncStorage.getItem('hall');
let auth_data = AsyncStorage.getItem('token');

Promise.all([hall_data, auth_data]).then(data => {
  this.setState({ hall: data[0], Loaded_Hall: true , token: data[1], Loaded_Token: true  });
  console.log('Prepare to run....')
  get_request.bind(this)(true, 'Post', 'get');
  //get_post.bind(this)();
});



import {AsyncStorage} from 'react-native';


export function screen_init(callback) {
  let hall_data = AsyncStorage.getItem('hall');
  let auth_data = AsyncStorage.getItem('token');

  Promise.all([hall_data, auth_data]).then(data => {
    let user = { hall: data[0], token: data[1]}
    this.setState({user_params: user, user_params_set: true});
    console.log('Prepare to run....')
    return callback();
  });

}
