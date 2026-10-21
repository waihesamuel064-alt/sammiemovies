import { useEffect, useState } from 'react';
import { Dialog, DialogContent, Button, Typography, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { getVideos } from '../services/tmdb';

export default function TrailerDialog({ type, id }) {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(null);

  useEffect(() => {
    getVideos(type, id)
      .then((d) => {
        const t = d.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
        setKey(t ? t.key : null);
      })
      .catch(() => setKey(null));
  }, [type, id]);

  if (!key) return <Typography color="text.secondary">No trailer available</Typography>;

  return (
    <>
      <Button variant="outlined" startIcon={<PlayArrowIcon />} onClick={() => setOpen(true)}>
        Watch Trailer
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ position: 'relative', pt: '56.25%' }}>
            <iframe
              title="Trailer"
              src={`https://www.youtube.com/embed/${key}?autoplay=1`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}