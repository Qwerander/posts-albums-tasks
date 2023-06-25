import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostsList } from "../../components/posts/postsList/PostsList";
import { Button, Layout, Space } from 'antd';
import { useState } from "react";
import { Filters } from "../../components/posts/filters/Filters";
import { AddNewPost } from "../../components/posts/modal/AddNewPost";
import { fetchgetAlbums } from "../../store/slices/albumsSlice";
import { AlbumsList } from "../../components/albums/albumsList/AlbumsList";

export const AlbumsPage = () => {
  const dispatch = useDispatch();
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [onlyFavorite, setOnlyFavorite] = useState(false)
  const [reversList, setReversList] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const albums = useSelector(state => state.albums.albums)
  const favoriteAlbums = useSelector(state => state.albums.favoriteAlbums)
 
  useEffect(() => {
    if (!albums?.length) {
      dispatch(fetchgetAlbums())
    }
  }, [dispatch, albums]);

  return (
    <Layout>
        <Space direction="vertical" style={{marginBottom: '12px', padding: '50px 25px 50px'}}>
            {/* <Filters
                onChangeUser={handleUserSelectChange}
                onSearch={handleSearchChange}
                setOnlyFavorite={setOnlyFavorite}
                setReversList={setReversList}
            /> */}
            <AlbumsList
                albums={albums}
            />
        </Space>
  
    </Layout>

)
}







