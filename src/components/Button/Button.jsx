import './Button.css';
import {useState} from 'react';

function Button() {
    // let text = 'Сохранить';
    const [text,setText] = useState('Сохранить');
    console.log('Ререндер');
    const clicked = ()=>{
        setText('Закрыть');//Вызов функции setText и передача в него значения 'Закрыть'
        console.log(text);
    };

    return (
        <button onClick={clicked} className='button accent'>{text}</button>
    );
}

export default Button;
