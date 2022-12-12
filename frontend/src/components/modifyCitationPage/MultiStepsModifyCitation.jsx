// Imports
import { useContext } from 'react';
// components
import { ModifyValidation, ModifyCitation } from './stepForm';
// Context
import PageContext from '../../context/PageContext';

export const MultiStepsModifyCitation = () => {
	const { page, setPage } = useContext(PageContext);
	function nextGetData(e) {
		e.preventDefault();
		setPage(page + 1);
	}
	function submitBack(e) {
		e.preventDefault();
		setPage(page - 1);
	}

	// Render
	switch (page) {
		case 1:
			return <ModifyValidation nextBtn={nextGetData} />;

		case 2:
			return <ModifyCitation backBtn={submitBack} />;

		default:
			<h1>404</h1>;
	}
};

export default MultiStepsModifyCitation;
