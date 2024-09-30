
import {useEffect, useState} from 'react';
import DataContext from '../../Context/DataContext.js';
const data = [];
const DataProvider = ({children}) =>{
    const [newData,setNewData] = useState(data);
    useEffect(()=>{
        console.log('dataProvider:',newData);
    },[newData]);
    const setUpdateData = (test)=>{
        setNewData(test);
    };
    return(
        <DataContext.Provider value={{newData,setUpdateData}}>
            {children}
        </DataContext.Provider>
    );
};
export default DataProvider;