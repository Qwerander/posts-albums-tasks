import React from 'react';
import { Radio } from 'antd';

export const SortGroup = ({ onSortChange, sortType }) => {

    return (
        <Radio.Group onChange={onSortChange} value={sortType}>
            <Radio value={1}>Not completed first</Radio>
            <Radio value={2}>Completed first</Radio>
            <Radio value={3}>By ID</Radio>
            <Radio value={4}>By title</Radio>
        </Radio.Group>
    )
}
