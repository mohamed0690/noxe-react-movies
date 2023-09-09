import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../Custom/custom";

let initialState = {
  movieData: {},
  movieLinksData:[],
  actorsData:[],
  videosData:{},
  recommendationsData:[],
  loading:false,
  error:null
}

export const movieDetails = createAsyncThunk("movieDetailsSlice/movieDetails", async ({media,id})=>{
let {data} = await baseUrl.get(`/${media}/${id}?api_key=146f9a97e85c0165202eaff23cb6c1f5&language=en-US`)
return data
})

export const movieLinks = createAsyncThunk("movieDetailsSlice/movieLinks", async ({media,id})=>{
  let {data} = await baseUrl.get(`/${media}/${id}/watch/providers?api_key=146f9a97e85c0165202eaff23cb6c1f5`)
  return data.results
  })

export const movieActors = createAsyncThunk("movieDetailsSlice/movieActors", async ({media,id})=>{
  let {data} = await baseUrl.get(`/${media}/${id}/credits?api_key=146f9a97e85c0165202eaff23cb6c1f5`)
  return data.cast
  })

export const movieVideos = createAsyncThunk("movieDetailsSlice/movieVideos", async ({media,id})=>{
  let {data} = await baseUrl.get(`/${media}/${id}/videos?api_key=146f9a97e85c0165202eaff23cb6c1f5`)
  return data.results
  })

export const recommendationsMovies = createAsyncThunk("movieDetailsSlice/recommendationsMovies", async ({media,id})=>{
  let {data} = await baseUrl.get(`/${media}/${id}/recommendations?api_key=146f9a97e85c0165202eaff23cb6c1f5`)
  return data.results
  })

  
export const movieDetailsSlice = createSlice({
  name: "Movie",
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(movieDetails.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(movieDetails.fulfilled,(state,action)=>{
      state.loading = false;
      state.movieData = action.payload
    })
    builder.addCase(movieDetails.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    })

    builder.addCase(movieLinks.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(movieLinks.fulfilled,(state,action)=>{
      state.loading = false;
      state.movieLinksData = action.payload
    })
    builder.addCase(movieLinks.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    })

    builder.addCase(movieActors.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(movieActors.fulfilled,(state,action)=>{
      state.loading = false;
      state.actorsData = action.payload
    })
    builder.addCase(movieActors.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    })

    builder.addCase(movieVideos.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(movieVideos.fulfilled,(state,action)=>{
      state.loading = false;
      state.videosData = action.payload
    })
    builder.addCase(movieVideos.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    })

    builder.addCase(recommendationsMovies.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(recommendationsMovies.fulfilled,(state,action)=>{
      state.loading = false;
      state.videosData = action.payload
    })
    builder.addCase(recommendationsMovies.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    })

  }
})

export const movieDetailsReducer = movieDetailsSlice.reducer