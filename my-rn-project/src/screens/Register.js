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
    const { userName, email, password, bio } = this.state;
  
    console.log("Nombre de usuario:", userName);
    console.log("Contraseña:", password);
    console.log("Email:", email);
  
 
    if (!userName || userName.length < 5) {
      this.setState({ error: "El nombre no puede tener menos de 5 caracteres" });
      return;
    }
    if (!email || !email.includes("@")) {
      this.setState({ error: "El email tiene un formato inválido" });
      return;
    }
    if (!password || password.length < 6) {
      this.setState({ error: "La contraseña no puede tener menos de 6 caracteres" });
      return;
    }
  
   
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  

        return db.collection("users").add({
          email: email,
          userName: userName,
          bio: bio,
          createdAt: Date.now(),
        });
      })
      .then(() => {
        console.log("Usuario registrado exitosamente");
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error al registrar usuario:", error.message);
        if (error.code === "auth/email-already-in-use") {
          this.setState({ error: "El email ya existe" });
        } else {
          this.setState({ error: "Error al registrar usuario. Por favor, intente nuevamente." });
        }
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
    flex: 1,
    padding: 20,
    backgroundColor: "#1a1a1a",
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#38444D",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#15202B",
    color: "#ffffff",
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#1DA1F2",
    borderColor: "#1DA1F2",
    borderWidth: 1,
  },
  buttonSecondary: {
    backgroundColor: "#E0245E",
    borderColor: "#E0245E",
    borderWidth: 1,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  error: {
    color: "#E0245E",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
  },
});

export default Register;
