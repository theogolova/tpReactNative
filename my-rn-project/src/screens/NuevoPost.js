import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase/config'; 
import firebase from 'firebase'; 

class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleSubmit = () => {
    const { message } = this.state;
    const userEmail = auth.currentUser ? auth.currentUser.email : 'Anónimo';
    if (message != '') {
      db.collection('posts')
      .add({
        message: message,
        email: userEmail,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes: []
      })
      .then(() => {
        Alert.alert('Post creado', 'Tu post se ha guardado correctamente');
        this.setState({ message: '' }); 
      })
      .catch((error) => {
        console.error('Error al crear el post:', error.message);
        Alert.alert('Error', 'No se pudo guardar el post');
      });
    }

    
    

   
    
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Nuevo Post</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          multiline={true}
          onChangeText={(text) => this.setState({ message: text })}
          value={this.state.message}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a1a1a", 
  },
  heading: {
    fontSize: 36, 
    fontWeight: "bold",
    marginBottom: 15,
    color: "#ffffff", 
    textAlign: "center",
  },
  input: {
    height: 100,
    borderColor: "#38444D", 
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#192734", 
    color: "#ffffff", 
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1DA1F2", 
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff", 
    fontSize: 18,
    fontWeight: "600",
  },
});

export default NuevoPost;
