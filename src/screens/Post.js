import React from 'react';
import { Text,View,} from 'react-native';
import {AsyncStorage} from 'react-native';
import Container from '../template/StandardScreen.js';

import {styles} from '../lib/styling.js'
import {get_request} from '../lib/get_request.js'
import {screen_init} from '../lib/screen_init.js'

// [] Todo : instead of have token, Loaded_token, hall, Loaded_Hall which are all long, i will put all of these inside a state var called "tempate" and then have a template_loaded var instead

export default class Post extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                  user_params: {},
                  user_params_set: false,

                  get_data: null,
                  Loaded_GetData: false,
      };
    };

    _rerender() {
        get_request.bind(this)(true, 'Post', 'get');
    }

    componentDidMount() {
        const this_page_function = get_request.bind(this, true, 'Post', 'get');
        let init = screen_init.bind(this)(this_page_function)
    }


    render() {
      if(this.state.user_params_set &
        this.state.Loaded_GetData) {
          let post_data = JSON.parse(this.state.get_data);
          post_data = post_data["post"];
          post_data = post_data.map((data,i) => {
            if(data.Collected==1) {
              data.Collected = "Collected";
            } else {
              data.Collected = "Not Collected";
            }
            if(data.Desc==null) {
              data.Desc = "No comments";
            }
            return data;
          })
          let listing_post_data_2 = post_data.map((data, i) => {
            return (<View key={i} style={styles.listing}><Text>{data.Date} {data.Collected} {data.Desc} {"\n"}</Text></View>);
          });


          return (
            <Container RefreshToggle={this._rerender.bind(this)}>
            <Text style={styles.heading}>Your Post</Text>
            <View style={styles.listingContainer}>
            {listing_post_data_2}
            </View>
            </Container>
        );
      }
      else {
        return (
            <Container RefreshToggle={this._rerender.bind(this)}>
              <Text style={styles.heading}>Your Post</Text>
              <Text>Loading...</Text>
            </Container>
        );
      }
    }
}
