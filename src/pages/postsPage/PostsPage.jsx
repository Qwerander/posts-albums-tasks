import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetPosts } from "../../store/slices/postsSlice";
import { PostsList } from "../../components/posts/postsList/PostsList";
import { Layout, List, Space } from 'antd';
import styles from './postsPage.module.css'
import { useState } from "react";
const { Content } = Layout;
// const {  Avatar, List, Space  } = antd;



export const PostsPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts)

    useEffect(() => {
        dispatch(fetchGetPosts())
    }, [dispatch]);

    return (
        <Layout>
            <Content className={styles.content}>
                <PostsList
                    posts={posts}
                />
            </Content>
        </Layout>

    )
}


