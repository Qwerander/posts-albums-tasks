import styles from './post.module.css'
import { List, Checkbox } from 'antd';
import { ReactComponent as CommentsSvg } from '../../../img/comments.svg';
import { ReactComponent as DeleteSvg } from '../../../img/delete.svg'
import { ReactComponent as EditSvg } from '../../../img/edit.svg'
import { ReactComponent as FavoriteSvg } from '../../../img/favorite.svg'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchDeletePost, fetchGetComments, setFavotie } from '../../../store/slices/postsSlice';
import { CommentsList } from '../comments/CommentsList';
import { EditForm } from '../editForm/EditForm';
import { ModalDeleteConfirum } from '../modal/ModalDeleteConfirum';

export const Post = ({ post, checked, onChange }) => {
  const dispatch = useDispatch();
  const [isCommentsOpen, toggleIsCommentsOpen] = useState(false)
  const [isEditMode, toggleIEditMode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isFavorite = useSelector(state => state.posts.favoritePosts[post.id])
  const comments = useSelector(state => state.posts.comments[`${post.id}`])

  const handleFavoriteClick = () => {
    dispatch(setFavotie({ id: post.id, bool: !isFavorite }))
  };

  const handleCommentsClick = () => {
    toggleIsCommentsOpen(prev => !prev)
    if (!comments?.length) {
      dispatch(fetchGetComments(post.id))
    }

  };

  const deleteConfirum = () => {
    dispatch(fetchDeletePost(post.id))
  }

  return (
    <>
      <List.Item
        className={styles.item}
        key={post.id}
        actions={[
          <CommentsSvg onClick={() => handleCommentsClick()} style={isCommentsOpen ? { stroke: '#1677ff' } : null} />,
          <EditSvg onClick={() => toggleIEditMode(prev => !prev)} style={isEditMode ? { fill: '#1677ff' } : null} />,
          <DeleteSvg onClick={() => setIsModalOpen(true)} />,
          <FavoriteSvg onClick={handleFavoriteClick} style={isFavorite ? { fill: '#1677ff' } : null} />,
        ]}
      >
        <List.Item.Meta
          title={!isEditMode && `${post.id}. ${post.title}`}
        />
        {isEditMode ?
          <EditForm
            id={post.id}
            userId={post.userId}
            body={post.body}
            title={post.title}
            author={post.user.name}
            close={toggleIEditMode}
          />
          : <>
            <p>{post.body}</p>
            <p className={styles.author}>Author: {post.user.name}</p>
          </>
        }

        <Checkbox
          checked={checked}
          onChange={onChange}
        >
          выбрать
        </Checkbox>
        {(isCommentsOpen && comments) && <CommentsList comments={comments} />}
      </List.Item>
      <ModalDeleteConfirum
        deleteConfirum={deleteConfirum}
        isOpen={isModalOpen}
        setIsopen={setIsModalOpen}
      />
    </>
  )
}
