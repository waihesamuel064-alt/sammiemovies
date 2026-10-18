import { createContext, useContext, useEffect, useState } from 'react';

const WatchlistContext = createContext(null);
const STORAGE_KEY = 'sammiemovies-watchlist';

// Read saved items safely (bad or missing data gives an empty list)
function loadSaved() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(loadSaved);

  // Save to the browser every time the list changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const isInWatchlist = (id, type) =>
    watchlist.some((i) => i.id === id && i.media_type === type);

  const addToWatchlist = (item, type) => {
    if (isInWatchlist(item.id, type)) return;
    setWatchlist((prev) => [
      ...prev,
      {
        id: item.id,
        media_type: type,
        title: item.title || item.name,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
        release_date: item.release_date,
        first_air_date: item.first_air_date,
      },
    ]);
  };

  const removeFromWatchlist = (id, type) => {
    setWatchlist((prev) =>
      prev.filter((i) => !(i.id === id && i.media_type === type))
    );
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}