import { Button, List, Space } from 'antd';
import { PhotoMini } from "../photoMini/PhotoMini";
import { useNavigate } from 'react-router-dom';

export const AlbumMini = ({ album }) => {
    const navigate = useNavigate();

    return (
        <Space direction="vertical" style={{ marginBottom: 30 }}>
            <Button type="dashed" onClick={() => navigate(-1)}>
                Back to albums
            </Button>
            <List
                grid={{
                    gutter: 10,
                }}
                dataSource={album}
                renderItem={(photo) => (
                    <PhotoMini photo={photo} />
                )}
            />
        </Space>
    )
}



