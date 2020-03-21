import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Loading from './screens/Loading'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'

import * as config from './config'
import * as firebase from 'firebase'


// Initialize Firebase -- go back to figure out why !firebase.apps.length
if(!firebase.apps.length){
  firebase.initializeApp(config);
}



const AppStack = createStackNavigator({
  Home: Home
})

const AuthStack = createStackNavigator({
  
  Login: Login,
  Register: Register,
  
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: AppStack,
      Auth: AuthStack
    }
  ),
  {
    initialRouteName: 'Loading'
  }
)