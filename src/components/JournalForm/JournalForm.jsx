import styles from './JournalForm.module.css';
import Button from '../Button/Button.jsx';
import {useState} from 'react';
import cn from 'classnames';
function JournalForm({ onSubmit }) {
    const [formValidState, setFormValidState] = useState({
        title: true,
        text:true,
        date:true
    });
    const addJournalItem = (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        let isFormValid = true;
        if(!formProps.title.trim().length){
            setFormValidState(state=>({...state,title:false}));
            isFormValid = false;
        }else{
            setFormValidState(state=>({...state,title:true}));
        }
        if(!formProps.text.trim().length){
            setFormValidState(state=>({...state,text:false}));
            isFormValid = false;
        }else{
            setFormValidState(state=>({...state,text:true}));
        }
        if(!formProps.date){
            setFormValidState(state=>({...state,date:false}));
            isFormValid = false;
        }else{
            setFormValidState(state=>({...state,date:true}));
        }
        if(!isFormValid){
            return;
        }
        onSubmit(formProps);
    };
    return (
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            <div className={styles['title__header']}>
                <input type="text"
                       name='title'
                       placeholder='Заголовок'
                       className={cn(styles['input'],
                           styles['inputTitle__header'],
                           {[styles['invalid']]: !formValidState.title})}
                />
                <img src="/trash.svg" width='15px' alt="Иконка календаря"/>
            </div>

            <p>
                <img src="/calendar.svg" width='15px' alt="Иконка календаря"/>
                <label htmlFor="date">Дата</label>
                <input type="date" name='date' id='date'
                       className={`${styles['input']} ${formValidState.date ? '' : styles['invalid']}`}/>
            </p>
            <p>
                <img src="/folder.svg" width='15px' alt="Иконка папки"/>
                <label htmlFor="date">Метки</label>
                <input type="text" name='tag' placeholder='Спорт' id='tag'/>
            </p>
            <textarea name="text" placeholder='Какой то текст' id="" cols="30" rows="10" className={`${styles['input']} ${formValidState.text ? '' : styles['invalid']}`}></textarea>

            <Button text='Сохранить'/>
        </form>
    );
}

export default JournalForm;
