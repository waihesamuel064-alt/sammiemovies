import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent, CircularProgress, Alert } from '@mui/material';

export default function FreeFilms() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const url =
          'https://archive.org/advancedsearch.php?q=collection:feature_films+AND+mediatype:movies&fl[]=identifier&fl[]=title&sort[]=downloads+desc&rows=24&output=json';
        const res = await fetch(url);
        const data = await res.json();
        setFilms(data.response.docs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const play = async (item) => {
    try {
      setError(null);
      const res = await fetch(`https://archive.org/metadata/${item.identifier}`);
      const data = await res.json();
      const mp4s = data.files.filter((f) => f.name.endsWith('.mp4'));
const file =
  mp4s.find((f) => f.format === 'h.264') ||
  mp4s.find((f) => f.format === '512Kb MPEG4') ||
  mp4s.find((f) => f.format === 'h.264 HD') ||
  mp4s[0];
      if (!file) throw new Error('No playable video found for this film.');
      setCurrent({
        title: item.title,
        src: `https://archive.org/download/${item.identifier}/${encodeURI(file.name)}`,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Free Films
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {current && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>{current.title}</Typography>
          <video key={current.src} src={current.src} controls autoPlay style={{ width: '100%', maxHeight: '70vh' }} />
        </Box>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 2 }}>
          {films.map((film) => (
            <Card key={film.identifier}>
              <CardActionArea onClick={() => play(film)}>
                <CardMedia
                  component="img"
                  height="220"
                  image={`https://archive.org/services/img/${film.identifier}`}
                  alt={film.title}
                />
                <CardContent>
                  <Typography variant="body2" noWrap>{film.title}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}