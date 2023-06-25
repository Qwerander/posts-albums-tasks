import { Modal } from 'antd';
import React  from 'react';


export const ModalDeleteConfirum = ({ isOpen, setIsopen, deleteConfirum }) => {
    const handleComfirum = () => {
        deleteConfirum()
        setIsopen(false)
    }
    return (
        <Modal
            title="Are you sure?"
            open={isOpen}
            onOk={handleComfirum}
            okType='danger'
            onCancel={() => setIsopen(false)}
            okText="Delete"
            cancelText="Cancel"
        >
        </Modal>
    );
};
