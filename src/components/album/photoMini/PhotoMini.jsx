import { List } from 'antd';
import { useState } from 'react';
import { ModalPhoto } from '../modalPhoto/ModalPhoto';

export const PhotoMini = ({ photo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <List.Item
                key={photo.id}
            >
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <img src={photo.thumbnailUrl} alt={photo.title} />
                    <p style={{ maxWidth: '150px' }} >{photo.title}</p>
                </div>
            </List.Item>
            <ModalPhoto
                isOpen={isModalOpen}
                photo={photo.url}
                title={photo.title}
                setIsopen={setIsModalOpen}
            />
        </>
    );
};