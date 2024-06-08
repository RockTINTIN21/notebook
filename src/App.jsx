import './App.css';
import JournalItem from './components/JournalItem/JournalItem.jsx';
import CardButton from './components/CardButton/CardButton.jsx';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import Header from './components/Header/Header.jsx';
import Body from './layouts/Body/Body.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useState} from 'react';


function App() {

    const data = [
        {
            id:1,
            title:'Подготовка к обновлению курсов',
            text:'Горные походы открывают удивительные природные ландшафты',
            date:new Date()
        },
        {
            id:2,
            title:'Поход в годы',
            text:'Думал, что очень много времени',
            date:new Date()
        }
    ];
    const [journalItem, setJournalItem] = useState(data);
    const addItem = item =>{
        setJournalItem(journalItem=>[...journalItem, {
            tag:item.tag,
            title:item.title,
            date:new Date(item.date),
            id:Math.max(...journalItem.map(i=>i.id))+1
        }]);
        console.log(item);
        console.log(journalItem);
    };
    const sortItems = (a,b)=>{
        if(a.date < b.date){
            return 1;
        }else{
            return -1;
        }
    };
    return (
        <div className='app'>
            <LeftPanel>
                <Header/>
                <JournalAddButton/>
                <JournalList>
                    {journalItem.sort(sortItems).map(el=>(
                        <CardButton key={el.id}>
                            <JournalItem
                                title={el.title}
                                text={el.tag}
                                date={el.date}
                            />
                        </CardButton>
                    ))}
                </JournalList>
            </LeftPanel>

            <Body>
                <JournalForm onSubmit={addItem}></JournalForm>
            </Body>


        </div>
    );
}

export default App;
