// Imports
import { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
// Context
import { FormDataContext, DataApiContext } from '../contexts';

export const UrlApi = createContext();

export const UrlApiProvider = props => {
	const [cedula, setCedula] = useState('');
	const { formData } = useContext(FormDataContext);
	const { setDataApi } = useContext(DataApiContext);

	useEffect(() => {
		axios
			.get('https://api.adamix.net/apec/cedula/' + cedula)
			.then(json => {
				if (formData.cedula !== '') {
					setCedula(formData.cedula.replaceAll('-', ''));
				}
				setDataApi(json.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [cedula]);

	return (
		<UrlApi.Provider value={{ cedula, setCedula }}>
			{props.children}
		</UrlApi.Provider>
	);
};

export default UrlApi;
