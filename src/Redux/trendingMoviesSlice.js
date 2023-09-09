import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../Custom/custom";


let initialState={
  movies:[],
  loading:false,
  error:null
}

export const Trending = createAsyncThunk("trendingMoviesSlice/Trending", async ({mediaItem,page})=>{
  let {data} = await baseUrl.get(`/trending/${mediaItem}/week?api_key=146f9a97e85c0165202eaff23cb6c1f5&page=${page}`)
  return data

})
export const trendingMoviesSlice = createSlice({
  name: "trendingMovies",
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder.addCase(Trending.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(Trending.fulfilled,(state,action)=>{
      state.loading = false;
      state.movies = action.payload
    })
    builder.addCase(Trending.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    })
  } 
  
})

export const trendingReducer = trendingMoviesSlice.reducer
