import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTodo, getTodos, patchTodo, postTodo } from '../api';

export const fetchGetTodos = createAsyncThunk('todos/getTodos', async () => {
  try {
    const response = await getTodos();
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
});

export const fetchPatchTodo = createAsyncThunk(
  'todos/postTodo',
  async ({ id, data }) => {
    try {
      const response = await patchTodo(id, data);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const fetchPostTodo = createAsyncThunk(
  'todos/patchTodo',
  async (data) => {
    try {
      const response = await postTodo(data);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const fetchDeleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    try {
      await deleteTodo(id);
      return { id };
    } catch (error) {
      return { error: error.message };
    }
  }
);
