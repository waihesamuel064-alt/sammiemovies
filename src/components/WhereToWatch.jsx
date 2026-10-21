import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { getProviders } from '../services/tmdb';

export default function WhereToWatch({ type, id }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getProviders(type, id)
      .then((d) => setInfo(d.results.UG || d.results.US || null))
      .catch(() => setInfo(null));
  }, [type, id]);

  const list = info ? [...(info.flatrate || []), ...(info.rent || [])] : [];
  if (!info || list.length === 0) {
    return <Typography color="text.secondary" sx={{ mt: 2 }}>Not listed on streaming services.</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Where to watch</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {list.map((p) => (
          <Button key={p.provider_id} variant="outlined" size="small" href={info.link} target="_blank" rel="noreferrer">
            {p.provider_name}
          </Button>
        ))}
      </Box>
      <Typography variant="caption" color="text.secondary">Streaming data by JustWatch via TMDB.</Typography>
    </Box>
  );
}