import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Modal,TextInput, FlatList} from 'react-native';
import { ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Ionicons, FontAwesome } from 'react-native-vector-icons';


//var Button = require('react-native-icon-button');

function Mosaic({navigation}) {
    return(

    <View style={styles.container}>
      <TouchableOpacity 
      style={styles.BalanceButton}
      onPress={() => navigation.navigate("login")} 
      //icon="camera" 
      >
      </TouchableOpacity>

     {/*  <Button icon="camera" mode="contained">
   Press me 
  </Button> */}
  
      <TouchableOpacity
      style={styles.gradesButton}
      />

      <TouchableOpacity
      style={styles.examScheduleButton}
      />

      <TouchableOpacity
      style={styles.contactsButton}
      />
    
     
    </View>
    
    );
    
    }
    
    const styles = StyleSheet.create({
        container: {
          flex:1,
          flexDirection:'row',
          justifyContent: 'space-between',
          alignContent:'space-around',
          flexWrap:"wrap",
          
        },



        BalanceButton: {
            height:10,
            width:10,
            marginLeft:20,
            padding:80,
            backgroundColor:'#8B0000',
            borderRadius:15,
        
          },
        
          gradesButton: {
            height:10,
            width:10,
            marginRight:20,
            padding:80,
            backgroundColor:'#8B0000',
            borderRadius:15,
        
          },

          contactsButton: {
            height:10,
            width:10,
            marginRight:20,
            padding:80,
            backgroundColor:'#8B0000',
            borderRadius:15,
        
          },

          examScheduleButton: {
            height:10,
            width:10,
            marginLeft:20,
            padding:80,
            backgroundColor:'#8B0000',
            borderRadius:15,
       
          
          },
        


    });







export default Mosaic;