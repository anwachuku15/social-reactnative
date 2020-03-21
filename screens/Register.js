import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as firebase from 'firebase'


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#FFF'
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
    button: {
        marginHorizontal: 50,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        position: 'absolute',
        top: 58,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(21, 22, 48, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'gray',
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default class Register extends Component {
    static navigationOptions = {
        headerShown: false
    }
    state = {
        name: '',
        email: '',
        password: '',
        errorMessage: null
    }
    
    handleSignup = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                })
            })
            .catch(err => this.setState({errorMessage: err.message}))
    }
    
    render() {
        return (
            <View style={styles.container}>
                {/* GREETING */}
                <StatusBar barStyle ='light-content'/>
                <Image 
                    source={require('../assets/authHeader.png')} 
                    style={{marginTop:-116, marginLeft:-50}}
                />
                <Image 
                    source={require('../assets/authFooter.png')} 
                    style={{position:'absolute', bottom:-325, right:-225}}
                />
                
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name='ios-arrow-round-back' size={32} color='#FFF'/>
                </TouchableOpacity>

                <View style={{position:'absolute', top:64, alignItems:'center', width:'100%'}}>
                    <Text style={styles.greeting}>{'Hello!\nSign up to get started.'}</Text>
                    <TouchableOpacity style={styles.avatar}>
                        <Ionicons 
                            name='ios-add' 
                            size={40} 
                            color='#FFF' 
                            style={{marginTop:6, marginLeft:2}}
                        />
                    </TouchableOpacity>
                </View>

                

                {/* ERROR MESSAGE */}
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                {/* FORM */}
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize='none'
                            onChangeText={name => this.setState({ name: name})}
                            value={this.state.name}
                        />
                    </View>

                    <View style={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize='none'
                            onChangeText={email => this.setState({ email: email})}
                            value={this.state.email}
                        />
                    </View>

                    <View style={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                            style={styles.input} 
                            secureTextEntry 
                            autoCapitalize='none'
                            onChangeText={password => this.setState({ password: password})}
                            value={this.state.password}
                        />
                    </View>

                </View>
               
                <TouchableOpacity 
                    style={styles.button}
                    onPress={this.handleSignup}>
                    <Text style={{color: '#FFF', fontWeight:'500'}}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{alignSelf:'center', marginTop:32}}
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <Text style={{color: '#414959', fontSize:13}}>
                        Already on SocialApp? <Text style={{fontWeight:'500', color:'#E9446A'}}>Log In</Text>
                    </Text>
                </TouchableOpacity>


            </View>

            
        )
    }
}

