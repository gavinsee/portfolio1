import React from 'react';
import { StyleSheet, Text, View, Button,
ScrollView,
Alert, RefreshControl,
} from 'react-native';


import Logout from '../components/_Logout.js';
import TicketListing from '../components/_TicketListing.js';
import PushNotifications from '../components/_PushNotifications.js';
import EventListing from '../components/_EventListing.js';
import Header from '../template/_Header.js';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderingToggle: false,
        };
    }

    _rerender() {
        this.setState(function(currentState,props){
            return {renderingToggle: !currentState.renderingToggle}
        });
    }

    _onRefresh() {
        this.setState({renderingToggle: true});
        setTimeout(() => {
          this.setState({
            renderingToggle: false,
          });
        }, 1000);
    }

    EndRefreshProcess() {
        this.setState({renderingToggle: false});
    }

    render() {
        return (
            <View style={styles.fitting}>
                <PushNotifications />
                <View style={styles.container2}>
                    <Header refresh={this._onRefresh.bind(this)} />
                    <ScrollView refreshControl={
                        <RefreshControl
                        refreshing={this.state.renderingToggle}
                        onRefresh={this._onRefresh.bind(this)} />}>

                        <View style={styles.content}>
                            <TicketListing action={this.EndRefreshProcess.bind(this)} refreshToggle={this.state.renderingToggle} />

                            <EventListing />

                            <Logout />

                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    fitting: {
        flex: 1,
        backgroundColor: '#333333',
        paddingTop: 50,
    },
    container2: {
        backgroundColor: '#333333',
        justifyContent: 'center',
    },
    content: {
        marginTop: 40,
        backgroundColor: '#EEEEEE',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderTopWidth: 5,
        borderColor: '#3d9970',
    },
});
