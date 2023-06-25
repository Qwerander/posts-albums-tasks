import { useState } from "react";
import { List } from 'antd';
import { useEffect } from "react";
import { Album } from "../album/Album";
import { fetchDeleteAlbum, setFavotie } from "../../../store/slices/albumsSlice";
import { useDispatch } from "react-redux";
import { ButtonsAction } from "../../posts/buttonsAction/ButtonsAction";

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
    }, [])

    useEffect(() => {
        localStorage.setItem('checkedAlbums', JSON.stringify(checkedItems))
    }, [checkedItems])

    
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


// import React from 'react';
// import { Card, List } from 'antd';

// const data = [
//   {
//     title: 'Title 1',
//   },
//   {
//     title: 'Title 2',
//   },
//   {
//     title: 'Title 3',
//   },
//   {
//     title: 'Title 4',
//   },
//   {
//     title: 'Title 5',
//   },
//   {
//     title: 'Title 6',
//   },
// ];

// const App: React.FC = () => (
//   <List
//     grid={{
//       gutter: 16,
//       xs: 1,
//       sm: 2,
//       md: 4,
//       lg: 4,
//       xl: 6,
//       xxl: 3,
//     }}
//     dataSource={data}
//     renderItem={(item) => (
//       <List.Item>
//         <Card title={item.title}>Card content</Card>
//       </List.Item>
//     )}
//   />
// );

// export default App;
