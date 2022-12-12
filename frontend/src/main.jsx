// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FormDataContextProvider } from './hooks/contexts/FormDataContext';
import { DataApiContextProvider } from './hooks/contexts/DataApiContext';
import { PageContextProvider } from './hooks/contexts/PageContext';
import { DataInStorageContextProvider } from './hooks/contexts/DataInStorageContext';
import { UrlApiProvider } from './hooks/useEffects/useDataCedula';

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
);
