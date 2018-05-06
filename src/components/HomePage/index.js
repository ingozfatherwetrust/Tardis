import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import KeyFob from "../KeyFob";

export default class HomePage extends Component {
    state = {mode: 'HOME'};
    changeMode(navVal) {
        this.setState({mode: navVal})
    }
    ChooseMode() {
        if( this.state.mode === 'HOME') {
            return(
                <View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {this.changeMode('LOCKING')}}
                        disabled={false}>
                        <Text style={styles.text}>Vehicle Commands</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {this.changeMode('MANUAL')}}
                        disabled={false}>
                        <Text style={styles.text}>Manual</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else if(this.state.mode === 'LOCKING'){
            return(
                    <KeyFob />
            )
        } else {
            alert(this.state.mode);
        }
    }
    render() {
        return(
            <View style={styles.container}>
                {this.ChooseMode()}
            </View>
        )

    }

}
const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#5e81bc',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1
    },
    container: {
        // alignItems: 'center',
        // backgroundColor: '#f5Fcff',
        flex: 1,
        marginTop: 50
        // justifyContent: 'flex-start',
        // // marginLeft: ,
        // // marginRight: 5,
        // flexDirection: 'column',
        // position: 'relative'
    }
});
