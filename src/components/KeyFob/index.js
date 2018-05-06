/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} from 'react-native';

type Props = {keyFobJWT: string};

export default class KeyFob extends Component<Props> {
  state = {vehicleLocked: null};
  changeLockedStatus(lockVal: string) {
      // alert(this.props.keyFobJWT);
      fetch('http://localhost:3000/keyfob', {
          method: 'POST',
          headers: {
            'Authorization': 'access_token',
            'Content-Type': 'application/json'
              // 'Authorization': 'Basic ' + this.props.keyFobJWT
          },
          body: JSON.stringify({
            type: lockVal
          })

      })
      .then((res) => {
        if(res.status === 200) {
          alert('Your vehicle is ' + lockVal.toLowerCase() + 'ed');
        } else {
          alert('Your unlock failed');
        }
        console.log(res);
        console.log(res.text());
      })
      .catch((err) => {
        alert('your unlock failed');
        console.log(err);
        console.log(err.text());
      })
  }
  render() {
    return (
      <View style={styles.container}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {this.changeLockedStatus('LOCK')}}
            disabled={false}
            underlayColor={'#b9ccee'}>
            <Image
              style={styles.image}
              source={require('./img/lock.png')} />
          </TouchableHighlight>
          <View style={{ height: 88 }} />
          <TouchableHighlight
            style={styles.button}
            onPress={() => {this.changeLockedStatus('UNLOCK')}}
            disabled={false}
            underlayColor={'#b9ccee'}>
            <Image
              style={styles.image}
              source={require('./img/unlock.png')} />
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 4,
    borderColor: '#27467f',
    borderRadius: 100,
    height: 100,
    justifyContent: 'center',
    padding: 8,
    width: 100,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f5Fcff',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    tintColor: '#5e81bc'
  }
});
