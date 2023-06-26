import { Space } from 'antd';
import { SearchTitle } from '../../filters/SearchTitle';
import { ReverseList } from '../../filters/ReverseList';
import { SortGroup } from '../../filters/SortGroup';

export const Filters = ({ onSortChange, onSearch, sortType, setReversList }) => {
    return (
        <Space direction="vertical" style={{ marginBottom: 16, width: '100%' }}>
            <SearchTitle onSearch={onSearch} />
            <Space style={{ marginRight: 16 }}>
                <ReverseList setReversList={setReversList} />
                <SortGroup
                    onSortChange={onSortChange}
                    sortType={sortType}
                />
            </Space>
        </Space>
    )
}

