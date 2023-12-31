import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteAlbum,
  getAlbums,
  getPhotos,
  getUsers,
  patchAlbum,
} from '../api';

export const fetchgetAlbums = createAsyncThunk('albums/getAlbums', async () => {
  try {
    const response = await getAlbums();
    const albums = response.data;

    const usersResponse = await getUsers();
    const users = usersResponse.data;

    const albumsWithUsers = albums.map((album) => {
      const user = users.find((user) => user.id === album.userId);
      return { ...album, user };
    });
    return { albumsWithUsers, users };
  } catch (error) {
    return { error: error.message };
  }
});

export const fetchPatchAlbum = createAsyncThunk(
  'posts/patchAlbum',
  async ({ id, data }) => {
    try {
      const response = await patchAlbum(id, data);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const fetchDeleteAlbum = createAsyncThunk(
  'posts/deleteAlbum',
  async (id) => {
    try {
      await deleteAlbum(id);
      return id;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const fetchGetPhotos = createAsyncThunk(
  'posts/photosByAlbum',
  async () => {
    try {
      const response = await getPhotos();

      const photosByAlbum = response.data.reduce((acc, photo) => {
        const albumId = photo.albumId;

        if (!acc[albumId]) {
          acc[albumId] = [];
        }

        acc[albumId].push(photo);

        return acc;
      }, {});

      return photosByAlbum;
    } catch (error) {
      return { error: error.message };
    }
  }
);
