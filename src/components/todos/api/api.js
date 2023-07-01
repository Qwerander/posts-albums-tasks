import { apiRequest } from '../../../api/instanceApi';

// получение задач
export const getTodos = async () => {
  const response = await apiRequest.get('/todos');
  return response;
};

// добавление задачи
export const postTodo = async (data) => {
  const response = await apiRequest.post(`/todos`, data);
  return response;
};

// изменение задачи по id
export const patchTodo = async (id, data) => {
  const response = await apiRequest.patch(`/todos/${id}`, data);
  return response;
};

// удаление задачи по id
export const deleteTodo = async (id) => {
  await apiRequest.delete(`/todos/${id}`);
};
