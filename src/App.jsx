import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Watchlist from './pages/Watchlist';
import Details from './pages/Details';
import Search from './pages/Search';
import FreeFilms from './pages/FreeFilms';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/search" element={<Search />} />
        <Route path="/free" element={<FreeFilms />} />
        <Route path="/:type/:id" element={<Details />} />
      </Route>
    </Routes>
  );
}