import React from 'react';
import { ActivityIndicator,
AsyncStorage,
} from 'react-native';

import {Router, Scene} from 'react-native-router-flux';


import Login from './src/screens/Login.js';
import LoggedOn from './src/navigation_stacks/LoggedOn.js';
import Ticket from './src/screens/Ticket.js';
import TicketScanner from './src/screens/TicketScanner.js';
import ScannerModal from './src/screens/ScannerModal.js';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = { hasToken: false, isLoaded: false };
    }
    componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {
          this.setState({ hasToken: token !== null, isLoaded: true })
        });
    }
    render() {
        if (!this.state.isLoaded) {
          return (
            <ActivityIndicator />
          )
        } else {
            return (

              <Router>
                    <Scene key='root'>
                        <Scene
                        component={Login}
                        hideNavBar={true}
                        initial={true}
                        key='Login'
                        title='Login'
                        type='reset'
                        initial={!this.state.hasToken}
                        />
                        <Scene
                        component={LoggedOn}
                        hideNavBar={true}
                        key='LoggedOn'
                        title='Home Page'
                        type='reset'
                        initial={this.state.hasToken}
                        />

                        <Scene
                        component={Ticket}
                        hideNavBar={true}
                        key='Ticket'
                        title='Ticket'
                        />


                        <Scene
                        component={TicketScanner}
                        hideNavBar={false}
                        key='TicketScanner'
                        title='TicketScanner'
                        //type='reset'
                        />

                        <Scene key="TicketScannerModal" component={ScannerModal} hideNavBar={false} />
                    </Scene>
              </Router>
            );
        }
    }

}
