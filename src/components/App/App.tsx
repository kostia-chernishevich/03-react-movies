import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import css from "./App.module.css";

export function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [error, setError] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(false);
      setMovies([]);
    try {
      const results = await fetchMovies(query);
          if (results.length === 0) {
      toast("No movies found for your request.");
    }
      setMovies(results);
    } catch (error) {
      console.error(error);
      setError(true);
      toast.error("There was an error, please try again...");
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.app}>
      
      <header className={css.header}>
        <SearchBar onSubmit={handleSearch} />
      </header>

      
      <main className={css.main}>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {!loading && !error && (
          <MovieGrid movies={movies} onSelect={(m) => setSelectedMovie(m)} />
        )}
      </main>

      
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
