import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrl } from './../Custom/custom';

let initialState = {
  searchData:[],
  loading:false,
  error:null
}


export const searching = createAsyncThunk("searchSlice/searching", async ({type,page})=>{
  let {data} = await baseUrl.get(`https://api.themoviedb.org/3/search/multi?api_key=146f9a97e85c0165202eaff23cb6c1f5&query=${type}&page=${page}`)
  return data
})


export const searchSlice =createSlice({
  name: 'search',
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(searching.pending,(state)=>{
      state.loading = false
    })
    builder.addCase(searching.fulfilled,(state,action)=>{
      state.loading = true
      state.searchData = action.payload
    })
    builder.addCase(searching.rejected,(state,action)=>{
      state.loading = false
      state.error = action.error.message
    })

  }
})

export const searchReducer = searchSlice.reducer