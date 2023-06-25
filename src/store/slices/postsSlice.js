import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  deletePost,
  getComments,
  getPosts,
  getUsers,
  patchPost,
} from '../../api/api';

const initialState = {
  posts: [],
  comments: {},
  favoritePosts: {}
};

export const fetchGetPosts = createAsyncThunk('posts/getPosts', async () => {
  const response = await getPosts();
  const posts = response.data;

  const usersResponse = await getUsers();
  const users = usersResponse.data;

  const postsWithUsers = posts.map((post) => {
    const user = users.find((user) => user.id === post.userId);
    return { ...post, user };
  });

  return postsWithUsers;
});

export const fetchPatchPost = createAsyncThunk(
  'posts/patchPost',
  async ({ id, data }) => {
    const response = await patchPost(id, data);
    return response.data;
  }
);

export const fetchDeletePost = createAsyncThunk(
  'posts/deletePost',
  async (id) => {
    await deletePost(id);
    return id;
  }
);

export const fetchGetComments = createAsyncThunk(
  'posts/getComments',
  async (id) => {
    const response = await getComments(id);
    const comments = response.data;
    const commentsByPostId = { [id]: comments };
    return commentsByPostId;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changeUserName: (state, action) => {
      const { id, newName } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === id);
      if (postIndex !== -1) {
        state.posts[postIndex].user.name = newName;
      }
    },
    setFavotie: (state, action) => {
      state.favoritePosts = {...state.favoritePosts, [action.payload.id]: action.payload.bool }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchPatchPost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const index = state.posts.findIndex(
          (post) => post.id === updatedPost.id
        );
        if (index !== -1) {
          state.posts[index] = { ...state.posts[index], ...updatedPost };
        }
      })
      .addCase(fetchDeletePost.fulfilled, (state, action) => {
        const deletedPostId = action.payload;
        state.posts = state.posts.filter((post) => post.id !== deletedPostId);
      })
      .addCase(fetchGetComments.fulfilled, (state, action) => {
        state.comments = { ...state.comments, ...action.payload };
      });
  },
});

export const { changeUserName, setFavotie } = postsSlice.actions;

export default postsSlice.reducer;
