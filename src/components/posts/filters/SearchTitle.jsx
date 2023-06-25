
import { Input } from 'antd';
import React from 'react';
const { Search } = Input;

export const SearchTitle = ({ onSearch }) => {
    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };
    return (
        <Search placeholder="Search post by title" onChange={handleSearchChange} style={{ width: '100%' }} />
    )
}

