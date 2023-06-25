import { Button, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchDeletePost, setFavotie } from '../../../store/slices/postsSlice';
import { useState } from 'react';
import { ModalDeleteConfirum } from '../modal/ModalDeleteConfirum';

export const ButtonsAction = ({ deleteConfirum, handleFavotite }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Space wrap>
                <Button type="primary" danger onClick={() => setIsModalOpen(true)}>
                    Delete
                </Button>
                <Button type="dashed" onClick={handleFavotite}>
                    To favorite
                </Button>

            </Space>
            <ModalDeleteConfirum
                deleteConfirum={deleteConfirum}
                isOpen={isModalOpen}
                setIsopen={setIsModalOpen}
            />
        </>
    )
}
