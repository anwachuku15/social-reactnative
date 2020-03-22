import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'

import Loading from './screens/Loading'
import Login from './screens/Login'
import Register from './screens/Register'

import Home from './screens/Home'
import Profile from './screens/Profile'
import Post from './screens/Post'
import Message from './screens/Message'
import Notification from './screens/Notification'



import config from './config'
import * as firebase from 'firebase'


// Initialize Firebase -- go back to figure out why !firebase.apps.length
if(!firebase.apps.length){
  firebase.initializeApp(config);
}

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: Home,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-home' size={24} color={tintColor}/>
          }
        },
        Message: {
          screen: Message,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-chatboxes' size={24} color={tintColor}/>
          }
        },
        Post: {
          screen: Post,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => 
              <Ionicons 
                name='ios-add-circle' 
                size={48} 
                color='#E9446A'
                // style={{shadowColor:'#E9446A', shadowOffset: {width:0, height: 0}, shadowRadius: 10, shadowOpacity: 0.3 }}
              />
          }
        },
        Notification: {
          screen: Notification,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-notifications' size={24} color={tintColor}/>
          }
        },
        Profile: {
          screen: Profile,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-person' size={24} color={tintColor}/>
          }
        },
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({navigation, defaultHandler}) => {
            if (navigation.state.key === 'Post') {
              navigation.navigate('postModal')
            } else {
              defaultHandler()
            }
          }
        },
        tabBarOptions: {
          activeTintColor: '#161F3D',
          inactiveTintColor: '#B8BBC4',
          showLabel: false
        }
      }
    ),
    postModal: {
      screen: Post
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    // initialRouteName: 'postModal'
  }
)

// const AppTabNavigator = 

// const AppStack = createStackNavigator({
//   Home: Home
// })

const AuthStack = createStackNavigator({
  
  Login: Login,
  Register: Register,
  
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: AppContainer,
      Auth: AuthStack
    }
  ),
  {
    initialRouteName: 'Loading'
  }
)