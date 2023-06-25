import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGetPhotos } from '../../store/slices/albumsSlice';
import { AlbumMini } from '../../components/album/albumMini/albumMini';
import { Layout, Space } from 'antd';

export const AlbumFotos = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const photos = useSelector(state => state.albums.photos[id])
  console.log(photos);
  useEffect(() => {
    if (!photos) {
      dispatch(fetchGetPhotos())
    }
  }, [photos, dispatch, id])

  return (
    <Layout>
      <Space direction="vertical" style={{ marginBottom: '12px', padding: '50px 25px 50px' }}>
        <AlbumMini album={photos} />
      </Space>
    </Layout>
  )
}
