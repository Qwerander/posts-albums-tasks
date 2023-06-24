import React, { useEffect } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { PostsPage } from './pages/postsPage/PostsPage';

import { HeaderComponent } from './components/header/Header';
import { AlbumsPage } from './pages/albumsPage/AlbumsPage';
import { TodosPage } from './pages/todosPage/TodosPage';


export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('posts')
  }, []);

  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route path="posts" element={<PostsPage />} />
        <Route path="albums" element={<AlbumsPage />} />
        <Route path="todos" element={<TodosPage />} />
      </Routes>
    </>

  );
};
