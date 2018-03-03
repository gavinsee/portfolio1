import React from 'react';
import { View,
        ScrollView, RefreshControl, Text
} from 'react-native';


import Header from '../template/_Header.js';
import {styles} from '../lib/styling.js'

export default class Container extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        renderingToggle: false,
      };
    };


    _onRefresh() {
        this.setState({renderingToggle: true});
        this.props.RefreshToggle();
        setTimeout(() => {
          this.setState({
            renderingToggle: false,
          });
        }, 1000);
    }



    render() {
      return (
        <View style={styles.fitting}>
            <View style={styles.container2}>
            <Header refresh={this._onRefresh.bind(this)} />
            <ScrollView refreshControl={
                <RefreshControl
                refreshing={this.state.renderingToggle}
                onRefresh={this._onRefresh.bind(this)} />}>

                <View style={styles.content}>
                    {this.props.children}
                </View></ScrollView>
            </View>
        </View>
    );
  }
}
