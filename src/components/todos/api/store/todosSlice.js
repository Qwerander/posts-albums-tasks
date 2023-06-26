import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDeleteTodo,
  fetchGetTodos,
  fetchPatchTodo,
  fetchPostTodo,
} from './fetchMethods';

const initialState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(fetchPostTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(fetchPatchTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = { ...state.todos[index], ...action.payload };
        }
      })
      .addCase(fetchDeleteTodo.fulfilled, (state, action) => {
        const deletedTodoId = action.payload.id;
        state.todos = state.todos.filter((post) => post.id !== deletedTodoId);
      });
  },
});

export default todosSlice.reducer;
