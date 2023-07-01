import { Modal } from 'antd';

import { EditForm } from '../editForm/EditForm';

export const AddNewPost = ({ isOpen, setIsopen }) => {

    return (
        <Modal
            title="Add new post"
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
