import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Menu selectedKeys={[pathname]} mode="horizontal">
      <Menu.Item key="/posts" onClick={() => navigate('/posts')}>
        Посты
      </Menu.Item>
      <Menu.Item key="/albums" onClick={() => navigate('/albums')}>
        Фото
      </Menu.Item>
      <Menu.Item key="/todos" onClick={() => navigate('/todos')}>
        Задачи
      </Menu.Item>
    </Menu>
  );
};