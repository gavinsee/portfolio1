import React from 'react';
import { StyleSheet, Text, View, Button,
ScrollView,
Alert,
ActivityIndicator,
Picker, NetInfo, RefreshControl, TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


export default class RefreshButton extends React.Component {
    state = {touchableHighlightMouseDown: false,touchableHighlightMouseDownText: '#3d9970',
        };

    render() {

        return ( // START RETURN
                   <TouchableHighlight underlayColor="#333333" onPressIn={()=> {
                                                            this.setState({touchableHighlightMouseDown: false, touchableHighlightMouseDownText: '#8B0000'});
                                                }
                                        }
                                        onPressOut={()=> {

                                                            this.setState({touchableHighlightMouseDown: true, touchableHighlightMouseDownText: '#3d9970'});
                                                }
                                        }
                                        onPress={() =>
                                                    {
                                                        this.props.action();
                                                    }
                                                }>
                                            <Text style={{margin: 10, fontSize: 45, textAlign: 'right'}}>
                                                <FontAwesome name="refresh" size={45} style={{color: this.state.touchableHighlightMouseDownText}}   />
                                            </Text>
                                        </TouchableHighlight>
        ); // END RETURN
    }
}




const styles = StyleSheet.create({
    fitting: {
        flex: 1,
        //flexDirection: 'column',
        backgroundColor: '#333333',
        //alignItems: 'center',
        //justifyContent: 'flex-start',
        paddingTop: 50,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333',
        paddingLeft: 40,
    },
    container2: {
        //flexDirection: 'column',
        //alignItems: 'center',
        backgroundColor: '#333333',
        //flexDirection: 'row',
        justifyContent: 'center',
    },
    header: {

        color: '#ffffff',
        fontWeight: '500',
        fontSize:36,
    },
    stretch: {
        width: 90,
        height: 85,
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
        //borderColor: '#f56954',
        borderColor: '#3d9970',
    },

    ticket: {
        backgroundColor: '#333333',
        borderColor: '#3d9970',
        borderWidth: 5,
    }
});
