import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Modal,TextInput, FlatList, Button } from 'react-native';
import { SafeAreaView, Image, Timestamp } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { color } from 'react-native-reanimated';
import Mosaic from  './Mosaic';
import * as firebase from 'firebase';

  var firebaseConfig = {
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
 }

const Stack = createStackNavigator();

function DetailsScreen({route}) {
  return(
<View style={{flex:1}}>
   <Text style={styles.content1}>{route.params.newPost}</Text>  
 
</View>

  );
}

function Login({navigation,route}) {

const [macID, setMacID] = useState('')
const [password, setPassword] = useState('')


function check() {
if(macID == "arshaa13@mcmaster.ca" && password == "123"){
 
  navigation.navigate("Main",
  {screen:'Home',
  params: { macID : macID},

})
} else if (macID=="arshaa13" && password == "1234") {
  navigation.navigate("Main")
}

else
 alert("Invalid Username or Password")
}


return(
<View style={{backgroundColor:"#DCDCDC", flex:1}}>
<Image source={require('./mcmasterlogo.png')}
style={{ 
  width: 330, 
  height: 180, 
  top:70,
  marginLeft:30,
  }} /> 
<TextInput 
       placeholder="macID@mcmaster.ca"
       style={styles.user}
       onChangeText={(val) => setMacID(val)}
       value={macID}
       maxLength={30}
    />

<TextInput
       placeholder="password"
       style={styles.user}
       onChangeText={(val) => setPassword(val)}
       value={password}
    />

<TouchableOpacity
style={styles.loginButton}
onPress={() => check()}
>
  <Text style={styles.loginText}>Login</Text>
</TouchableOpacity>
</View>



);

}

const AddUpdate = ({navigation,route}) => {
  const [posts,setPosts] = useState('')
  const [modal,setModal] = useState(false)
  const [array,setArray] = useState([])
  const [id,setId] = useState(0)
  const [currentDate, setCurrentDate] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  

/* 
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []); */

  /* send = (posts) =>{
    firebase.database().ref().push({posts}); 
    setPosts('')
    setModal(false)
    } */

   function send(posts) {
      firebase.database().ref().push({posts}); 
      setPosts('')
      setModal(false)
      }

  useEffect(() => {
      firebase.database().ref().on('value', (snapshot) =>{
        var update = []
        snapshot.forEach((child)=>{
         update.push({
          key: child.key,
          posts:child.val().posts
        })
      })
    setArray(update)
    })
   }, []); 

   


  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    
    setCurrentDate(
      date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min
    );

  }, []);

  const AddToArray = () => {
    setArray(array =>[...array,posts])
    setId(id + 1)
    alert(array + id)
    setModal(false)

  }

 var user =route.params?.macID

  return (
   <View>

<View style = {styles.header}/>
    <View style= {{backgroundColor:'#fff'}}/>
      <Text style={styles.title}> McMaster Updates</Text>
      <StatusBar style="auto" />

{user=="arshaa13@mcmaster.ca"?
   <TouchableOpacity style = {styles.button} 
    onPress={() => setModal(true)} >
   <Text style = {styles.subTitle} >Create Post</Text>
  </TouchableOpacity>
  :null
}


    <Modal 
    animationType='slide'
    visible={modal}
    >
    <View>
    <View style={styles.modalHeader}/>
    <TextInput
       multiline 
       placeholder="Write your message"
       style={styles.content}
       onChangeText={(val) => setPosts(val)}
       value={posts}
       maxLength={300}
    />
    <TouchableOpacity style = {styles.sendButton} 
    //onPress={() => setModal(false)} 
    onPress = {() => send(posts)} 
    
    >
  <Text style = {styles.sendTitle}>Post</Text>
  </TouchableOpacity>
    </View>
    </Modal>
   
 <SafeAreaView style={styles.container1}>
 <FlatList
  data={array}
  keyExtractor={(item)=>item.key}
  //refreshing={refreshing} 
  //onRefresh={onRefresh}
  renderItem={({item}) => ( 
  <TouchableOpacity
  style={styles.postText}
  //maxLength={5}
  onPress={() => navigation.navigate('Details',{newPost: item.posts})}
  > 
   <Text style={styles.item}>{item.posts} + {}</Text>
   </TouchableOpacity>
 )}
 
 />
    </SafeAreaView>

{/* 
 {array.map((item,key) => (  
      <Text key={key} style={styles.postText}>{}</Text>
    
    ))}   */}
  




</View>

  );
}

