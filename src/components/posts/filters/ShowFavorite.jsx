import React from 'react';
import { Checkbox } from 'antd';

export const ShowFavorite = ({ setOnlyFavorite }) => {
    const onChange = (e) => {
        setOnlyFavorite(e.target.checked);
    };
    return (

        <Checkbox onChange={onChange}>Show only favorite</Checkbox>
    )
}

