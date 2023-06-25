import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteAlbum, getAlbums, getUsers, patchAlbum } from '../../api/api';

const initialState = {
  albums: [],
  users: [],
  favoriteAlbums: {},
};

export const fetchgetAlbums = createAsyncThunk('albums/getAlbums', async () => {
  const response = await getAlbums();
  const albums = response.data;

  const usersResponse = await getUsers();
  const users = usersResponse.data;

  const albumsWithUsers = albums.map((album) => {
    const user = users.find((user) => user.id === album.userId);
    return { ...album, user };
  });
  return { albumsWithUsers, users };
});

export const fetchPatchAlbum = createAsyncThunk(
  'posts/patchAlbum',
  async ({ id, data }) => {
    const response = await patchAlbum(id, data);
    return response.data;
  }
);

export const fetchDeleteAlbum = createAsyncThunk(
  'posts/deleteAlbum',
  async (id) => {
    await deleteAlbum(id);
    return id;
  }
);

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    changeUserName: (state, action) => {
      const { id, newName } = action.payload;
      const albumIndex = state.albums.findIndex((album) => album.id === id);
      if (albumIndex !== -1) {
        state.albums[albumIndex].user.name = newName;
      }
    },
    setFavotie: (state, action) => {
      state.favoriteAlbums = {
        ...state.favoriteAlbums,
        [action.payload.id]: action.payload.bool,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchgetAlbums.fulfilled, (state, action) => {
        state.albums = action.payload.albumsWithUsers;
        state.users = action.payload.users;
      })
      .addCase(fetchPatchAlbum.fulfilled, (state, action) => {
        const updatedAlbum = action.payload;
        const index = state.albums.findIndex(
          (album) => album.id === updatedAlbum.id
        );
        if (index !== -1) {
          state.albums[index] = { ...state.albums[index], ...updatedAlbum };
        }
      })
      .addCase(fetchDeleteAlbum.fulfilled, (state, action) => {
        const deletedAlbumId = action.payload;
        state.albums = state.albums.filter(
          (album) => album.id !== deletedAlbumId
        );
      });
  },
});

export const { changeUserName, setFavotie } = albumsSlice.actions;

export default albumsSlice.reducer;
