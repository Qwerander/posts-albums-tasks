import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetAlbums } from "../../store/slices/albumsSlice";
import { AlbumsList } from "../../components/albums/albumsList/AlbumsList";
import { Layout, Space } from 'antd';
import { useState } from "react";
import { Filters } from "../../components/posts/filters/Filters";

export const AlbumsPage = () => {
  const dispatch = useDispatch();
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [onlyFavorite, setOnlyFavorite] = useState(false)
  const [reversList, setReversList] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { albums, users } = useSelector(state => state.albums)
  const favoriteAlbums = useSelector(state => state.albums.favoriteAlbums)


  const handleUserSelectChange = (selectedUserIds) => {
    setSelectedUserIds(selectedUserIds);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const filteredAlbums = albums.filter(album => {
    const isTitleMatched = album.title.toLowerCase().includes(searchValue.toLowerCase());
    const isUserMatched = selectedUserIds.length === 0 || selectedUserIds.includes(album.userId);
    return isTitleMatched && isUserMatched;
  });

  const filteredAlbumsByFavorites = onlyFavorite
    ? filteredAlbums.filter(album => favoriteAlbums.hasOwnProperty(album.id) && favoriteAlbums[album.id])
    : filteredAlbums;

  const reversedAlbums = [...filteredAlbumsByFavorites].reverse();
  const displayedAlbums = reversList ? reversedAlbums : filteredAlbumsByFavorites;

  useEffect(() => {
    if (!albums?.length) {
      dispatch(fetchgetAlbums())
    }
  }, [dispatch, albums]);

  return (
    <Layout>
      <Space direction="vertical" style={{ marginBottom: '12px', padding: '50px 25px 50px' }}>
        <Filters
          onChangeUser={handleUserSelectChange}
          onSearch={handleSearchChange}
          setOnlyFavorite={setOnlyFavorite}
          setReversList={setReversList}
          users={users}
        />
        <AlbumsList
          albums={displayedAlbums}
        />
      </Space>
    </Layout>

  )
}







