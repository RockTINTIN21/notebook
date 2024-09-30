import './CardButton.css';
import {useContext} from 'react';
import DataContext from '../../Context/DataContext.js';
function CardButton({children, className,isJournalItem,data}) {
    const cl = 'card-button'+ (className ? ' '+ className:'');
    const {setUpdateData} = useContext(DataContext);
    const checkTypeButton = () =>{
        if(isJournalItem){
            setUpdateData(data);
            console.log(data.date);
            // const formatedDate = new Intl.DateTimeFormat('ko-KR').format(data.date);
            console.log('date:',data.date.getFullYear() + '-' + data.date.getDate() + '-' +data.date.getMonth() );
            console.log('date:',data.date.getDate());
            console.log('date:',data.date.getMonth());
            // setJournalData(data);
        }else{
            setUpdateData(['']);
        }
    };
    return (
        <button className={cl} onClick={checkTypeButton}>{children}</button>
        // <button className={cl}>{children}</button>

    );
}

export default CardButton;
