import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase/app'; 

class Post extends Component {
  constructor(props){
      super(props)
      this.state ={
          conteo: 0,
          miLike: this.props.data.data.likes.includes(auth.currentUser.email),
          likes: this.props.data.data.likes.length,
          datosUsuario: {}
      }
  }
  componentDidMount() {
      
      db.collection('users').where('mail', '==', this.props.data.data.email)
      .onSnapshot(data => {
          data.forEach(doc => {    
              console.log(doc.data());
              this.setState({datosUsuario:doc.data()})
          });
   })
  }
  Likear() {
      db.collection('posts').doc(this.props.data.id).update({likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)})
      .then(()=> {this.setState({likes:this.props.data.data.likes.length , miLike : true})})
  } 
  Deslikear() {
      db.collection('posts').doc(this.props.data.id).update({likes:firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)})
      .then(()=> {this.setState({likes:this.props.data.data.likes.length , miLike: false})})
  }
 render() {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.email}>{ this.props.data.data.email}</Text>
        <Text style={styles.message}>{this.props.data.data.message}</Text>
        <Text style={styles.date}>
          {this.props.data.data.createdAt ? this.props.data.data.createdAt.toDate().toLocaleString() : 'Fecha desconocida'}
        </Text>
        <Text style={styles.likes}>Likes: {this.props.data.data.likes.length ? this.props.data.data.likes.length : 0}</Text>
        {this.state.miLike ? (<TouchableOpacity style={[styles.likeButton]} onPress={() => this.Deslikear()}>
          <Text style={styles.likeButtonText}>UnLike</Text>
        </TouchableOpacity>) : (<TouchableOpacity style={[styles.likeButton]} onPress={() => this.Likear()}>
          <Text style={styles.likeButtonText}>Like</Text>
        </TouchableOpacity>)}
        
      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#192734',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  email: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18, 
    color: '#ffffff', 
  },
  message: {
    marginBottom: 10,
    fontSize: 16, 
    color: '#E1E8ED', 
  },
  date: {
    fontSize: 14,
    color: '#8899A6', 
    marginBottom: 10,
  },
  likes: {
    fontSize: 16,
    color: '#ffffff', 
    marginBottom: 5,
  },
  likeButton: {
    backgroundColor: '#1DA1F2', 
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  likeButtonActive: {
    backgroundColor: '#E0245E', 
  },
  likeButtonText: {
    color: '#ffffff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Post;