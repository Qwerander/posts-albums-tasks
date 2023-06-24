import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGetPosts } from "../../store/slices/postsSlice";

export const PostsPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetPosts());
    }, []);

    return (
        <div>

        </div>
    )
}


