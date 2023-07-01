import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deletePost,
  getComments,
  getPosts,
  getUsers,
  patchPost,
  postPost,
} from '../api';

export const fetchGetPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const response = await getPosts();
    const posts = response.data;

    const usersResponse = await getUsers();
    const users = usersResponse.data;

    const postsWithUsers = posts.map((post) => {
      const user = users.find((user) => user.id === post.userId);
      return { ...post, user };
    });

    return { postsWithUsers, users };
  } catch (error) {
    return { error: error.message };
  }
});

export const fetchPostPost = createAsyncThunk(
  'posts/postPost',
  async (data) => {
    try {
      const response = await postPost(data);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const fetchPatchPost = createAsyncThunk(
  'posts/patchPost',
  async ({ id, data }) => {
    try {
      const response = await patchPost(id, data);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const fetchDeletePost = createAsyncThunk(
  'posts/deletePost',
  async (id) => {
    try {
      await deletePost(id);
      return id;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const fetchGetComments = createAsyncThunk(
  'posts/getComments',
  async (id) => {
    try {
      const response = await getComments(id);
      const comments = response.data;
      const commentsByPostId = { [id]: comments };
      return commentsByPostId;
    } catch (error) {
      return { error: error.message };
    }
  }
);
