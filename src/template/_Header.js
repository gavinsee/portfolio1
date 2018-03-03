import React from 'react';
import { StyleSheet, Text, View, AsyncStorage} from 'react-native';


import RefreshButton from './_RefreshButton.js';

export default class Header extends React.Component {
    state = { forename: '', isLoadedForename: false };

    componentDidMount() {

        AsyncStorage.getItem('forename').then((storedForename) => {
          this.setState({ forename: storedForename, isLoadedForename: true })
        });
    }

    render() {
        return (
                <View style={{flexDirection:"row"}}>
                    <View style={{flex: 1,paddingLeft:15}}>
                        <View>
                            <Text style={styles.header}>eHalls</Text>
                        </View>
                        <View>
                        {this.state.isLoadedForename && <Text style={{color:'white',fontWeight:'bold'}}>Hello {this.state.forename}!</Text>}
                        </View>
                    </View>
                    <View  style={{flex: 1,paddingRight: 10}}>
                        <RefreshButton action={this.props.refresh} />
                    </View>
                </View>

        );
    }
}




const styles = StyleSheet.create({
    header: {

        color: '#ffffff',
        fontWeight: '500',
        fontSize:36,
    },

});
