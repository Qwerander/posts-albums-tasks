import { Radio } from 'antd';
import { useLocation } from 'react-router-dom';

export const SortGroup = ({ onSortChange, sortType }) => {
    const { pathname } = useLocation()
    return (
        <Radio.Group onChange={onSortChange} value={sortType}>
            {pathname === '/todos' &&
                <>
                    <Radio value={1}>Not completed first</Radio>
                    <Radio value={2}>Completed first</Radio>
                </>
            }
            <Radio value={3}>By ID</Radio>
            <Radio value={4}>By title</Radio>
        </Radio.Group>
    )
}
