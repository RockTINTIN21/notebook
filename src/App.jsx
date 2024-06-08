import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import Header from './components/Header/Header.jsx';
import Body from './layouts/Body/Body.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useState} from 'react';


function App() {

    const data = [
    ];
    const [journalItem, setJournalItem] = useState(data);
    const addItem = item =>{
        setJournalItem(journalItem=>[...journalItem, {
            tag:item.tag,
            title:item.title,
            date:new Date(item.date),
            id: journalItem.length > 0 ? Math.max(...journalItem.map(i=>i.id))+1: 1
        }]);
        console.log(item);
        console.log(journalItem);
    };

    return (
        <div className='app'>
            <LeftPanel>
                <Header/>
                <JournalAddButton/>
                <JournalList journalItem={journalItem}/>
            </LeftPanel>

            <Body>
                <JournalForm onSubmit={addItem}></JournalForm>
            </Body>


        </div>
    );
}

export default App;
