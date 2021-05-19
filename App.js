import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList,  StyleSheet, Text,  View} from 'react-native';
import AddUpdate from  './components/AddUpdate';
//import PostScreen from  './components/PostScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';
import * as Application from 'expo-application';



 export default function App() {

 /*  var firebaseConfig = {
    apiKey: "AIzaSyAD_16iFs_HeS07BrP6sMcLAZruWamI7GI",
    authDomain: "mcmaster-updates.firebaseapp.com",
    databaseURL: "https://mcmaster-updates-default-rtdb.firebaseio.com",
    projectId: "mcmaster-updates",
    storageBucket: "mcmaster-updates.appspot.com",
    messagingSenderId: "827995735804",
    appId: "1:827995735804:web:9f0367979460d63a153979",
    measurementId: "G-BN32XPXSPD"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  if (!firebase.apps.length) {
    firebase.initializeApp({});
 }else {
    firebase.app(); // if already initialized, use that one
 } */


  return (
    <View style={styles.container}>

      <AddUpdate/>
       
      </View>
    
  );
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  //  paddingTop:30, 
  },

 
});
