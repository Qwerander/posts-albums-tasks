import { Button, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchDeletePost, setFavotie } from '../../../store/slices/postsSlice';
import { useState } from 'react';
import { ModalDeleteConfirum } from '../modal/ModalDeleteConfirum';

export const ButtonsAction = ({ checkedItems, setCheckedItems }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false)

    const filtredId = Object.keys(checkedItems).filter(key => checkedItems[key] === true)

    const deleteConfirum = () => {
        const promises = []
        filtredId.forEach(id => {
            dispatch(fetchDeletePost(+id))
        })
        Promise.all(promises)
        setCheckedItems({})
    }
    const handleFavotite = () => {
        filtredId.forEach(id => {
            dispatch(setFavotie({ id: +id, bool: true }))
        })
        setCheckedItems({})
    }

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
