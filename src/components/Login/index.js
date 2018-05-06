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
import sha256 from 'crypto-js/sha256';
import hmacSha512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';


type Props = {};

export default class Login extends Component<Props> {
  CryptoJS = require('crypto-js');
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }
  header = {
      'typ': 'JWT',
      'alg': 'HS256'
  };
  // message = {
  //       "client_id": "client_id",
  //       "username": "username",
  //       "password": "password"
  //   };
    client_secret = 'client_secret';
  base64url(source) {
      // Encode in classical base64
      let encodedSource = this.CryptoJS.enc.Base64.stringify(source);

      // Remove padding equal characters
      encodedSource = encodedSource.replace(/=+$/, '');

      // Replace characters according to base64url specifications
      encodedSource = encodedSource.replace(/\+/g, '-');
      encodedSource = encodedSource.replace(/\//g, '_');

      return encodedSource;
  }
  checkLoginStatus() {
  // const hashDigest = sha256(this.message);
  // const hmacDigest = Base64.stringify(hmacSha512(hashDigest, this.client_secret));
  // console.log(hashDigest);
  // console.log(hmacDigest);
  //     var CryptoJS = require('crypto-js');crypto-js
      let message = {
          "client_id": "client_id",
          "username": this.state.username,
          "password": this.state.password
      };
      let jwt;
      let stringifiedHeader = this.CryptoJS.enc.Utf8.parse(JSON.stringify(this.header));
      let encodedHeader = this.base64url(stringifiedHeader);

      let stringifiedData = this.CryptoJS.enc.Utf8.parse(JSON.stringify(message));
      let encodedData = this.base64url(stringifiedData);
      // console.log(encodedData);

      let signature = encodedHeader + "." + encodedData;
      signature = this.CryptoJS.HmacSHA256(signature, this.client_secret);
      signature = this.base64url(signature);
      // console.log(signature);
      jwt = encodedHeader + '.' + encodedData + '.' + signature;

      fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
          Accept: 'text/plain'
      },
      // body: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfaWQiOiJjbGllbnRfaWQiLCJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9.Apw1vCdXsn5pvle-jIsjvf5i-NOW2bGp3BfuPR-gZWc'
      body: jwt
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
