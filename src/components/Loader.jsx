import { Box, CircularProgress, Alert, Typography } from '@mui/material';

export function Loader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
      <CircularProgress color="primary" />
    </Box>
  );
}

export function ErrorMessage({ message }) {
  return (
    <Alert severity="error" sx={{ my: 2 }}>
      Something went wrong: {message}. Please check your connection and try again.
    </Alert>
  );
}

export function EmptyMessage({ text }) {
  return (
    <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
      {text}
    </Typography>
  );
}