// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import { FormDataContextProvider } from './context/FormDataContext';
import { DataApiContextProvider } from './context/DataApiContext';
import { PageContextProvider } from './context/PageContext';
import { DataInStorageContextProvider } from './context/DataInStorageContext';
import { UrlApiProvider } from './useEffect/UrlApi';

ReactDOM.createRoot(document.getElementById('root')).render(
    <DataInStorageContextProvider>        
        <PageContextProvider>
            <DataApiContextProvider>
                <FormDataContextProvider>
                    <UrlApiProvider>        
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </UrlApiProvider>
                </FormDataContextProvider>
            </DataApiContextProvider>
        </PageContextProvider>
    </DataInStorageContextProvider>
)
