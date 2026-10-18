import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MovieCard from './MovieCard';
import { Loader, ErrorMessage, EmptyMessage } from './Loader';

export default function MovieRow({ title, fetcher, type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetcher()
      .then((data) => setItems(data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        {title}
      </Typography>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && items.length === 0 && (
        <EmptyMessage text="Nothing to show here yet." />
      )}

      <Box
        sx={{
          display: 'flex', gap: 2, overflowX: 'auto', pb: 1,
          '&::-webkit-scrollbar': { height: 6 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 3 },
        }}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{ flex: '0 0 auto', width: { xs: 130, sm: 150, md: 170 } }}
          >
            <MovieCard item={item} type={type} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}