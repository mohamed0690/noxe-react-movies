import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../Custom/custom";


let initialState={
  tvMoviesData:[],
  tvMoviesGenreData:[],
  loading:false,
  error:null
}

export const tvMoviesSortedBy = createAsyncThunk("tvShowSortedBySlice/tvMoviesSortedBy", async ({mediaItem,page})=>{
  let {data} = await baseUrl.get(`/discover/tv?sort_by=${mediaItem}.desc&api_key=146f9a97e85c0165202eaff23cb6c1f5&page=${page}`)
  return data
})

export const tvMoviesGenre = createAsyncThunk("tvShowSortedBySlice/tvMoviesGenre", async ({id,page})=>{
  let {data} = await baseUrl.get(`/discover/tv?api_key=146f9a97e85c0165202eaff23cb6c1f5&with_genres=${id}&page=${page}`)
  return data
})


export const tvShowSortedBySlice = createSlice({
  name: "tvShowSortedBy",
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder.addCase(tvMoviesSortedBy.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(tvMoviesSortedBy.fulfilled,(state,action)=>{
      state.loading = false;
      state.tvMoviesData = action.payload
    })
    builder.addCase(tvMoviesSortedBy.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    })

    builder.addCase(tvMoviesGenre.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(tvMoviesGenre.fulfilled,(state,action)=>{
      state.loading = false;
      state.tvMoviesGenreData = action.payload
    })
    builder.addCase(tvMoviesGenre.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    })

  } 
  
})

export const tvShowSortedReducer = tvShowSortedBySlice.reducer