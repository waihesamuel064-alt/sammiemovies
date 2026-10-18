import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { imageUrl } from '../services/tmdb';

export default function MovieCard({ item, type }) {
  // Trending items carry their own media_type; other lists need it passed in.
  const mediaType = item.media_type || type || 'movie';
  const title = item.title || item.name || 'Untitled';
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);
  const poster = imageUrl(item.poster_path, 'w342');
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null;

  return (
    <Card
      sx={{
  width: '100%',
  bgcolor: 'transparent',
  backgroundImage: 'none',
  transition: 'transform 0.25s',
  '@media (hover: hover)': {
    '&:hover': { transform: 'scale(1.05)' },
    '&:hover .overlay': { opacity: 1 },
  },
}}
    >
      <CardActionArea component={Link} to={`/${mediaType}/${item.id}`}>
        <Box sx={{ position: 'relative', aspectRatio: '2 / 3', bgcolor: 'background.paper' }}>
          {poster ? (
            <CardMedia
              component="img"
              image={poster}
              alt={title}
              loading="lazy"
              sx={{ height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Box
              sx={{
                height: '100%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', p: 1, textAlign: 'center', color: 'text.secondary',
              }}
            >
              <Typography variant="body2">No poster available</Typography>
            </Box>
          )}

          {rating && (
            <Box
              sx={{
                position: 'absolute', top: 8, left: 8, display: 'flex',
                alignItems: 'center', gap: 0.3, px: 0.8, py: 0.2,
                borderRadius: 1, bgcolor: 'rgba(0,0,0,0.75)',
              }}
            >
              <StarIcon sx={{ fontSize: 14, color: '#ffc107' }} />
              <Typography variant="caption" fontWeight={700}>{rating}</Typography>
            </Box>
          )}

          <Box
            className="overlay"
            sx={{
              position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 0.25s',
              display: 'flex', alignItems: 'flex-end', p: 1.5,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 60%)',
            }}
          >
            <Typography variant="body2" fontWeight={600}>{title}</Typography>
          </Box>
        </Box>
      </CardActionArea>

      <Box sx={{ pt: 1 }}>
        <Typography variant="body2" noWrap fontWeight={600}>{title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {year || 'Date unknown'} · {mediaType === 'tv' ? 'TV' : 'Movie'}
        </Typography>
      </Box>
    </Card>
  );
}