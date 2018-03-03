import React from 'react';
import {
AsyncStorage, Text, View
} from 'react-native';

import { DrawerNavigator } from 'react-navigation';


import Home from '../screens/Home.js';
import About from '../screens/About.js';
import Post from '../screens/Post.js';

import Header from '../template/_Header.js';


// https://github.com/react-community/react-navigation/issues/795 - bencodezen - has solution for hiding items from the drawer navigation menu

export default class LoggedOn extends React.Component {
    render() {
        return (

                <LoggedOnNav />
        );
    }
}


const LoggedOnNav = DrawerNavigator({
    Home: {
        screen: Home,
    },
    Post: {
        screen: Post,
    },
    About: {
        screen: About,
    },
});
