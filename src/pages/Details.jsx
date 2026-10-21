import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Chip, Button, Rating } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { getDetails, imageUrl } from '../services/tmdb';
import { Loader, ErrorMessage } from '../components/Loader';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useWatchlist } from '../context/WatchlistContext';
import TrailerDialog from '../components/TrailerDialog';
import WhereToWatch from '../components/WhereToWatch';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Details() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  useEffect(() => {
    setLoading(true);
    setError('');
    getDetails(type, id)
      .then((data) => setItem(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [type, id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!item) return null;

  const title = item.title || item.name || 'Untitled';
  const date = item.release_date || item.first_air_date;
  const year = date ? date.slice(0, 4) : 'Unknown';
  const poster = imageUrl(item.poster_path, 'w500');
  const backdrop = imageUrl(item.backdrop_path, 'w1280');
  const rating = item.vote_average || 0;
  const runtime = item.runtime
    ? `${item.runtime} min`
    : item.number_of_seasons
    ? `${item.number_of_seasons} season(s)`
    : null;

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Box
        sx={{
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          p: { xs: 2, md: 4 },
          backgroundImage: backdrop
            ? `linear-gradient(rgba(11,15,25,0.85), rgba(11,15,25,0.95)), url(${backdrop})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          bgcolor: 'background.paper',
        }}
      >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            {poster ? (
              <Box
                component="img"
                src={poster}
                alt={title}
                sx={{ width: '100%', maxWidth: 300, borderRadius: 2, display: 'block', mx: 'auto' }}
              />
            ) : (
              <Box
                sx={{
                  aspectRatio: '2 / 3', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', bgcolor: 'background.default',
                  borderRadius: 2, color: 'text.secondary',
                }}
              >
                No poster available
              </Box>
            )}
          </Grid>

          <Grid size={{ xs: 12, sm: 8, md: 9 }}>
            <Typography variant="h3" fontWeight={800} sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
              {title}
            </Typography>

            {item.tagline && (
              <Typography color="text.secondary" fontStyle="italic" sx={{ mt: 0.5 }}>
                {item.tagline}
              </Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', my: 2 }}>
              <Rating value={rating / 2} precision={0.1} readOnly />
              <Typography fontWeight={700}>
                {rating ? rating.toFixed(1) : 'Not rated'}
              </Typography>
              <Typography color="text.secondary">
                {year}{runtime ? ` · ${runtime}` : ''}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              {item.genres && item.genres.length > 0 ? (
                item.genres.map((g) => (
                  <Chip key={g.id} label={g.name} color="primary" variant="outlined" />
                ))
              ) : (
                <Typography color="text.secondary">Genre not available</Typography>
              )}
            </Box>

            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              Overview
            </Typography>
            <Typography sx={{ maxWidth: 700, lineHeight: 1.7, mb: 3 }}>
              {item.overview || 'No overview is available for this title.'}
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
  <TrailerDialog type={type} id={id} />
  <Button
    variant="outlined"
    startIcon={<YouTubeIcon />}
    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} ${year} movie`)}`}
    target="_blank"
    rel="noreferrer"
  >
    Find on YouTube
  </Button>
</Box>

            {isInWatchlist(item.id, type) ? (
  <Button
    variant="outlined"
    startIcon={<BookmarkRemoveIcon />}
    onClick={() => removeFromWatchlist(item.id, type)}
  >
    Remove from Watchlist
  </Button>
) : (
  <Button
    variant="contained"
    startIcon={<BookmarkAddIcon />}
    onClick={() => addToWatchlist(item, type)}
  >
    Add to Watchlist
  </Button>
)}
<WhereToWatch type={type} id={id} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}