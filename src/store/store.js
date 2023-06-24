import { configureStore } from '@reduxjs/toolkit';
import posts from './slices/postsSlice';
import todos from './slices/todosSlice';
import albums from './slices/albumsSlice';
// import users from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    posts,
    albums,
    todos,
  },
});
