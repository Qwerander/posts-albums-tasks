import { configureStore } from '@reduxjs/toolkit';
import posts from './slices/postsSlice';
import todos from './slices/todosSlice';
import albums from './slices/albumsSlice';

export const store = configureStore({
  reducer: {
    posts,
    albums,
    todos,
  },
});
