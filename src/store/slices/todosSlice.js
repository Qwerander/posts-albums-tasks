import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteTodo, getTodos, patchTodo, postTodo } from '../../api/api';

const initialState = {
  todos: [],
};

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

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetTodos.fulfilled, (state, action) => {
        state.todos = action.payload.sort((a, b) => {
          if (a.completed && !b.completed) {
            return 1;
          } else if (!a.completed && b.completed) {
            return -1;
          } else {
            return 0;
          }
        });
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

// export const { } = todosSlice.actions;

export default todosSlice.reducer;
