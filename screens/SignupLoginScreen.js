import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert,Modal,KeyboardAvoidingView,ScrollView, Image} from 'react-native';
import db from "../config"
import firebase from 'firebase'

export default class SignupLoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId : "",
            password : "",
            isModalVisible : 'false',
            firstName : "",
            lastName : "",
            contact : "",
            address : "",
            confirmPassword : ""
        }
    }

    userSignUp=(emailId,password)=>{
      firebase.auth().createUserWithEmailAndPassword(emailId,password)
      .then((response)=>{
          return Alert.alert("User added successsfully")
      })
      .catch((error)=>{
          var errorCode=error.code;
          var errorMessage=error.message;
          return Alert.alert(errorMessage)
      })
      db.collection("users").add({
        first_name : this.state.firstName,
        last_name : this.state.lastName,
        address : this.state.address,
        contact:this.state.contact,
        emailId:this.state.emailId,
        password:this.state.password,
        confirmPassword:this.state.confirmPassword
    })
  }

    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password).then((response)=>{
            console.log("Successfull login")
            return Alert.alert("Successfull login")
            
        }).catch((function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            return Alert.alert(errorMessage);
        }))
    }

    showModal=()=>{
        return(
            <Modal 
            animationType="fade" 
            transparent={true}
            visible={this.state.isModalVisible}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{width:'100%'}}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            <Text style={styles.modalTitle}>Sign Up Form</Text>

                            <TextInput
                                style={styles.modalTextInput}
                                placeholder="First Name"
                                maxLength={12}
                                onChangeText={(text)=>{
                                this.setState({
                                    firstName:text
                                })
                            }}/>

                            <TextInput
                                style={styles.modalTextInput}
                                placeholder="Last Name"
                                maxLength={12}
                                onChangeText={(text)=>{
                                    this.setState({
                                        lastName:text
                                    })
                            }}/>

                            <TextInput
                                style={styles.modalTextInput}
                                placeholder="Contact"
                                maxLength={10}
                                keyboardType="numeric"
                                onChangeText={(text)=>{
                                this.setState({
                                    contact:text
                                })
                            }}/>

                            <TextInput
                                style={styles.modalTextInput}
                                placeholder="Address"
                                multiline={true}
                                onChangeText={(text)=>{
                                this.setState({
                                    address:text
                                })
                            }}/>

                        <TextInput 
                            style={styles.modalTextInput} 
                            placeholder="Email id" 
                            keyboardType="email-address" 
                            onChangeText={(text)=>{
                            this.setState({
                                emailId : text
                            })
                        }}/>

                        <TextInput 
                            style={styles.modalTextInput}
                            placeholder="Password" 
                            secureTextEntry={true} 
                            onChangeText={(text)=>{
                            this.setState({
                                password:text
                        })
                        }}/>

                        <TextInput 
                            style={styles.modalTextInput} 
                            placeholder="Confirm Password" 
                            secureTextEntry={true} 
                            onChangeText={(text)=>{
                            this.setState({
                                confirmPassword:text
                            })
                        }}/>

                    <View style={styles.modalBackButton}>
                        <TouchableOpacity 
                        style={styles.signUpButton} 
                        onPress={()=>{
                            this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword);
                        }}>
                            <Text style={styles.signUpButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity 
                        style={styles.cancelButton} 
                        onPress={()=>{
                            this.setState({"isModalVisible" : false})
                        }}>
                            <Text style={{color:'#006994'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render(){
        return(
            <View style={styles.container}>

                <View style={{justifyContent:"center",alignItems:"center"}}>
                    { this.showModal()}
                </View>
      
                <View>
                    <Text style={styles.text}>Barter System </Text>
                </View>
                
                
                <View>
                    <TextInput style={styles.loginBox}
                      placeholder="Enter Email id" 
                      keyboardType="email-address" 
                      onChangeText={(text)=>{
                          this.setState({
                              emailId : text
                          })
                    }}/>

                    <TextInput style={styles.loginBox} 
                      placeholder="Enter Password" 
                      secureTextEntry={true} 
                      onChangeText={(text)=>{
                          this.setState({
                              password:text
                          })
                    }}/>

                    <TouchableOpacity style={[styles.button,{marginBottom:20,marginTop:20}]} onPress={()=>{
                        this.userLogin(this.state.emailId,this.state.password)
                    }}>
                        <Text style={styles.btText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            this.userSignUp(this.state.emailId, this.state.password)
                        }}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>             
                </View>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor: '#68C6B8',
        justifyContent:"center"
    },
    text:{
      marginTop:10,
      alignSelf:'center',
      fontWeight:'bold',
      borderColor:"red",
      fontSize:25,
      textDecorationLine: 'underline',
    },
    loginBox:{
        width:300,
        height:40,
        borderBottomWidth:1.5,
        borderColor:'black',
        backgroundColor:'white',
        fontSize:20,
        margin:10,
        paddingLeft:10
    },
    button:{
      borderColor:'white',
      justifyContent:'center',
      backgroundColor:'#FFCA4B',
      fontWeight:'bold',
      marginBottom:10,
      marginLeft:50,
      borderRadius:10,
      width:200 ,
      alignItems:'center'   
        
    }, 
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    modalTitle:{
        justifyContent:"center",
        alignSelf:"center",
        fontSize:30,
        color:'#8A2BE2',
        margin:50,
        fontWeight:"bold"
    },
    modalContainer:{
        flex:1,
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#e3ddd3',
        marginRight:30,
        marginLeft:30,
        marginTop:30,
        marginBottom:30
    },
    modalTextInput:{
        width:250,
        height:35,
        alignSelf:"center",
        borderColor:"#006994",
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10 
    },
    signUpButton:{
        width:200,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1,
        borderRadius:10,
        marginTop:30
    },
    signUpButtonText:{
        color:'#8A2BE2',
        fontSize:15,
        fontWeight:"bold",
        justifyContent:"center",
        alignItems:"center"
    },
    cancelButton:{
        width:200,
        height:30,
        justifyContent:"center",
        alignItems:"center",
        marginTop:5,
        marginBottom:5,
        borderWidth:0.5,
        borderRadius:10,
        width:80
    }

})