import { useState } from "react";
import { Post } from "../post/Post"
import { List } from 'antd';
import { useEffect } from "react";
import { ButtonsAction } from "../../share/buttonsAction/ButtonsAction";
import { useDispatch } from "react-redux";
import { fetchDeletePost, setFavotie } from "../../../store/slices/postsSlice";

export const PostsList = ({ posts }) => {
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
        const checkedItemsFromStorage = JSON.parse(localStorage.getItem('checkedPosts'))
        if (checkedItemsFromStorage) {
            setCheckedItems(checkedItemsFromStorage)
        }
        const pageSizeFromStorage = localStorage.getItem('postsPageSize')
        if (pageSizeFromStorage) {
            setPageSize(pageSizeFromStorage)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('postsPageSize', pageSize)
        localStorage.setItem('checkedPosts', JSON.stringify(checkedItems))
    }, [checkedItems, pageSize])

    const filtredId = Object.keys(checkedItems).filter(key => checkedItems[key] === true)

    const deleteConfirum = () => {
        const promises = []
        filtredId.forEach(id => {
            dispatch(fetchDeletePost(+id))
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
                header={<h1 style={{ fontSize: '36px', textAlign: 'center' }}>Posts</h1>}
                itemLayout="vertical"
                size="smal"
                pagination={{
                    pageSize: pageSize,
                    showSizeChanger: true,
                    onShowSizeChange: (current, size) => setPageSize(size),
                    pageSizeOptions: ["10", "20", "50", "100"]
                }}
                dataSource={posts}
                renderItem={(post) => (
                    <Post
                        post={post}
                        checked={checkedItems[post.id]}
                        onChange={(e) => onChange(e, post.id)}
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



