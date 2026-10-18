const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const IMG_BASE = 'https://image.tmdb.org/t/p';

// Builds a poster/backdrop URL. Returns null if there is no image.
export function imageUrl(path, size = 'w500') {
  return path ? `${IMG_BASE}/${size}${path}` : null;
}

// One helper that every API call goes through.
async function request(endpoint, params = {}) {
  const query = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    ...params,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${query}`);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  const data = await response.json();
  return data;
}

// Home page sections
export const getTrending = () => request('/trending/all/week');
export const getPopularMovies = () => request('/movie/popular');
export const getPopularTV = () => request('/tv/popular');
export const getActionMovies = () =>
  request('/discover/movie', { with_genres: 28 });

// Movies and TV pages (with genre filter and paging)
export const getMovies = (genreId, page = 1) =>
  request('/discover/movie', { with_genres: genreId || '', page });
export const getTVShows = (genreId, page = 1) =>
  request('/discover/tv', { with_genres: genreId || '', page });

// Genre lists for the filter
export const getMovieGenres = () => request('/genre/movie/list');
export const getTVGenres = () => request('/genre/tv/list');

// Search and details
export const searchMulti = (query, page = 1) =>
  request('/search/multi', { query, page });
export const getDetails = (type, id) => request(`/${type}/${id}`);