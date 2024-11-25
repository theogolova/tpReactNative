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
        this.props.navigation.navigate("HomeMenu");
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

        <Text style={styles.headerText}>C0MM3ENTS</Text>
        
       
        <Text style={styles.subHeading}>Ingresar</Text>
        
        {this.state.error ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}

        
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Ingrese su email"
          placeholderTextColor="#8899A6"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          placeholderTextColor="#8899A6"
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
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 36, 
    fontWeight: "bold",
    color: "#fff", 
    textAlign: "center",
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 24, 
    fontWeight: "bold",
    color: "#8899A6", 
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#38444D',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#192734', 
    color: '#E1E8ED', 
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#15202B",
    borderColor: "#15202B",
    borderWidth: 1,
  },
  buttonSecondary: {
    backgroundColor: "#E0245E",
    borderColor: "#E0245E",
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
    color: "#8899A6",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Login;
