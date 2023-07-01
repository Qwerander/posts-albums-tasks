import { Input } from 'antd';

const { Search } = Input;

export const SearchTitle = ({ onSearch }) => {
    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };
    return (
        <Search placeholder="Search by title" onChange={handleSearchChange} style={{ width: '100%' }} />
    )
}

