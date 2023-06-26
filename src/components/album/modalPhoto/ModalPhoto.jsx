import { Modal } from 'antd';

export const ModalPhoto = ({ isOpen, photo, title, setIsopen }) => {
    return (
        <Modal
            open={isOpen}
            footer={null}
            width={`fit-content`}
            onCancel={() => setIsopen(false)}
        >
            <div style={{ width: '100%' }}>
                <img style={{ width: '100%' }} src={photo} alt={title} />
            </div>
        </Modal>
    )
}

