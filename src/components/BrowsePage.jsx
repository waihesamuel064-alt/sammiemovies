import { useEffect, useState } from 'react';
import {
  Box, Typography, FormControl, InputLabel, Select, MenuItem, Button,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MovieCard from './MovieCard';
import { Loader, ErrorMessage, EmptyMessage } from './Loader';

export default function BrowsePage({ title, type, fetchItems, fetchGenres }) {
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load the genre list once
  useEffect(() => {
    fetchGenres()
      .then((data) => setGenres(data.genres))
      .catch(() => setGenres([]));
  }, []);

  // When the genre changes, start again from page 1
  useEffect(() => {
    setItems([]);
    setPage(1);
  }, [genreId]);

  // Load items whenever the genre or page changes
  useEffect(() => {
    setLoading(true);
    setError('');
    fetchItems(genreId, page)
      .then((data) => {
        setItems((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
        setTotalPages(data.total_pages);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [genreId, page]);

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700} sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            label="Genre"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
          >
            <MenuItem value="">All genres</MenuItem>
            {genres.map((g) => (
              <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && <ErrorMessage message={error} />}
      {!loading && !error && items.length === 0 && (
        <EmptyMessage text="No titles found for this genre." />
      )}

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid key={item.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <MovieCard item={item} type={type} />
          </Grid>
        ))}
      </Grid>

      {loading && <Loader />}

      {!loading && !error && page < totalPages && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" onClick={() => setPage((p) => p + 1)}>
            Load more
          </Button>
        </Box>
      )}
    </Box>
  );
}