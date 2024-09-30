import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import Header from './components/Header/Header.jsx';
import Body from './layouts/Body/Body.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useEffect, useState} from 'react';
import DataProvider from './components/Providers/DataProvider.jsx';
import { v4 as uuidv4 } from 'uuid';


function App() {
    const [journalItem, setJournalItem] = useState([]);
    const deleteItem = (id) => {
        setJournalItem((journalItem) => journalItem.filter(item => item.id !== id));
    };
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

    const addItem = (item) => {
        setJournalItem((journalItem) => {
            const existingIndex = journalItem.findIndex(j => j.id === item.id);
            if (existingIndex !== -1) {
                const updatedItems = [...journalItem];
                updatedItems[existingIndex] = {
                    ...updatedItems[existingIndex],
                    ...item,
                    date: new Date(item.date)
                };
                return updatedItems;
            } else {
                return [
                    ...journalItem,
                    {
                        id: uuidv4(),
                        post: item.post,
                        tags: item.tags || '',
                        title: item.title,
                        date: new Date(item.date)
                    }
                ];
            }
        });
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
                    <JournalForm onSubmit={addItem} onDelete={deleteItem}/>
                </Body>
            </div>
        </DataProvider>

    );
}

export default App;
