import { useEffect, useState } from "react";
import { Button, List } from 'antd';
import { useDispatch } from "react-redux";
import { Task } from "../task/Task";
import { fetchDeleteTodo } from "../../../store/slices/todosSlice";
import { ModalConfirum } from "../../share/modalConfirum/ModalConfirum";

export const TodosList = ({ todos }) => {
    const dispatch = useDispatch();
    const [pageSize, setPageSize] = useState(10)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [checkedItems, setCheckedItems] = useState({})
    const showButtonAction = Object.values(checkedItems).some(value => value === true);

    const onChange = (e, itemId) => {
        setCheckedItems({
            ...checkedItems,
            [itemId]: e.target.checked
        })
    };

    useEffect(() => {
        const checkedItemsFromStorage = JSON.parse(localStorage.getItem('checkedTodos'))
        if (checkedItemsFromStorage) {
            setCheckedItems(checkedItemsFromStorage)
        }
        const pageSizeFromStorage = localStorage.getItem('todosPageSize')
        if (pageSizeFromStorage) {
            setPageSize(pageSizeFromStorage)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todosPageSize', pageSize)
        localStorage.setItem('checkedTodos', JSON.stringify(checkedItems))
    }, [checkedItems, pageSize])

    const filtredId = Object.keys(checkedItems).filter(key => checkedItems[key] === true)

    const deleteConfirum = () => {
        const promises = []
        filtredId.forEach(id => {
            dispatch(fetchDeleteTodo(+id))
        })
        Promise.all(promises)
        setCheckedItems({})
    }

    return (
        <>
            <List
                header={<h1 style={{ fontSize: '36px', textAlign: 'center' }}>Todos</h1>}
                itemLayout="vertical"
                size="smal"
                pagination={{
                    pageSize: pageSize,
                    showSizeChanger: true,
                    onShowSizeChange: (current, size) => setPageSize(size),
                    pageSizeOptions: ["10", "20", "50", "100", "200"]
                }}
                dataSource={todos}
                renderItem={(task) => (
                    <Task
                        task={task}
                        checked={checkedItems[task.id]}
                        onChange={(e) => onChange(e, task.id)}
                    />
                )}
            />
            {showButtonAction &&
                <>
                    <Button type="primary" danger onClick={() => setIsModalOpen(true)}>
                        Delete
                    </Button>

                    <ModalConfirum
                        confirum={deleteConfirum}
                        isOpen={isModalOpen}
                        setIsopen={setIsModalOpen}
                    />
                </>
            }
        </>
    )
}



