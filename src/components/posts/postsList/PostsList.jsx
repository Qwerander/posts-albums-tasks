import { useState } from "react";
import { Post } from "../post/Post"
import styles from './postsLists.module.css'
import { List } from 'antd';
import { useEffect } from "react";

export const PostsList = ({ posts }) => {
    const [pageSize, setPageSize] = useState(10)
    const [checkedItems, setCheckedItems] = useState({})

    const onChange = (e, itemId) => {
        setCheckedItems({
            ...checkedItems,
            [itemId]: e.target.checked
        })
    };

    useEffect(() => {
        const checkedItemsFromStorage = JSON.parse(localStorage.getItem('checkedItems'))
        if (checkedItemsFromStorage) {
            setCheckedItems(checkedItemsFromStorage)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('checkedItems', JSON.stringify(checkedItems))
    }, [checkedItems])

    return (
        <List
            header={<h1 className={styles.title}>Посты</h1>}
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
    )
}



