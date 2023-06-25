import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetPosts } from "../../store/slices/postsSlice";
import { PostsList } from "../../components/posts/postsList/PostsList";
import { Layout, List, Space } from 'antd';
import styles from './postsPage.module.css'
import { useState } from "react";
import { Filters } from "../../components/posts/filters/Filters";
const { Content } = Layout;
// const {  Avatar, List, Space  } = antd;



export const PostsPage = () => {
    const dispatch = useDispatch();
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [onlyFavorite, setOnlyFavorite] = useState(false)
    const [reversList, setReversList] = useState(false)
    const posts = useSelector(state => state.posts.posts)
    const favoritePosts = useSelector(state => state.posts.favoritePosts)

    const handleUserSelectChange = (selectedUserIds) => {
        setSelectedUserIds(selectedUserIds);
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    const filteredPosts = posts.filter(post => {
        const isTitleMatched = post.title.toLowerCase().includes(searchValue.toLowerCase());
        const isUserMatched = selectedUserIds.length === 0 || selectedUserIds.includes(post.userId);
        return isTitleMatched && isUserMatched;
    });

    const filteredPostsByFavorites = onlyFavorite
        ? filteredPosts.filter(post => favoritePosts.hasOwnProperty(post.id) && favoritePosts[post.id])
        : filteredPosts;

    const reversedPosts = [...filteredPostsByFavorites].reverse();
    const displayedPosts = reversList ? reversedPosts : filteredPostsByFavorites;

    useEffect(() => {
        dispatch(fetchGetPosts())
    }, [dispatch]);

    return (
        <Layout>
            <Content className={styles.content}>
                <Filters
                    onChangeUser={handleUserSelectChange}
                    onSearch={handleSearchChange}
                    setOnlyFavorite={setOnlyFavorite}
                    setReversList={setReversList}
                />
                <PostsList
                    posts={displayedPosts}
                    selectedUserIds={selectedUserIds}
                />
            </Content>
        </Layout>

    )
}


