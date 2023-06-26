import { configureStore } from '@reduxjs/toolkit';
import posts from '../components/posts/api/store/postsSlice';
import todos from '../components/todos/api/store/todosSlice';
import albums from '../components/albums/api/store/albumsSlice';

export const store = configureStore({
  reducer: {
    posts,
    albums,
    todos,
  },
});
