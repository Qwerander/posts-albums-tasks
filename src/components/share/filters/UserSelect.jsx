import { Select, Tag } from 'antd';

export const UserSelect = ({ onChangeUser, users }) => {
	const options = users.map(user => ({
		value: user.id,
		label: user.name
	}));

	return (
		<Select
			mode="multiple"
			showArrow
			tagRender={tagRender}
			style={{
				width: '100%',
			}}
			options={options}
			onChange={onChangeUser}
			placeholder="Search by author"
		/>
	);
}

const tagRender = (props) => {
	const { label, closable, onClose } = props;
	const onPreventMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
	};
	return (
		<Tag
			color={'blue'}
			onMouseDown={onPreventMouseDown}
			closable={closable}
			onClose={onClose}
			style={{
				marginRight: 3,
			}}
		>
			{label}
		</Tag>
	);
};
