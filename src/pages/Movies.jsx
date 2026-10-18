import BrowsePage from '../components/BrowsePage';
import { getMovies, getMovieGenres } from '../services/tmdb';

export default function Movies() {
  return (
    <BrowsePage
      title="Movies"
      type="movie"
      fetchItems={getMovies}
      fetchGenres={getMovieGenres}
    />
  );
}