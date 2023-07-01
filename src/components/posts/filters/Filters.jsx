import { Space } from 'antd';
import { SearchTitle } from "../../share/filters/SearchTitle"
import { ShowFavorite } from "../../share/filters/ShowFavorite"
import { UserSelect } from "../../share/filters/UserSelect"
import { ReverseList } from '../../share/filters/ReverseList';
import { SortGroup } from '../../share/filters/SortGroup';

export const Filters = ({ onChangeUser, onSearch, setOnlyFavorite, setReversList, users, onSortChange, sortType }) => {
    return (
        <Space direction="vertical" style={{ marginBottom: 16, width: '100%' }}>
            <UserSelect onChangeUser={onChangeUser} users={users} />
            <SearchTitle onSearch={onSearch} />
            <Space style={{ marginRight: 16 }}>
                <ShowFavorite setOnlyFavorite={setOnlyFavorite} />
                <ReverseList setReversList={setReversList} />
                <SortGroup
                    onSortChange={onSortChange}
                    sortType={sortType}
                />
            </Space>
        </Space>
    )
}

