import { useState } from "react";
import { List } from 'antd';
import { useEffect } from "react";
import { Album } from "../album/Album";
import { useDispatch } from "react-redux";
import { ButtonsAction } from "../../share/buttonsAction/ButtonsAction";
import { fetchDeleteAlbum } from "../api/store/fetchMethods";
import { setFavotie } from "../api/store/albumsSlice";

export const AlbumsList = ({ albums }) => {
    const dispatch = useDispatch();
    const [pageSize, setPageSize] = useState(10)
    const [checkedItems, setCheckedItems] = useState({})
    const showButtonsAction = Object.values(checkedItems).some(value => value === true);

    const onChange = (e, itemId) => {
        setCheckedItems({
            ...checkedItems,
            [itemId]: e.target.checked
        })
    };

    useEffect(() => {
        const checkedItemsFromStorage = JSON.parse(localStorage.getItem('checkedAlbums'))
        if (checkedItemsFromStorage) {
            setCheckedItems(checkedItemsFromStorage)
        }
        const pageSizeFromStorage = localStorage.getItem('albumsPageSize')
        if (pageSizeFromStorage) {
            setPageSize(pageSizeFromStorage)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('albumsPageSize', pageSize)
        localStorage.setItem('checkedAlbums', JSON.stringify(checkedItems))
    }, [checkedItems, pageSize])

    const filtredId = Object.keys(checkedItems).filter(key => checkedItems[key] === true)

    const deleteConfirum = () => {
        const promises = []
        filtredId.forEach(id => {
            dispatch(fetchDeleteAlbum(+id))
        })
        Promise.all(promises)
        setCheckedItems({})
    }
    const handleFavotite = () => {
        filtredId.forEach(id => {
            dispatch(setFavotie({ id: +id, bool: true }))
        })
        setCheckedItems({})
    }

    return (
        <>
            <List
                header={<h1 style={{ fontSize: '36px', textAlign: 'center' }}>Albums</h1>}
                grid={{
                    gutter: 16,
                    column: 3,
                    sm: 1,
                    md: 2,
                }}
                pagination={{
                    pageSize: pageSize,
                    onShowSizeChange: (current, size) => setPageSize(size),
                    pageSizeOptions: ["10", "20", "50", "100"]
                }}
                dataSource={albums}
                renderItem={(album) => (
                    <Album
                        album={album}
                        checked={checkedItems[album.id]}
                        onChange={(e) => onChange(e, album.id)}
                    />
                )}
            />
            {showButtonsAction &&
                <ButtonsAction
                    deleteConfirum={deleteConfirum}
                    handleFavotite={handleFavotite}
                />
            }
        </>
    )
}
