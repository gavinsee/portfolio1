import React from 'react';
import { Text,View,} from 'react-native';
import {AsyncStorage} from 'react-native';
import Container from '../template/StandardScreen.js';

import {styles} from '../lib/styling.js'


export default class About extends React.Component {
    render() {
        return (
          <Container RefreshToggle={() => false}>
            <Text style={styles.heading}>About</Text>
            <View style={styles.center_view}><Text style={styles.center_text}>Created and still being developed by Gavin, Lead Software Developer for eHalls, Imperial College London</Text>
            <Text style={styles.center_text}>www.gavinseegoolam.co.uk</Text></View>
          </Container>
        );
    }
}
