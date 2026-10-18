import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import MovieCard from '../components/MovieCard';
import { Loader, ErrorMessage, EmptyMessage } from '../components/Loader';
import { searchMulti } from '../services/tmdb';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError('');

    searchMulti(query)
      .then((data) => {
        // Keep only movies and TV shows (search can also return people)
        const filtered = data.results.filter(
          (r) => r.media_type === 'movie' || r.media_type === 'tv'
        );
        setResults(filtered);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        {query ? `Results for "${query}"` : 'Search'}
      </Typography>

      {!query && <EmptyMessage text="Type a title in the search bar above." />}
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && query && results.length === 0 && (
        <EmptyMessage text={`No matches found for "${query}". Try a different title.`} />
      )}

      <Grid container spacing={2}>
        {results.map((item) => (
          <Grid key={`${item.media_type}-${item.id}`} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <MovieCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}