import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetPosts } from "../../store/slices/postsSlice";
import { PostsList } from "../../components/posts/postsList/PostsList";
import { Button, Layout, Space } from 'antd';
import { useState } from "react";
import { Filters } from "../../components/posts/filters/Filters";
import { AddNewPost } from "../../components/posts/modal/AddNewPost";

export const PostsPage = () => {
    const dispatch = useDispatch();
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [onlyFavorite, setOnlyFavorite] = useState(false)
    const [reversList, setReversList] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { posts, users } = useSelector(state => state.posts)
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
        if (!posts?.length) {
            dispatch(fetchGetPosts())
        }
    }, [dispatch, posts]);

    return (
        <Layout>
            <Space direction="vertical" style={{ marginBottom: '12px', padding: '50px 25px 50px' }}>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    + Add new post
                </Button>
                <Filters
                    onChangeUser={handleUserSelectChange}
                    onSearch={handleSearchChange}
                    setOnlyFavorite={setOnlyFavorite}
                    setReversList={setReversList}
                    users={users}
                />
                <PostsList
                    posts={displayedPosts}
                    selectedUserIds={selectedUserIds}
                />
            </Space>
            <AddNewPost
                isOpen={isModalOpen}
                setIsopen={setIsModalOpen}
            />
        </Layout>

    )
}


