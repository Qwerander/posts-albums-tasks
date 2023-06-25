import { Modal } from 'antd';

export const ModalPhoto = ({ isOpen, photo, title, setIsopen }) => {
    return (
        <Modal
            open={isOpen}
            footer={null}
            width={648}
            onCancel={() => setIsopen(false)}
        >
            <div>
                <img src={photo} alt={title} />
            </div>
        </Modal>
    )
}

