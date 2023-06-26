import styles from './task.module.css'
import { List, Checkbox } from 'antd';
import { ReactComponent as DeleteSvg } from '../../../img/delete.svg'
import { ReactComponent as EditSvg } from '../../../img/edit.svg'
import { useState } from 'react';
import { useDispatch } from "react-redux";

import { ModalDeleteConfirum } from '../../posts/modal/ModalDeleteConfirum';
import { fetchDeleteTodo, fetchPatchTodo } from '../../../store/slices/todosSlice';
import { EditForm } from '../editForm/EditForm';

export const Task = ({ task, checked, onChange }) => {
    const dispatch = useDispatch();

    const [isEditMode, toggleIEditMode] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const deleteConfirum = () => {
        dispatch(fetchDeleteTodo(task.id))
    }


    const handleCompleted = (e, taskId) => {
        const data = {
            completed: e.target.checked
        }
        dispatch(fetchPatchTodo({ id: taskId, data }))
    };

    return (
        <>
            <List.Item
                className={styles.item}
                key={task.id}

            >
                {isEditMode ?
                    <EditForm
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        close={toggleIEditMode}
                    />
                    : <>
                        <div className={styles.task}>
                            <p className={task.completed ? styles.done : null}>
                                {task.id}. {task.title}
                            </p>
                            <div className={styles.actions}>
                                <EditSvg onClick={() => toggleIEditMode(prev => !prev)} style={isEditMode ? { fill: '#1677ff' } : null} />
                                <DeleteSvg onClick={() => setIsModalOpen(true)} />
                                <div className={styles.checkboxes}>
                                    <Checkbox
                                        checked={checked}
                                        onChange={onChange}
                                    >
                                        Checked
                                    </Checkbox>
                                    <Checkbox
                                        checked={task.completed}
                                        onChange={(e) => handleCompleted(e, task.id)}
                                    >
                                        Completed
                                    </Checkbox>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </List.Item>
            <ModalDeleteConfirum
                deleteConfirum={deleteConfirum}
                isOpen={isModalOpen}
                setIsopen={setIsModalOpen}
            />
        </>
    )
}
