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
        }else{
            setUpdateData({});
        }
    };
    return (
        <button className={cl} onClick={checkTypeButton}>{children}</button>
    );
}

export default CardButton;
