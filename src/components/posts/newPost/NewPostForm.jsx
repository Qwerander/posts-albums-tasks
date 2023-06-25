import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostPost } from '../../../store/slices/postsSlice';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const NewPostForm = ({ setIsopen }) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.posts.users)
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        const { author, ...rest } = values;
        dispatch(fetchPostPost({ ...rest, userId: Number(author) }));
        form.resetFields();
        setIsopen(false);
      };

    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={handleFinish}
            style={{ maxWidth: '100%' }}
        // initialValues={{ title: newPost.title, body: newPost.body, author: newPost.author }}
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
                <Button type="default" onClick={() => setIsopen(false)}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};