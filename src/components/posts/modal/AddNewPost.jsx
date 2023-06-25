import { Modal } from 'antd';
import React from 'react';
import { NewPostForm } from '../newPost/NewPostForm';


export const AddNewPost = ({ isOpen, setIsopen }) => {

    return (
        <Modal
            title="Add new post"
            open={isOpen}
            footer={null}
        >
            <NewPostForm
                setIsopen={setIsopen}
            />
        </Modal>
    );
};
