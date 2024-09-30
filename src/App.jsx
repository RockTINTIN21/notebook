import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import Header from './components/Header/Header.jsx';
import Body from './layouts/Body/Body.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useEffect, useState} from 'react';
import DataProvider from './components/Providers/DataProvider.jsx';


function App() {
    const [journalItem, setJournalItem] = useState([]);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        if(data){
            setJournalItem(data.map(item=>({
                ...item,
                date: new Date(item.date)
            })));
        }
    }, []);

    useEffect(()=>{
        if(journalItem.length){
            localStorage.setItem('data',JSON.stringify(journalItem));
        }
        console.log('setitem:',journalItem);
    },[journalItem]);

    const addItem = item =>{
        setJournalItem(journalItem=>[...journalItem, {
            id: journalItem.length > 0 ? Math.max(...journalItem.map(i=>i.id))+1: 1,
            post:item.post,
            tags:item.tag || '',
            title:item.title,
            date:new Date(item.date)

        }]);
    };

    return (
        <DataProvider>
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
        </DataProvider>

    );
}

export default App;
