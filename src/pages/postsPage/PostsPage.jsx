import { useEffect } from "react";
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
    const [sortType, setSortType] = useState(3);
    const { posts, users } = useSelector(state => state.posts)
    const favoritePosts = useSelector(state => state.posts.favoritePosts)

    const handleUserSelectChange = (selectedUserIds) => {
        setSelectedUserIds(selectedUserIds);
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    const onSortChange = (e) => {
        setSortType(e.target.value);
      };

    const filteredPosts = posts.filter(post => {
        const isTitleMatched = post.title.toLowerCase().includes(searchValue.toLowerCase());
        const isUserMatched = selectedUserIds.length === 0 || selectedUserIds.includes(post.userId);
        return isTitleMatched && isUserMatched;
    });

    const filteredPostsByFavorites = onlyFavorite
        ? filteredPosts.filter(post => favoritePosts.hasOwnProperty(post.id) && favoritePosts[post.id])
        : filteredPosts;

    let sortedList = filteredPostsByFavorites;
    switch (sortType) {
        case 3:
            sortedList = filteredPostsByFavorites.sort((a, b) => a.id - b.id);
            break;
        case 4:
            sortedList = filteredPostsByFavorites.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            sortedList = filteredPostsByFavorites;
    }

    const reversedPosts = [...sortedList].reverse();
    const displayedPosts = reversList ? reversedPosts : sortedList;

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
                    onSortChange={onSortChange}
                    sortType={sortType}
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
