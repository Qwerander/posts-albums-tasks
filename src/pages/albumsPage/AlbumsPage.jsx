import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlbumsList } from "../../components/albums/albumsList/AlbumsList";
import { Layout, Space } from 'antd';
import { useState } from "react";
import { Filters } from "../../components/posts/filters/Filters";
import { restoreFavoriteAlbums } from "../../components/albums/api/store/albumsSlice";
import { fetchgetAlbums } from "../../components/albums/api/store/fetchMethods";
import { displayedList } from "../../components/share/displayedList";

export const AlbumsPage = () => {
	const dispatch = useDispatch();
	const [selectedUserIds, setSelectedUserIds] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [onlyFavorite, setOnlyFavorite] = useState(false)
	const [reversList, setReversList] = useState(false)
	const [sortType, setSortType] = useState(3);
	const { albums, users } = useSelector(state => state.albums)
	const favoriteAlbums = useSelector(state => state.albums.favoriteAlbums)

	const handleUserSelectChange = (selectedUserIds) => {
		setSelectedUserIds(selectedUserIds);
	};

	const handleSearchChange = (value) => {
		setSearchValue(value);
	};

	const onSortChange = (e) => {
		setSortType(e.target.value);
	};

	const filteredAlbums = albums.filter(album => {
		const isTitleMatched = album.title.toLowerCase().includes(searchValue.toLowerCase());
		const isUserMatched = selectedUserIds.length === 0 || selectedUserIds.includes(album.userId);
		return isTitleMatched && isUserMatched;
	});

	const filteredList = onlyFavorite
		? filteredAlbums.filter(album => favoriteAlbums.hasOwnProperty(album.id) && favoriteAlbums[album.id])
		: filteredAlbums;

	useEffect(() => {
		dispatch(restoreFavoriteAlbums())
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
					onSortChange={onSortChange}
					sortType={sortType}
				/>
				<AlbumsList
					albums={displayedList(filteredList, sortType, reversList)}
				/>
			</Space>
		</Layout>

	)
}
