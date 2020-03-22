import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default class Notification extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Notification Screen </Text>
            </View>
        )
    }
}
