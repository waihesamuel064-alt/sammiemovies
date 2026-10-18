import BrowsePage from '../components/BrowsePage';
import { getTVShows, getTVGenres } from '../services/tmdb';

export default function TVShows() {
  return (
    <BrowsePage
      title="TV Shows"
      type="tv"
      fetchItems={getTVShows}
      fetchGenres={getTVGenres}
    />
  );
}