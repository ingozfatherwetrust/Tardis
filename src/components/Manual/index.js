import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import TestJSON from '../../../server/manual/index';
import Entry from './Entry';

export default class Manual extends Component {
    state = {entries: []};
    componentWillMount() {
        fetch('http://localhost:3000/manual/index.json',{
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }
    )
    .then(response => {
        response.text()
        .then(
            res => {
                this.setState({entries: JSON.parse(res)})
            }
        );

    })

    }

    renderManual() {
        console.log(this.state.entries.length);
        if(this.state.entries !== []) {
            return this.state.entries.map(
                entry =>  <Entry key={entry.title} entry={entry}>{entry.title}</Entry>
            );
        } else {
            return (
                <Text>Hello World</Text>
            )
        }

    }
    render() {
        return(
            <ScrollView>
                {this.renderManual()}
            </ScrollView>
        )

    }

}

