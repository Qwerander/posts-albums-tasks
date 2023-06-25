import { Space } from 'antd';
import { SearchPostTitle } from "./SearchPostTitle"
import { ShowFavorite } from "./ShowFavorite"
import { UserSelect } from "./UserSelect"
import { ReverseList } from './ReverseList';

export const Filters = ({ onChangeUser, onSearch, setOnlyFavorite, setReversList }) => {
    return (
        <Space direction="vertical" style={{ marginBottom: 16, width: '100%' }}>
            <UserSelect onChangeUser={onChangeUser} />
            <SearchPostTitle onSearch={onSearch} />
            <Space style={{ marginRight: 16 }}>
                <ShowFavorite setOnlyFavorite={setOnlyFavorite} />
                <ReverseList setReversList={setReversList} />
            </Space>
        </Space>
    )
}

