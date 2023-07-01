import { Button, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPatchPost, fetchPostPost } from '../api/store/fetchMethods';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const EditForm = ({ id, title = '', body = '', author = '', close }) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.posts.users)
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        const { author, ...rest } = values;
        if (id) {
            dispatch(fetchPatchPost({ id, data: { ...rest, userId: Number(author) } }))
        } else {
            dispatch(fetchPostPost({ ...rest, userId: Number(author) }));
        }
        form.resetFields();
        close(false);
    };

    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={handleFinish}
            style={{ maxWidth: '100%' }}
            initialValues={{ title, body, author }}
        >
            <Form.Item name="title" label="Title" >
                <Input />
            </Form.Item>
            <Form.Item name="body" label="Text">
                <Input />
            </Form.Item>
            <Form.Item name="author" label="Author">
                <Select>
                    {users.map(user => (
                        <Select.Option key={user.id} value={user.id}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                <Button type="default" onClick={() => close(false)}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};