import { useState, createContext } from 'react';

const DataInStorageContext = createContext();

export const DataInStorageContextProvider = props => {
    const [ dataInStorage, setDataInStorage ] = useState({});

	return (
		<DataInStorageContext.Provider value={{ dataInStorage, setDataInStorage }}>
			{props.children}
		</DataInStorageContext.Provider>
	);
};

export default DataInStorageContext;