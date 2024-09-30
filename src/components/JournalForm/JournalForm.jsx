import styles from './JournalForm.module.css';
import Button from '../Button/Button.jsx';
import {useContext, useEffect, useState} from 'react';
import cn from 'classnames';
import DataContext from '../../Context/DataContext.js';

function JournalForm({ onSubmit }) {
    // useEffect(() => {
    //     console.log('Контекст:',contextData);
    // }, [contextData]);
    const INITIAL_STATE = {
        title: true,
        text:true,
        tags:false,
        date:true
    };
    const {newData} = useContext(DataContext);
    console.log('NEWDATA:',newData);
    const[formValidState, setFormValidState] = useState(INITIAL_STATE);
    useEffect(()=>{
        let timerID;
        if(!formValidState.date || !formValidState.post || !formValidState.title){
            timerID = setTimeout(()=>{
               setFormValidState(INITIAL_STATE);
            },2000);
            return()=>{
                clearTimeout(timerID);
            };
        }
    }, [formValidState]);
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
        if(!formProps.post.trim().length){
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
        console.log('formProps:',formProps);
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
                       defaultValue={newData.title || ''}
                />
                <img src="/trash.svg" width='15px' alt="Иконка календаря"/>
            </div>

            <p>
                <img src="/calendar.svg" width='15px' alt="Иконка календаря"/>
                <label htmlFor="date">Дата</label>
                <input type="date" name='date' id='date'
                       className={`${styles['input']}
                        ${formValidState.date ? '' : styles['invalid']}`}
                       // defaultValue={new Intl.DateTimeFormat('ru-RU').format(newData.date) || ''}
                        defaultValue={newData.da te.getFullYear()}

                />
            </p>
            <p>
                <img src="/folder.svg" width='15px' alt="Иконка папки"/>
                <label htmlFor="tag">Метки</label>
                <input type="text" name='tag' placeholder='Спорт'
                       defaultValue={newData.tags || ''}
                       id='tag'/>
            </p>
            <textarea name="post" placeholder='Какой то текст' id="post" cols="30" rows="10" className={`${styles['input']} 
            ${formValidState.text ? '' : styles['invalid']}`}
                      defaultValue={newData.post || ''}
            />

            <Button text='Сохранить'/>
        </form>
    );
}

export default JournalForm;
