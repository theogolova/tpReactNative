import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { auth } from "../firebase/config";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        
        this.props.navigation.replace("HomeMenu");
      } else {
        console.log("No hay usuario logueado.");
      }
    });
  }

  handleSubmit() {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.replace("HomeMenu");
      })
      .catch(() => {
        this.setState({ error: "Fallo el login. Verifique sus credenciales." });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Ingresar</Text>
        {this.state.error ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Ingrese su email"
          placeholderTextColor="#888"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          placeholderTextColor="#888"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Text style={styles.buttonText}>Acceder</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>¿No tienes cuenta?</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style={styles.buttonText}>Regístrate</Text>
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
    shadowOpacity: 0.3,
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
  linkText: {
    marginTop: 15,
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Login;
