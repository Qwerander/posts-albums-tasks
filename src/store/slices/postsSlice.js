import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  deletePost,
  getComments,
  getPosts,
  getUsers,
  patchPost,
  postPost,
} from '../../api/api';

const initialState = {
  posts: [],
  users: [],
  comments: {},
  favoritePosts: {},
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

  return { postsWithUsers, users };
});

export const fetchPostPost = createAsyncThunk(
  'posts/postPost',
  async (data) => {
    const response = await postPost(data);
    return response.data;
  }
);

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
    setFavotie: (state, action) => {
      state.favoritePosts = {
        ...state.favoritePosts,
        [action.payload.id]: action.payload.bool,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetPosts.fulfilled, (state, action) => {
        state.posts = action.payload.postsWithUsers;
        state.users = action.payload.users;
      })
      .addCase(fetchPatchPost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const user = state.users.find(
          (user) => user.id === updatedPost.userId
        );
        const index = state.posts.findIndex(
          (post) => post.id === updatedPost.id
        );
        if (index !== -1) {
          state.posts[index] = { ...updatedPost, user }
        }
      })
      .addCase(fetchPostPost.fulfilled, (state, action) => {
        const newPost = action.payload;
        const author = state.users.find(
          (user) => user.id === newPost.userId
        );
        state.posts.push({ ...newPost, user: author })
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

export const { setFavotie } = postsSlice.actions;

export default postsSlice.reducer;
