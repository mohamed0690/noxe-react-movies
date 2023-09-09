import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../Custom/custom";


let initialState={
  moviesData:[],
  moviesGenreData:[],
  loading:false,
  error:null
}

export const moviesSortedBy = createAsyncThunk("moviesSortedBySlice/moviesSortedBy", async ({mediaItem,page})=>{
  let {data} = await baseUrl.get(`/discover/movie?sort_by=${mediaItem}.desc&api_key=146f9a97e85c0165202eaff23cb6c1f5&page=${page}`)
  return data
})

export const moviesGenre = createAsyncThunk("moviesSortedBySlice/moviesSortedBy", async ({id,page})=>{
  let {data} = await baseUrl.get(`/discover/movie?api_key=146f9a97e85c0165202eaff23cb6c1f5&with_genres=${id}&page=${page}`)
  return data
})


export const moviesSortedBySlice = createSlice({
  name: "moviesSortedBy",
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder.addCase(moviesSortedBy.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(moviesSortedBy.fulfilled,(state,action)=>{
      state.loading = false;
      state.moviesData = action.payload
    })
    builder.addCase(moviesSortedBy.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    })

    builder.addCase(moviesGenre.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(moviesGenre.fulfilled,(state,action)=>{
      state.loading = false;
      state.moviesGenreData = action.payload
    })
    builder.addCase(moviesGenre.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    })

  } 
  
})

