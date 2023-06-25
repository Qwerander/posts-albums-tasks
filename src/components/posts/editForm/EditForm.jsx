import { Button, Form, Input } from 'antd';
import React from 'react';
import { useDispatch} from "react-redux";
import { changeUserName, fetchPatchPost } from '../../../store/slices/postsSlice';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const EditForm = ({ id, title, body, author, userId, close }) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();


    const onFinish = (values) => {
        const data = {
            title: values.title,
            body: values.body
        }
        dispatch(fetchPatchPost({id, data}))
        dispatch(changeUserName({id, newName: values.author}))
        close(false)
    };

    return (    
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
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
                <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                <Button htmlType="button" onClick={() => close(false)}>
                    Don't save
                </Button>
            </Form.Item>
        </Form>
    );
};

