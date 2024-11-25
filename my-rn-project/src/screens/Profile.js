import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';
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
        username: user.displayName ,
      });

      db.collection('posts').where('email', '==', auth.currentUser.email).onSnapshot(
        docs => {
            let posts = []
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({posts: posts})
        }
    )
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

        <View style={styles.header}>
          <Text style={styles.headerText}>Mi Perfil</Text>
        </View>


        <View style={styles.userInfo}>
          <Text style={styles.userText}>Nombre de usuario: {this.state.username}</Text>
          <Text style={styles.userText}>Email: {this.state.email}</Text>
          <Text style={styles.userText}>Total de posteos: {this.state.posts.length}</Text>
        </View>


        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Post data={item}/>              <TouchableOpacity
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
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#15202B',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#38444D',
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  userInfo: {
    backgroundColor: '#192734',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  userText: {
    fontSize: 20,
    color: '#8899A6',
    marginBottom: 10,
    fontFamily: 'Arial',
  },
  post: {
    backgroundColor: '#192734',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  postText: {
    fontSize: 20,
    color: '#E1E8ED',
    marginBottom: 10,
    fontFamily: 'Arial',
  },
  deleteButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#E0245E',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#15202B',
    margin: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Profile;