function UpdateApp() {

  return (
  <NavigationContainer style={{flex:1}}>
  <Stack.Navigator initialRouteName="login" >
  <Stack.Screen name="login" component={Login} 
    options={{headerShown:false}}/>
    <Stack.Screen name="Main" component={Tabs} 
    options={{headerShown:false}}/>
    <Stack.Screen name="Details" component={DetailsScreen} 
    options={{headerStyle: {
            backgroundColor: '#8B0000',
          },
          
          headerTitleStyle: {
            color:'white',
          }
          
          }}

    />
  </Stack.Navigator>
  
</NavigationContainer>


  );
}


const Tab = createBottomTabNavigator();
    
function Tabs() {
  return (
<Tab.Navigator 

tabBarOptions={{
  style:{backgroundColor:'#8B0000'},

}}
 >
    <Tab.Screen name = "Home" component={AddUpdate} 
    options={{
       tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />   
          ),

          tabBarLabel: "Home",
          
          
          }}

          
     />
    <Tab.Screen name = "Mosaic" component={Mosaic} 
      options={{ tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          
          }}
    />

</Tab.Navigator>


  );
}


const styles = StyleSheet.create({
 
  button: {
    flex:1,
    elevation:8,
    //position:'absolute',
    margin: 5,
    top:-56,
    alignItems:'center',
    padding:35,
    backgroundColor:'#BEBEBE',
    borderRadius:10,
    
  },

  container1: {
    flexGrow: 1,
    top:-60,
    height:433,
    marginTop:2,
    },

  sendButton: {
    elevation:8,
    position:'absolute',
    top:20,
    right:10,
    left:200,
    alignItems:'center',
    padding:9,
    backgroundColor:'#8B0000',
    borderRadius:5,
    
  },

  subTitle: {
    fontSize:30, 
    color: 'white',
    //marginLeft:-150,
    alignItems:'center',
    marginVertical:-20,

  },

  sendTitle: {
    fontSize:20, 
    color: 'white',
    justifyContent:'center',

  },

  content: {
    flex:1,
    position:'absolute',
    fontSize:25,
    color:'black',
    top:130,
    right:20,
    left:20,
  
  },

  content1: {
    flex:1,
    position:'absolute',
    fontSize:25,
    color:'black',
    top:30,
    right:20,
    left:20,
  
  },

  modalHeader: {
    height:90,
    backgroundColor:'#CC9900'

  },

  postText: {
    flex:1,
    marginTop:20,
    color:'black',
    fontSize:25,
    marginHorizontal:5,
    //elevation:8,
    //alignItems:'center',
    padding:30,
    backgroundColor:'#D8D8D8',
    borderRadius:10,
    
  },

  item: {
    flex:1,
    color:'black',
    fontSize:22,
    marginLeft:-10,
    marginVertical:-5,

    
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  //  paddingTop:30, 
  },
  header: {
    flexGrow:1,
    height:220, 
    backgroundColor:'#8B0000',
    borderBottomLeftRadius:55,
    borderBottomRightRadius:55,
  },

  title: {
    fontWeight:'bold',
    fontSize: 40,
    color:'#fff',
    textAlign:'center',
    top:-120,
  },

  loginButton: {
    top:180,
    marginLeft:50,
    marginRight:50,
    alignItems:'center',
    padding:15,
    backgroundColor:'#8B0000',
    borderRadius:15,
    justifyContent:'center',

  },

 loginText:{
  color:'white',
  fontSize:30,
  fontWeight:"bold",

 },

 user:{
  top:120,
  marginLeft:30,
  marginRight:30,
// bottom:10,
  marginBottom:20,
  alignItems:"center",
  justifyContent:'center',
 // borderStyle:"solid",
 borderColor:"black",
 backgroundColor:"white",
 borderWidth:1.5,
 fontSize:20,
 padding:10,

 },

  
});

export default UpdateApp; 



