// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { getUser } from '../../api/api';

// const initialState = {
//   users: [],
//   isLoading: false,
// };

// export const fetchGetUser = createAsyncThunk('users/getUser', async (id) => {
//   const response = await getUser(id);
//   return response.data;
// });

// export const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchGetUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchGetUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         const userIndex = state.users.findIndex(
//           (user) => user.id === action.payload.id
//         );
//         if (userIndex >= 0) {
//           state.users[userIndex] = action.payload;
//         } else {
//           state.users.push(action.payload);
//         }
//       });
//   },
// });

// // export const { } = usersSlice.actions;

// export default usersSlice.reducer;
