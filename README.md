# SammieMovies

A responsive movie and TV show discovery web application built with React, Vite and Material UI. Users can browse trending and popular titles, filter by genre, search by title, view details and keep a personal watchlist.

**Live app:** https://sammiemovies-3qdd.vercel.app

## Features

- Homepage with Trending, Popular Movies, Popular TV Shows and Action Movies rows
- Movies and TV Shows pages with a working genre filter and "Load more" pagination
- Search by title, with loading, empty-result and error states
- Details page: poster, overview, release date, rating and genres
- My Watchlist saved in the browser with localStorage (survives refresh)
- Responsive layout: permanent sidebar on desktop, hamburger drawer on mobile
- Handles missing posters, ratings, dates and API errors

## Technologies

- React (JavaScript, JSX) created with Vite
- Material UI (AppBar, Drawer, Card, Grid, Select, Rating, Chip)
- React Router
- Fetch API
- React Hooks (useState, useEffect, useContext)

## API used

[The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api). This product uses the TMDB API but is not endorsed or certified by TMDB. Movie data and images are provided by TMDB.

## Design reference

No screenshot was supplied with the assignment, so the design is inspired by the general look of MovieBox (dark theme, top search bar, left sidebar, poster rows). The branding, name and colours are my own.

## Run locally

1. Clone the repository:
   `git clone https://github.com/waihesamuel064-alt/sammiemovies.git`
2. Go into the folder:
   `cd sammiemovies`
3. Install dependencies:
   `npm install`
4. Copy `.env.example` to a new file called `.env` and add your own TMDB API key:
   `VITE_TMDB_API_KEY=your_tmdb_api_key_here`
5. Start the app:
   `npm run dev`
6. Open the link shown in the terminal (usually http://localhost:5173).

## Notes on the API key

The TMDB v3 API key is designed for browser use. It is stored in an `.env` file that is excluded from GitHub by `.gitignore`; only `.env.example` with a placeholder is committed.

## Folder structure

- `src/components`: reusable components (Layout, MovieCard, MovieRow, BrowsePage, Loader)
- `src/pages`: Home, Movies, TVShows, Details, Search, Watchlist
- `src/services`: all TMDB API calls
- `src/context`: watchlist state shared across the app
- `src/theme`: Material UI dark theme

## Author

WAIHE SAMUEL, M26B13/050