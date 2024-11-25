import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  
} from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      error: false,
      searchQuery: "", 
      filteredPosts: [], 
    };
  }

  componentDidMount() {
    db.collection('posts').orderBy('createdAt','desc').onSnapshot((docs) => {
      let post = []
      docs.forEach(doc => {
          post.push({
              id : doc.id,
              data: doc.data()
          })
      })
      this.setState({ posts: post , filteredPosts: post, loading: false})
  })
  }

  handleSearch = (query) => {
    
    const filteredPosts = this.state.posts.filter(
      (post) =>
        post.data.email.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ searchQuery: query, filteredPosts });
  };

  render() {
    const { loading, filteredPosts, error, searchQuery } = this.state;

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text>Cargando posts...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>C0MM3ENTS</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={this.handleSearch}
          />
        </View>
        {error ? (
          <Text style={styles.errorText}>Error al cargar los posts.</Text>
        ) : filteredPosts.length > 0 ? (
          <FlatList
            data={filteredPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Post data={item} />}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.noPostsText}>El email/ user name no existe</Text>
        )}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#15202B", 
    padding: 15,
    borderRadius: 10,
  },
  heading: {
    fontSize: 36, 
    fontWeight: "bold",
    color: "#ffffff", 
  },
  searchInput: {
    flex: 0.7, 
    height: 36,
    borderWidth: 1,
    borderColor: "#38444D",
    borderRadius: 8,
    paddingHorizontal: 8, 
    marginLeft: 10,
    backgroundColor: "#192734", 
    color: "#ffffff", 
    fontSize: 14, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  noPostsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#8899A6",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#E0245E", 
  },
});

export default Home;
