import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../Custom/custom";


let initialState = {
  actorsDetailsData:{},
  MoviesData:[],
  loading:false,
  error:null,
}

export const getActorsDetails = createAsyncThunk("actorsDetailsSlice/getActorsDetails", async(id)=>{
  let {data} = await baseUrl.get(`/person/${id}?api_key=146f9a97e85c0165202eaff23cb6c1f5`)
  return data
})

export const getActorsMovies = createAsyncThunk("actorsDetailsSlice/getActorsMovies", async(id)=>{
  let {data} = await baseUrl.get(`/person/${id}/movie_credits?api_key=146f9a97e85c0165202eaff23cb6c1f5`)
  return data
})

export const actorsDetailsSlice = createSlice({
  name: "actors",
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(getActorsDetails.pending,(state)=>{
      state.loading= true
    })
    builder.addCase(getActorsDetails.fulfilled,(state,action)=>{
      state.loading= false;
      state.actorsDetailsData = action.payload
    })
    builder.addCase(getActorsDetails.rejected,(state,action)=>{
      state.loading= false
      state.error = action.error.message;
    })

    builder.addCase(getActorsMovies.pending,(state)=>{
      state.loading= true
    })
    builder.addCase(getActorsMovies.fulfilled,(state,action)=>{
      state.loading= false;
      state.MoviesData = action.payload
    })
    builder.addCase(getActorsMovies.rejected,(state,action)=>{
      state.loading= false
      state.error = action.error.message;
    })
  }
})

export const actorsDetailsReducer = actorsDetailsSlice.reducer