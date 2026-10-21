import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItemButton,
  ListItemIcon, ListItemText, IconButton, Box, InputBase,
  useMediaQuery, useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

const DRAWER_WIDTH = 220;

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'Movies', path: '/movies', icon: <MovieIcon /> },
  { label: 'TV Shows', path: '/tv', icon: <TvIcon /> },
  { label: 'Free Films', path: '/free', icon: <OndemandVideoIcon /> },
  { label: 'My Watchlist', path: '/watchlist', icon: <BookmarkIcon /> },
];

export default function Layout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchText.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const drawerContent = (
    <Box sx={{ pt: { xs: 2, md: 10 } }}>
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end={item.path === '/'}
            onClick={() => setMobileOpen(false)}
            sx={{
              '&.active': {
                color: 'primary.main',
                bgcolor: 'rgba(0, 212, 200, 0.12)',
                '& .MuiListItemIcon-root': { color: 'primary.main' },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          {!isDesktop && (
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
  color: 'primary.main',
  fontWeight: 800,
  textDecoration: 'none',
  letterSpacing: 1,
  fontSize: { xs: '0.95rem', sm: '1.25rem' },
  whiteSpace: 'nowrap',
}}
          >
            SAMMIE<span style={{ color: '#fff' }}>MOVIES</span>
          </Typography>

          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              flexGrow: 1,
              minWidth: 0,
              maxWidth: 480,
              ml: 'auto',
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'rgba(255,255,255,0.08)',
              borderRadius: 8,
              px: 2,
            }}
          >
            <SearchIcon sx={{ opacity: 0.7, mr: 1 }} />
            <InputBase
              placeholder="Search movies and TV shows..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ flexGrow: 1, py: 0.5 }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {isDesktop ? (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: '1px solid rgba(255,255,255,0.08)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
        >
          {drawerContent}
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, p: { xs: 2, md: 3 }, mt: 8 }}>
       <Outlet />

<Box
  component="footer"
  sx={{ mt: 8, pt: 3, borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}
>
  <Typography variant="caption" color="text.secondary">
    This product uses the TMDB API but is not endorsed or certified by TMDB.
    Movie data and images are provided by The Movie Database (TMDB).
  </Typography>
</Box>
      </Box>
    </Box>
  );
}