import { Button, Space } from 'antd';
import { useState } from 'react';
import { ModalConfirum } from '../modalConfirum/ModalConfirum';

export const ButtonsAction = ({ deleteConfirum, handleFavotite }) => {
    const [isModalOpenDelete, setIsModalOpenDelet] = useState(false)
    const [isModalOpenFavorite, setIsModalOpenFavorite] = useState(false)

    return (
        <>
            <Space wrap>
                <Button type="primary" danger onClick={() => setIsModalOpenDelet(true)}>
                    Delete
                </Button>
                <Button type="dashed" onClick={() => setIsModalOpenFavorite(true)}>
                    To favorite
                </Button>

            </Space>
            <ModalConfirum
                confirum={deleteConfirum}
                isOpen={isModalOpenDelete}
                setIsopen={setIsModalOpenDelet}
            />
            <ModalConfirum
                confirum={handleFavotite}
                isOpen={isModalOpenFavorite}
                setIsopen={setIsModalOpenFavorite}
                okType={'primary'}
                okText={'Add to favotite'}
            />
        </>
    )
}
