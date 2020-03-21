import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation } from 'react-native'
import * as firebase from 'firebase'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: -32,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
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
    }
})

export default class Login extends Component {
    static navigationOptions = {
        headerShown: false
    }

    state = {
        email: '',
        password: '',
        errorMessage: null
    }
    
    handleLogin = () => {
        const { email, password } = this.state

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => this.setState({errorMessage: err.message}))
    }
    
    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                {/* GREETING */}
                <StatusBar barStyle='light-content'/>
                <Image 
                    source={require('../assets/authHeader.png')} 
                    style={{marginTop: -176, marginLeft: -50}}
                />
                <Image 
                    source={require('../assets/authFooter.png')} 
                    style={{position:'absolute', bottom: -325, right: -225}}
                />

                <Image 
                    source={require('../assets/loginLogo.png')}
                    style={{marginTop:-110, alignSelf:'center'}}
                />
                <Text style={styles.greeting}>{'Hello again!\nWelcome back.'}</Text>


                {/* ERROR MESSAGE */}
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                {/* FORM */}
                <View style={styles.form}>
                    <View>
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
               
                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{color: '#FFF', fontWeight:'500'}}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Register')} 
                    style={{alignSelf:'center', marginTop:32}}
                >
                    <Text style={{color: '#414959', fontSize:13}}>
                        New to SocialApp? <Text style={{fontWeight:'500', color:'#E9446A'}}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>


            </View>

            
        )
    }
}

