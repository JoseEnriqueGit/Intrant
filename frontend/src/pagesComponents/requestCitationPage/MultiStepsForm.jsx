// Imports
import { useContext } from 'react';
// components
import { UserDataForm, DateServiceForm, ConfirmCitation } from './stepForm';
// Context
import FormDataContext from '../../hooks/contexts/FormDataContext';
import PageContext from '../../hooks/contexts/PageContext';

const MultiStepsForm = () => {
	const { setFormData } = useContext(FormDataContext);
	const { page, setPage } = useContext(PageContext);
	// !
	// console.log(formData);

	function submitBack(e) {
		e.preventDefault();
		setPage(page - 1);
	}

	function backHome(e) {
		e.preventDefault();
		setFormData({
			cedula: '',
			asunto: '',
			oficina: '',
			fecha: '',
			hora: '',
			telefono: '',
			correo: '',
		});
		setPage(1);
	}

	// Render
	switch (page) {
		case 1:
			return <UserDataForm />;

		case 2:
			return <DateServiceForm backBtn={submitBack} />;

		case 3:
			return <ConfirmCitation backHome={backHome} backBtn={submitBack} />;
		default:
			<h1>404</h1>;
	}
};

export default MultiStepsForm;
