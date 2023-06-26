import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from "react-redux";
import { fetchPatchTodo, fetchPostTodo } from '../../../store/slices/todosSlice';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const EditForm = ({ id, title, completed, close }) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const data = {
            title: values.title,
            completed: values.completed
        }
        if (id) {
            dispatch(fetchPatchTodo({ id, data }))
        } else {
            dispatch(fetchPostTodo(data))
        }
        close(false)
        form.resetFields();
    };

    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
            initialValues={{ title, completed }}
        >
            <Form.Item name="title" label="Title" >
                <Input />
            </Form.Item>
            <Form.Item name="completed" label="Completed" valuePropName="checked" defaultChecked={completed}>
                <Checkbox />
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

