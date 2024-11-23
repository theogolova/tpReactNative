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
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot) => {
          const posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setState({ posts, filteredPosts: posts, loading: false });
          console.log("Posts obtenidos:", posts);
        },
        (error) => {
          console.error("Error al obtener los posts:", error);
          this.setState({ loading: false, error: true });
        }
      );
  }

  handleSearch = (query) => {
    const { posts } = this.state;
    const filteredPosts = posts.filter(
      (post) =>
        post.email.toLowerCase().includes(query.toLowerCase()) || 
        post.userName?.toLowerCase().includes(query.toLowerCase()) 
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
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
    backgroundColor: "#fff",
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
    color: "#777",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
});

export default Home;
