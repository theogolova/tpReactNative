import React, { Component } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebase/config"; 

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      bio: "",
      userName: "",
      error: "",
    };
  }

  handleSubmit() {
    const { email, password, userName, bio } = this.state;

    if (!email || !password || !userName) {
      this.setState({ error: "Todos los campos son obligatorios" });
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const user = response.user;

        
        user
          .updateProfile({
            displayName: userName,
          })
          .then(() => {
            
            db.collection("users")
              .doc(user.uid) 
              .set({
                email: email,
                userName: userName,
                bio: bio,
                createdAt: new Date(), 
              })
              .then(() => {
                this.props.navigation.navigate("Login"); 
              })
              .catch((error) => {
                console.error("Error al guardar datos en Firestore:", error.message);
                this.setState({ error: "Error al guardar datos adicionales en Firestore" });
              });
          })
          .catch((error) => {
            console.error("Error al actualizar el perfil:", error.message);
            this.setState({ error: "Error al actualizar el perfil del usuario" });
          });
      })
      .catch((error) => {
        console.error("Error en el registro:", error.message);
        this.setState({ error: error.message }); 
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Registro</Text>
        {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Ingrese su usuario"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese su email"
          keyboardType="email-address"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese una bio"
          onChangeText={(text) => this.setState({ bio: text })}
          value={this.state.bio}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style={styles.buttonText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
    borderWidth: 1,
  },
  buttonSecondary: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
    borderWidth: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Register;
