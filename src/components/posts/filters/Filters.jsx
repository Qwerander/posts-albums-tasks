import { Space } from 'antd';
import { SearchTitle } from "../../filters/SearchTitle"
import { ShowFavorite } from "../../filters/ShowFavorite"
import { UserSelect } from "../../filters/UserSelect"
import { ReverseList } from '../../filters/ReverseList';
import { SortGroup } from '../../filters/SortGroup';

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

