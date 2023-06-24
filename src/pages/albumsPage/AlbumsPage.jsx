import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchgetAlbums } from "../../store/slices/albumsSlice";

export const AlbumsPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchgetAlbums())
    }, [dispatch]);

  return (
    <div>
      
    </div>
  )
}

