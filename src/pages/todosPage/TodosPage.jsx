import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGetTodos } from "../../store/slices/todosSlice";


export const TodosPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetTodos());
    }, [dispatch]);

  return (
    <div>
      
    </div>
  )
}

