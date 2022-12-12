import { useState, createContext } from "react";

const DataApiContext = createContext();

export const DataApiContextProvider = props => {
    const [dataApi, setDataApi] = useState([]);

    return (
        <DataApiContext.Provider value={{dataApi, setDataApi}}>
            {props.children}
        </DataApiContext.Provider>
    );
}

export default DataApiContext;