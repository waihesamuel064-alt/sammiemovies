import { Box } from '@mui/material';
import MovieRow from '../components/MovieRow';
import {
  getTrending, getPopularMovies, getPopularTV, getActionMovies,
} from '../services/tmdb';

export default function Home() {
  return (
    <Box>
      <MovieRow title="Trending This Week" fetcher={getTrending} />
      <MovieRow title="Popular Movies" fetcher={getPopularMovies} type="movie" />
      <MovieRow title="Popular TV Shows" fetcher={getPopularTV} type="tv" />
      <MovieRow title="Action Movies" fetcher={getActionMovies} type="movie" />
    </Box>
  );
}