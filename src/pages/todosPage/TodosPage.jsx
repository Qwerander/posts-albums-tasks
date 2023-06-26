import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Layout, Space } from "antd";
import { TodosList } from "../../components/todos/todosList/TodosList";
import { AddNewTask } from "../../components/todos/modal/AddNewTask";
import { Filters } from "../../components/todos/filters/Filters";
import { fetchGetTodos } from "../../components/todos/api/store/fetchMethods";
import { displayedList } from "../../components/share/displayedList";

export const TodosPage = () => {
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [searchValue, setSearchValue] = useState('');
	const [reversList, setReversList] = useState(false)
	const [sortType, setSortType] = useState(1);
	const { todos } = useSelector(state => state.todos)

	const handleSearchChange = (value) => {
		setSearchValue(value);
	};

	const onSortChange = (e) => {
		setSortType(e.target.value);
	};

	const filteredList = todos.filter(task => {
		const isTitleMatched = task.title.toLowerCase().includes(searchValue.toLowerCase());
		return isTitleMatched
	});

	useEffect(() => {
		if (!todos?.length) {
			dispatch(fetchGetTodos());
		}
	}, [dispatch, todos]);

	return (
		<Layout>
			<Space direction="vertical" style={{ marginBottom: '12px', padding: '50px 25px 50px' }}>
				<Button type="primary" onClick={() => setIsModalOpen(true)}>
					+ Add new task
				</Button>
				<Filters
					onSearch={handleSearchChange}
					setReversList={setReversList}
					onSortChange={onSortChange}
					sortType={sortType}
				/>
				<TodosList
					todos={displayedList(filteredList, sortType, reversList)}
				/>
			</Space>
			<AddNewTask
				isOpen={isModalOpen}
				setIsopen={setIsModalOpen}
			/>
		</Layout>

	)
}

