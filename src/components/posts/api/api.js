import { apiRequest } from '../../../api/instanceApi';

// получение постов
export const getPosts = async () => {
  const response = await apiRequest.get('/posts');
  return response;
};

// добавление поста
export const postPost = async (data) => {
  const response = await apiRequest.post('/posts', data);
  return response;
};

// изменение поста по id
export const patchPost = async (id, data) => {
  const response = await apiRequest.patch(`/posts/${id}`, data);
  return response;
};

// удаление поста по id
export const deletePost = async (id) => {
  await apiRequest.delete(`/posts/${id}`);
};

// получение пользователей
export const getUsers = async () => {
  const response = await apiRequest.get('/users');
  return response;
};

// получение комментариев
export const getComments = async (id) => {
  const response = await apiRequest.get(`/comments?postId=${id}`);
  return response;
};
