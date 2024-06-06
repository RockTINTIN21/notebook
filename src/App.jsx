import './App.css';
import Button from './components/Button/Button.jsx';
import JournalItem from './components/JournalItem/JournalItem.jsx';
function App() {
    const data = [
        {
            title:'Подготовка к обновлению курсов',
            text:'Горные походы открывают удивительные природные ландшафты',
            data:new Date()
        },
        {
            title:'Поход в годы',
            text:'Думал, что очень много времени',
            data:new Date()
        }
    ];
    return (
        <>
            <h1>Заголовок</h1>
            <p>text</p>
            <Button/>
            <JournalItem
                title={data[0].title}
                text={data[0].text}
                data={data[0].data}
            />
            <JournalItem
                title={data[1].title}
                text={data[1].text}
                data={data[1].data}
            />
        </>
    );
}

export default App;
