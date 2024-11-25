import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import { db, auth } from '../firebase/config';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      posts: [],
    };
  }

  componentDidMount() {
    const user = auth.currentUser;

    if (user) {
      
      this.setState({
        email: user.email,
        username: user.displayName || 'Usuario sin nombre',
      });

     
      db.collection('posts')
        .where('owner', '==', user.email) 
        .onSnapshot(
          (snapshot) => {
            if (!snapshot.empty) {
              const userPosts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              this.setState({ posts: userPosts });
            } else {
              this.setState({ posts: [] }); 
            }
          },
          (error) => {
            console.error('Error al obtener los posteos:', error.message);
          }
        );
    }
  }

  handleDeletePost(postId) {
    db.collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        console.log('Posteo eliminado correctamente.');
      })
      .catch((error) => {
        console.error('Error al eliminar el posteo:', error.message);
      });
  }

  handleLogout() {
    auth.signOut()
      .then(() => {
        console.log('Sesión cerrada correctamente.');
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.text}>Nombre de usuario: {this.state.username}</Text>
        <Text style={styles.text}>Email: {this.state.email}</Text>
        <Text style={styles.text}>Total de posteos: {this.state.posts.length}</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.postText}>{item.description}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.handleDeletePost(item.id)}
              >
                <Text style={styles.deleteText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity style={styles.logoutButton} onPress={() => this.handleLogout()}>
          <Text style={styles.logoutButtonText}>CERRAR SESIÓN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  post: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  deleteButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;