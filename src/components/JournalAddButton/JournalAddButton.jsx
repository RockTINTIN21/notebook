import './JournalAddButton.css';
import CardButton from '../CardButton/CardButton.jsx';
function JournalAddButton() {

    return (
        <CardButton className="journal-add">
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.9307 6.38379V8.15625H7.37891V13.708H5.57715V8.15625H0.0546875V6.38379H5.57715V0.84668H7.37891V6.38379H12.9307Z"
                    fill="white"/>
            </svg>


            Новое воспоминание
        </CardButton>
    );
}

export default JournalAddButton;
