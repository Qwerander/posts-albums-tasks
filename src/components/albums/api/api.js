import { apiRequest } from '../../../api/instanceApi';

// получение альбомов
export const getAlbums = async () => {
  const response = await apiRequest.get('/albums');
  return response;
};

// изменение альбомапо id
export const patchAlbum = async (id, data) => {
  const response = await apiRequest.patch(`/albums/${id}`, data);
  return response;
};

// удфление альбома по id
export const deleteAlbum = async (id) => {
  await apiRequest.delete(`/albums/${id}`);
};

// получение фото
export const getPhotos = async () => {
  const response = await apiRequest.get(`/photos/`);
  return response;
};

// получение пользователей
export const getUsers = async () => {
  const response = await apiRequest.get('/users');
  return response;
};
