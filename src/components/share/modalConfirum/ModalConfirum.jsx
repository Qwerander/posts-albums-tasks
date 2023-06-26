import { Modal } from 'antd';
import React  from 'react';


export const ModalConfirum = ({ isOpen, setIsopen, confirum, okType = 'danger', okText = 'Delete' }) => {
    const handleComfirum = () => {
        confirum()
        setIsopen(false)
    }
    return (
        <Modal
            title="Are you sure?"
            open={isOpen}
            onOk={handleComfirum}
            okType={okType}
            onCancel={() => setIsopen(false)}
            okText={okText}
            cancelText="Cancel"
        >
        </Modal>
    );
};
