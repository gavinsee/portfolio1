import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
        paddingBottom: 50,
    },
    heading: {
      fontSize: 24,
      fontWeight: "900",
      color: '#111111',
    },
    listingContainer: {
      flex:1,
      flexDirection:'column',
      justifyContent:'center'
    },
    listing: {
      padding: 15,
      borderWidth: 3,
      borderColor: '#3d9970',
      margin: 3,
      marginTop: 8,
      marginBottom: 8,
      backgroundColor: '#CCCCCC',
      flexDirection: 'row',
      flex: 0.8
    },
    center_view: {
      justifyContent: 'center',alignItems:'center',alignSelf:'center', height:100, width: 250, textAlign:'center', paddingTop: 10, paddingBottom: 10, marginTop: 90, marginBottom:90,
      borderWidth: 5,
      borderColor: '#3d9970',
      borderRadius: 10,
    },
    center_text: {
       textAlign:'center',
    }
});


export const stylesLogin = StyleSheet.create({

    scroll: {
        backgroundColor: '#E1D7D8',
        padding: 30,
        flexDirection: 'column',
    },

    label: {
        color: '#0d8898',
        fontSize: 20
    },
    alignRight: {
        alignSelf: 'flex-end'
    },
 textInput: {
    height: 50,
    fontSize: 30,
    backgroundColor: '#FFF',
    width: '100%',
    textAlign: 'center',
},
});


const stylesLoginScreen = StyleSheet.create({
    fitting: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333',
    },
    header: {

        color: '#ffffff',
        fontWeight: 'bold',
        fontSize:36,
    },
    stretch: {
        width: 90,
        height: 85,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#FF0000',
    },
    content: {
        marginTop: 40,
        backgroundColor: '#EEEEEE',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderTopWidth: 5,
        borderColor: '#3d9970',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 40,

    }
});

