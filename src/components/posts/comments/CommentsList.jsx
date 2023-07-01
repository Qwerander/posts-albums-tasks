import { List } from 'antd';

export const CommentsList = ({ comments }) => {

    return (
        <List
            header={<h3 style={{ textAlign: 'center' }}>Комментарии</h3>}
            itemLayout="vertical"
            size="smal"
            dataSource={comments}
            renderItem={(item) => (
                <List.Item
                    style={{ textAlign: 'left' }}
                    key={item.id}
                >
                    <List.Item.Meta
                        title={`${item.name}, ${item.email}`}
                    />
                    <p>{item.body}</p>
                </List.Item>
            )}
        />
    )
}



