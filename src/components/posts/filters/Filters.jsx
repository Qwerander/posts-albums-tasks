import { Space } from 'antd';
import { SearchPostTitle } from "./SearchPostTitle"
import { ShowFavorite } from "./ShowFavorite"
import { UserSelect } from "./UserSelect"

export const Filters = ({ onChangeUser, onSearch, setOnlyFavorite }) => {
    return (
        <Space direction="vertical" style={{ marginBottom: 16, width: '100%' }}>
            <UserSelect onChangeUser={onChangeUser} />
            <SearchPostTitle onSearch={onSearch} />
            <ShowFavorite setOnlyFavorite={setOnlyFavorite}/>
        </Space>
    )
}

