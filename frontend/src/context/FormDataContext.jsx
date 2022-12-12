import { useState, createContext } from 'react';

const FormDataContext = createContext();

export const FormDataContextProvider = props => {
	const [formData, setFormData] = useState({
		cedula: '',
		asunto: '',
		oficina: '',
		fecha: '',
		hora: '',
		telefono: '',
		correo: ''
	});

	return (
		<FormDataContext.Provider value={{ formData, setFormData }}>
			{props.children}
		</FormDataContext.Provider>
	);
};

export default FormDataContext;
