import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPosts } from '../../api/api';

const initialState = {
  posts: [],
  page_size: 10,
  isLoading: false,
};

export const fetchGetPosts = createAsyncThunk(
  'posts/getPosts',
  async () => {
    const response = await getPosts();
    return response.data;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      });
  },
});

// export const { } = postsSlice.actions;

export default postsSlice.reducer;
