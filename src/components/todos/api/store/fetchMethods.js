import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTodo, getTodos, patchTodo, postTodo } from '../api';

export const fetchGetTodos = createAsyncThunk('todos/getTodos', async () => {
  const response = await getTodos();
  return response.data;
});

export const fetchPatchTodo = createAsyncThunk(
  'todos/postTodo',
  async ({ id, data }) => {
    const response = await patchTodo(id, data);
    return response.data;
  }
);

export const fetchPostTodo = createAsyncThunk(
  'todos/patchTodo',
  async (data) => {
    const response = await postTodo(data);
    return response.data;
  }
);

export const fetchDeleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    await deleteTodo(id);
    return { id };
  }
);
