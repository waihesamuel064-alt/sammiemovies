import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import MovieCard from '../components/MovieCard';
import { EmptyMessage } from '../components/Loader';
import { useWatchlist } from '../Context/WatchlistContext';

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        My Watchlist ({watchlist.length})
      </Typography>

      {watchlist.length === 0 && (
        <EmptyMessage text="Your watchlist is empty. Open a movie or show and tap Add to Watchlist." />
      )}

      <Grid container spacing={2}>
        {watchlist.map((item) => (
          <Grid key={`${item.media_type}-${item.id}`} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <MovieCard item={item} type={item.media_type} />
            <Button
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => removeFromWatchlist(item.id, item.media_type)}
              sx={{ mt: 1 }}
              fullWidth
            >
              Remove
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}