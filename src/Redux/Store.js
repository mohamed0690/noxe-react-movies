import { configureStore } from "@reduxjs/toolkit";
import { trendingReducer } from "./trendingMoviesSlice";
import { tvShowReducer } from "./tvShowSlice";
import { tvShowSortedReducer } from "./TvShowSortedBySlice";
import { searchReducer } from './searchSlice';
import { moviesListReducer } from './moviesListSlice';
import { movieDetailsReducer } from "./movieDetailsSlice";
import { actorsDetailsReducer } from "./actorsDetailsSlice";

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    tvShow: tvShowReducer,
    tvShowSorted:tvShowSortedReducer,
    search:searchReducer,
    moviesList:moviesListReducer,
    movieDetails:movieDetailsReducer,
    actorsDetails:actorsDetailsReducer
  },
});
