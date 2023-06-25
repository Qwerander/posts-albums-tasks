import React from 'react';
import { Checkbox } from 'antd';

export const ReverseList = ({ setReversList }) => {
    const onChange = (e) => {
        setReversList(e.target.checked);
    };
    return (

        <Checkbox onChange={onChange}>Reverse list</Checkbox>
    )
}

