import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Loading from './screens/Loading'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'

import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCH2ZZ37WAZmH4WMiZLreRdI7DGomWyowE",
  authDomain: "social-reactnative.firebaseapp.com",
  databaseURL: "https://social-reactnative.firebaseio.com",
  projectId: "social-reactnative",
  storageBucket: "social-reactnative.appspot.com",
  messagingSenderId: "577927858292",
  appId: "1:577927858292:web:6196bddee66b3d4393a921",
  measurementId: "G-078XY3CM9R"
};
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