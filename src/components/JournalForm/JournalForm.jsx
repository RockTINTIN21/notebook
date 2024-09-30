import styles from './JournalForm.module.css';
import Button from '../Button/Button.jsx';
import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import DataContext from '../../Context/DataContext.js';

function JournalForm({ onSubmit, onDelete }) {
    const { newData } = useContext(DataContext);
    const INITIAL_STATE = {
        title: true,
        text: true,
        tags: false,
        date: true
    };

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        tags: '',
        post: ''
    });

    useEffect(() => {
        if (newData) {
            setFormData({
                title: newData.title || '',
                date: newData.date ? new Date(newData.date).toISOString().split('T')[0] : '',
                tags: newData.tags || '',
                post: newData.post || ''
            });
        } else {
            setFormData({
                title: '',
                date: '',
                tags: '',
                post: ''
            });
        }
    }, [newData]);

    const [formValidState, setFormValidState] = useState(INITIAL_STATE);
    useEffect(() => {
        let timerID;
        if (!formValidState.date || !formValidState.post || !formValidState.title) {
            timerID = setTimeout(() => {
                setFormValidState(INITIAL_STATE);
            }, 2000);
            return () => {
                clearTimeout(timerID);
            };
        }
    }, [formValidState]);

    const addJournalItem = (e) => {
        e.preventDefault();

        let isFormValid = true;

        if (!formData.title.trim().length) {
            setFormValidState((state) => ({ ...state, title: false }));
            isFormValid = false;
        } else {
            setFormValidState((state) => ({ ...state, title: true }));
        }
        if (!formData.post.trim().length) {
            setFormValidState((state) => ({ ...state, text: false }));
            isFormValid = false;
        } else {
            setFormValidState((state) => ({ ...state, text: true }));
        }
        if (!formData.date) {
            setFormValidState((state) => ({ ...state, date: false }));
            isFormValid = false;
        } else {
            setFormValidState((state) => ({ ...state, date: true }));
        }
        if (!isFormValid) {
            return;
        }

        if (newData.id) {
            formData['id'] = newData.id;
        }
        onSubmit(formData);
        console.log('formData:',formData);
    };

    const handleDelete = () => {
        if (newData.id) {
            onDelete(newData.id);
        }
    };

    return (
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            <div className={styles['title__header']}>
                <input
                    type="text"
                    name="title"
                    placeholder="Заголовок"
                    className={cn(styles['input'], styles['inputTitle__header'], {
                        [styles['invalid']]: !formValidState.title
                    })}
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                />
                <img
                    src="/trash.svg"
                    width="15px"
                    alt="Удалить"
                    onClick={handleDelete}
                    style={{ cursor: 'pointer' }}
                />
            </div>

            <p>
                <img src="/calendar.svg" width="15px" alt="Иконка календаря" />
                <label htmlFor="date">Дата</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    className={`${styles['input']} ${formValidState.date ? '' : styles['invalid']}`}
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                />
            </p>
            <p>
                <img src="/folder.svg" width="15px" alt="Иконка папки" />
                <label htmlFor="tags">Метки</label>
                <input
                    type="text"
                    name="tags"
                    placeholder="Спорт"
                    value={formData.tags}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                    id="tags"
                />
            </p>
            <textarea
                name="post"
                placeholder="Какой то текст"
                id="post"
                cols="30"
                rows="10"
                className={`${styles['input']} ${formValidState.text ? '' : styles['invalid']}`}
                value={formData.post}
                onChange={(e) => setFormData((prev) => ({ ...prev, post: e.target.value }))}
            />

            <Button text="Сохранить" />
        </form>
    );
}

export default JournalForm;
