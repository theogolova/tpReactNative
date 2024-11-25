import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase/app'; 

const Post = ({ data }) => {
  const currentUserEmail = auth.currentUser ? auth.currentUser.email : 'Anónimo';
  const hasLiked = data.likes && data.likes.includes(currentUserEmail);

  const toggleLike = () => {
    const postRef = db.collection('posts').doc(data.id);

    if (hasLiked) {
      postRef
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(currentUserEmail),
        })
        .catch((error) => console.error('Error removing like:', error));
    } else {
      postRef
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(currentUserEmail), 
        })
        .catch((error) => console.error('Error adding like:', error));
    }
  };

  return (
    <View style={styles.postContainer}>
      <Text style={styles.email}>{data.email || 'Anónimo'}</Text>
      <Text style={styles.message}>{data.message || 'Sin contenido'}</Text>
      <Text style={styles.date}>
        {data.createdAt ? data.createdAt.toDate().toLocaleString() : 'Fecha desconocida'}
      </Text>
      <Text style={styles.likes}>Likes: {data.likes ? data.likes.length : 0}</Text>
      <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
        <Text style={styles.likeButtonText}>{hasLiked ? 'Unlike' : 'Like'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  email: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  likes: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  likeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  likeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Post;