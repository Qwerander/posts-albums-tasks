import { Modal } from 'antd';
import { EditForm } from '../editForm/EditForm';

export const AddNewTask = ({ isOpen, setIsopen }) => {

    return (
        <Modal
            title="Add new task"
            open={isOpen}
            footer={null}
            onCancel={() => setIsopen(false)}
        >
            <EditForm
                close={setIsopen}
            />
        </Modal>
    );
};
