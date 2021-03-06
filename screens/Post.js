import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import Fire from '../Fire'

const firebase = require('firebase')
require('firebase/firestore')

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB'
    },
    inputContainer:{
        margin: 32,
        flexDirection: 'row',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32,
    }
})

export default class Post extends Component {
    state = {
        text: '',
        image: null
    }

    componentDidMount() {
        this.getPhotoPermission()
    }

    getPhotoPermission = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if (status != 'granted') {
                alert('We need permission to access your camera roll')
            }
        }
    }

    handlePost = () => {
        Fire.shared
            .addPost({text: this.state.text.trim(), localUri: this.state.image})
            .then(ref => {
                this.setState({text: '', image: null})
                this.props.navigation.goBack()
            })
            .catch(err => {
                alert(err)
            })
    }
    
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })

        if (!result.cancelled) {
            this.setState({ image: result.uri })
        }
    }

    

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name='md-arrow-back' size={24} color='black'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{fontWeight:'500'}}>Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image source={require('../assets/chukuyellow.jpg')} style={styles.avatar}/>
                    <TextInput 
                        autoFocus={true}    
                        multiline={true} 
                        numberOfLines={4} 
                        style={{flex:1}} 
                        placeholder={'What\'s happening?'}
                        onChangeText={text => this.setState({text})}
                        value={this.state.text}
                    />
                </View>

                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Ionicons name='md-camera' size={32} color='#D8D9DB'/>
                </TouchableOpacity>

                <View style={{marginHorizontal:32, marginTop:32, height:150}}>
                    <Image source={{uri: this.state.image}} style={{width:'100%', height:'100%'}}/>
                </View>
            </SafeAreaView>
        )
    }
}
