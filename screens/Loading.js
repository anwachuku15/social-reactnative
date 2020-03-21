import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'


export default class Loading extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth')
        })
    }

    render() {
        return (
            <View>
                <Text> Loading... </Text>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})