import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import styles from './header.module.css'
import { useLocation, useNavigate } from 'react-router-dom';

export const HeaderComponent = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Header className={styles.header}>
      <Button
        type="link"
        onClick={() => navigate('/posts')}
        className={pathname === '/posts' ? styles.active : null}
      >
        Посты
      </Button>
      <Button
        type="link"
        onClick={() => navigate('albums')}
        className={pathname === '/albums' ? styles.active : null}
      >
        Фото
      </Button>
      <Button
        type="link"
        onClick={() => navigate('/todos')}
        className={pathname === '/todos' ? styles.active : null}
      >
        Задачи
      </Button>
    </Header>
  );

};
