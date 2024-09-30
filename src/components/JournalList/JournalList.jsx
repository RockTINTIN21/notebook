import './JournalList.css';
import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';
function JournalList({journalItem}) {
    if(journalItem.length === 0){
        return <p>Записей пока нет, добавьте первую</p>;
    }
    const sortItems = (a,b)=>{
        if(a.date < b.date){
            return 1;
        }else{
            return -1;
        }
    };

    return<>
        {journalItem.sort(sortItems).map(el=>(
        <CardButton isJournalItem={true} data={el} key={el.id}>
            <JournalItem
                title={el.title}
                text={el.tag}
                date={el.date}
            />
        </CardButton>
    ))}</>;
}

export default JournalList;
