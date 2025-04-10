import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const API_KEY = "91af8ff96daa03c546733eab88a7388e";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

const HomeScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  useEffect(() => {
    fetchMovies();
    fetchTrendingMovies();
    fetchGenres();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(TRENDING_URL);
      const data = await response.json();
      setTrendingMovies(data.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(GENRES_URL);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <View style={styles.movieItem}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieRating}>⭐ {item.vote_average}/10</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Movies..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Genre Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            style={[styles.genreButton, selectedGenre === genre.id && styles.selectedGenre]}
            onPress={() => setSelectedGenre(genre.id)}
          >
            <Text style={styles.genreText}>{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      
      <Text style={styles.sectionTitle}>Trending Now</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingList}>
        {trendingMovies.map((movie) => (
          <Image key={movie.id} source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.trendingImage} />
        ))}
      </ScrollView>

      {/* All Movies */}
      <Text style={styles.sectionTitle}>All Movies</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.movieGrid}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  searchBar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  genreList: { flexDirection: "row", marginBottom: 10 },
  genreButton: { padding: 10, marginRight: 8, backgroundColor: "#ddd", borderRadius: 20 },
  selectedGenre: { backgroundColor: "#007bff" },
  genreText: { color: "#fff" },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  trendingList: { flexDirection: "row", marginBottom: 10 },
  trendingImage: { width: 150, height: 200, borderRadius: 8, marginRight: 10 },
  movieGrid: { justifyContent: "space-between" },
  movieItem: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  movieImage: { width: 140, height: 200, borderRadius: 8, marginBottom: 5 },
  movieTitle: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
  movieRating: { fontSize: 14, color: "#666" },
});

export default HomeScreen;