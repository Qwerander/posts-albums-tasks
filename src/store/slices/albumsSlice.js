import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAlbums } from '../../api/api';

const initialState = {
  albums: [],
  page_size: 10,
  isLoading: false,
};

export const fetchgetAlbums = createAsyncThunk(
  'albums/getAlbums',
  async () => {
    const response = await getAlbums();
    return response.data;
  }
);

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchgetAlbums.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchgetAlbums.fulfilled, (state, action) => {
        state.isLoading = false;
        state.albums = action.payload;
      });
  },
});

// export const { } = albumsSlice.actions;

export default albumsSlice.reducer;
