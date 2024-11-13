import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import TopRatedMovies from "./pages/topRatesMovies";
import TrendingMovies from "./pages/trendingMovies";
import RecommendedMovies from "./components/recommendedMovies"; 
import MovieActors from "./components/movieActors"; 
import ActorMoviePage from "./pages/actorMoviePage";
import HomePageLogIn from "./pages/homePageLogIn"; // Your home page with authentication

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for a long time
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/home" element={<HomePage />} />
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/homePageLogIn" element={<HomePageLogIn />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/topRated" element={<TopRatedMovies />} />
            <Route path="/movies/trending" element={<TrendingMovies/>} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies/:id/recommendations" element={<RecommendedMovies />} />
            <Route path="/movies/:id/actors" element={<MovieActors />} />
            <Route path="/actor/:actorId/movies" element={<ActorMoviePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);