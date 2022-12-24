// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FormDataContextProvider } from './hooks/contexts/FormDataContext';
import { DataApiContextProvider } from './hooks/contexts/DataApiContext';
import { PageContextProvider } from './hooks/contexts/PageContext';
import { UrlApiProvider } from './hooks/useEffects/useDataCedula';

ReactDOM.createRoot(document.getElementById('root')).render(
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
);
