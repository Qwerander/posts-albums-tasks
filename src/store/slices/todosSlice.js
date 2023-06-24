import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTodos } from '../../api/api';

const initialState = {
  todos: [],
  page_size: 10,
  isLoading: false,
};

export const fetchGetTodos = createAsyncThunk(
  'todos/getTodos',
  async () => {
    const response = await getTodos();
    return response.data;
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      });
  },
});

// export const { } = todosSlice.actions;

export default todosSlice.reducer;
