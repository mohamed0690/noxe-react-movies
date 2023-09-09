import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../Custom/custom";

let initialState = {
  movies:[],
  loading:false,
  error:null
}

export const moviesList = createAsyncThunk("moviesList",async ({mediaItem,page}) =>{
  let {data} = await baseUrl.get (`/movie/${mediaItem}?api_key=146f9a97e85c0165202eaff23cb6c1f5&page=${page}`)
  return data
})

export const moviesListSlice = createSlice({
  name:"moviesSlice",
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(moviesList.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(moviesList.fulfilled,(state,action)=>{
      state.loading = false;
      state.movies = action.payload
    })
    builder.addCase(moviesList.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    })
  }
})

export const moviesListReducer = moviesListSlice.reducer


