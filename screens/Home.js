import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginHorizontal: 50,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
})

export default class Home extends Component {
    state = {
        email: '',
        displayName: '',
    }

    componentDidMount() {
        const {email, displayName} = firebase.auth().currentUser

        this.setState({
            email: email,
            displayName: displayName
        })
    }

    signOutUser = () => {
        firebase
            .auth()
            .signOut()
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={{marginBottom:32}}> Hi {this.state.displayName}! </Text>
                <TouchableOpacity style={styles.button} onPress={this.signOutUser}>
                    <Text style={{color: '#FFF', fontWeight:'500', marginHorizontal:50}}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

