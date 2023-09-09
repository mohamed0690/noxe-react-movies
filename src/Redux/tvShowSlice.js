import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../Custom/custom";

let initialState ={movies:{}}

export let tvSeries = createAsyncThunk('getTvSeries',async ({mediaItem,page})=>{
  let {data} = await baseUrl.get(`/tv/${mediaItem}?api_key=146f9a97e85c0165202eaff23cb6c1f5&page=${page}`)
  return data
})


export const tvShowSlice = createSlice({
  name:`tvShow`,
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
  builder.addCase("fulfilled",(state,action)=>{
  state.movies=action.payload
  })
  builder.addCase("rejected",(state)=>{
    state.movies='failed'
  })
  }
  
})

export const tvShowReducer = tvShowSlice.reducer