import styles from './album.module.css'
import { List, Checkbox } from 'antd';
import { ReactComponent as DeleteSvg } from '../../../img/delete.svg'
import { ReactComponent as EditSvg } from '../../../img/edit.svg'
import { ReactComponent as FavoriteSvg } from '../../../img/favorite.svg'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { EditForm } from '../editForm/EditForm';
import { fetchDeleteAlbum, setFavotie } from '../../../store/slices/albumsSlice';
import { ModalDeleteConfirum } from '../../posts/modal/ModalDeleteConfirum';
import { Link } from 'react-router-dom';


export const Album = ({ album, checked, onChange }) => {
  const dispatch = useDispatch();
  const [isEditMode, toggleIEditMode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isFavorite = useSelector(state => state.albums.favoriteAlbums[album.id])

  const handleFavoriteClick = () => {
    dispatch(setFavotie({ id: album.id, bool: !isFavorite }))
  };


  const deleteConfirum = () => {
    dispatch(fetchDeleteAlbum(album.id))
  }

  return (
    <>
      <List.Item
        className={styles.item}
        key={album.id}
        actions={[
          <EditSvg onClick={() => toggleIEditMode(prev => !prev)} style={isEditMode ? { fill: '#1677ff' } : null} />,
          <DeleteSvg onClick={() => setIsModalOpen(true)} />,
          <FavoriteSvg onClick={handleFavoriteClick} style={isFavorite ? { fill: '#1677ff' } : null} />,
        ]}
      >
        <List.Item.Meta
          title={!isEditMode &&
            <Link className={styles.link} to={`${album.id}`}>
              {`${album.id}. ${album.title}`}
            </Link>}
        />
        {isEditMode
          ? <div className={styles.edit}>
            <EditForm
              id={album.id}
              userId={album.userId}
              title={album.title}
              author={album.user.name}
              close={toggleIEditMode}
            />
          </div>
          : <p className={styles.author}>Author: {album.user?.name}</p>
        }

        <Checkbox
          checked={checked}
          onChange={onChange}
        >
          Checked
        </Checkbox>
      </List.Item>
      <ModalDeleteConfirum
        deleteConfirum={deleteConfirum}
        isOpen={isModalOpen}
        setIsopen={setIsModalOpen}
      />
    </>
  )
}
