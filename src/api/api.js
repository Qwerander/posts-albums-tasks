import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/';

export const apiRequest = axios.create({
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: API_URL,
});

// получение постов
export const getPosts = async () => {
  const response = await apiRequest.get('/posts');
  return response
};

// получение альбомов
export const getAlbums = async () => {
  const response = await apiRequest.get('/albums');
  return response
};

// получение задач
export const getTodos = async () => {
  const response = await apiRequest.get('/todos');
  return response
};
