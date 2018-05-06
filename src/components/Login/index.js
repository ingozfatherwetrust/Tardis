/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import axios from 'axios';
// import fs from 'filestream/read';

type Props = {};

export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  checkLoginStatus() {

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
          Accept: 'text/plain'
      },
      body: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfaWQiOiJjbGllbnRfaWQiLCJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9.Apw1vCdXsn5pvle-jIsjvf5i-NOW2bGp3BfuPR-gZWc'

    })
    .then((res) => {
      // res = res.json();
      console.log(res);
      this.props.onLogin(true);
      // this.props.myJWT('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfaWQiOiJjbGllbnRfaWQiLCJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9.Apw1vCdXsn5pvle-jIsjvf5i-NOW2bGp3BfuPR-gZWc')
      res.text()
          .then(res2 => this.props.myJWT(res2))
    })
    .catch((err) => {
      console.log(err);
      this.props.onLogin(false);
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('./img/tardis.png')} />
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.textField}
            placeholder={'username'}
            onChangeText={(text) => {this.setState((previous) => ({...previous, username: text}))}}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.textField}
            placeholder={'password'}
            onChangeText={(text) => {this.setState((previous) => ({...previous, password: text}))}}
            secureTextEntry
          />
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => {this.checkLoginStatus()}}
            disabled={false}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  disabledSubmit: {
    alignItems: 'center',
    backgroundColor: '#b9ccee',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  image: {
    height: 240,
    marginBottom: 44,
    marginTop: 60,
    resizeMode: Image.resizeMode.contain,
    width: 240,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  submit: {
    alignItems: 'center',
    backgroundColor: '#5e81bc',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  text: {
    color: 'white'
  },
  textField: {
    borderColor: 'black',
    borderWidth: 0.5,
    flex: 1,
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
    padding: 10,
  },
});
