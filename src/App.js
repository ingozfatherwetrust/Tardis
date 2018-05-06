/**
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import KeyFob from './components/KeyFob';

type Props = {};


export default class App extends Component<Props> {
  state = {loggedIn: false, jwt: ''};

  handleLogin = (val) => {
    this.setState({loggedIn: val});
  };
  setJWT = (jwtVal) => {
    this.setState({jwt: jwtVal});
  };
  pickPage() {
    if(this.state.loggedIn) {
      return(
          <KeyFob keyFobJWT={this.state.jwt}/>
      )
    } else {
      return(
          <Login onLogin={this.handleLogin} myJWT={this.setJWT}/>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {/*<Login onLogin={this.handleLogin}/>*/}
          {this.pickPage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
