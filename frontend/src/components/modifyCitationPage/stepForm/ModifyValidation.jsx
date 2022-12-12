// Imports
import InputMask from 'react-input-mask';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Form, TitleHeader, Button, WarningDiv } from '../../../components';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Context
import {
	FormDataContext,
	PageContext,
	DataApiContext,
	DataInStorageContext,
} from '../../../hooks/contexts';
import UrlApi from '../../../hooks/useEffects/useDataCedula';

const ModifyValidation = () => {
	const { formData, setFormData } = useContext(FormDataContext);
	const { page, setPage } = useContext(PageContext);
	const { dataApi } = useContext(DataApiContext);
	const { setCedula } = useContext(UrlApi);
	const { setDataInStorage } = useContext(DataInStorageContext);
	const [cedulaIsNull, setCedulaIsNull] = useState(false);

	function citationValidation(e) {
		e.preventDefault();
		if (JSON.parse(window.localStorage.getItem(dataApi.Cedula)) != null) {
			setPage(page + 1);
			setDataInStorage(
				JSON.parse(localStorage.getItem(formData.cedula.replaceAll('-', '')))
			);
		} else {
			if (formData.cedula.replaceAll('-', '').length === 11) {
				setCedulaIsNull(true);
			}
		}
	}

	return (
		<>
			<TitleHeader text='CONFIGURAR CITA ' />
			<Form className='ModifyCitationForm' onSubmit={citationValidation}>
				<fieldset lang='es'>
					<legend>DATO DEL VISITANTE</legend>

					<ul>
						<li>
							<label>
								CEDULA:
								<InputMask
									id='cedula'
									name='userCedula'
									autoComplete='off'
									mask='999-9999999-9'
									maskChar=' '
									autoFocus={true}
									defaultValue={formData.cedula}
									onChange={e => {
										setCedula(e.target.value.replaceAll('-', ''));
										setFormData({
											...formData,
											cedula: e.target.value,
										});
										setCedulaIsNull(false);
									}}
								></InputMask>
							</label>
						</li>
						<li>
							<Link className='BackBtnLink' to='/'>
								<FontAwesomeIcon
									icon={faChevronLeft}
									color='#ff6500'
									size='lg'
								/>
							</Link>
							{dataApi.ok ? (
								<Button
									className='NextBtn'
									content='SIGUIENTE'
									disabled={false}
								></Button>
							) : (
								<Button
									title='Ingrese una cedula válida'
									className='NextBtn'
									content='SIGUIENTE'
									disabled={true}
								></Button>
							)}
						</li>
					</ul>
				</fieldset>
				{cedulaIsNull && (
					<WarningDiv
						className='Warnig'
						textContent='USTED NO TIENE NINGUNA CITA'
					/>
				)}
			</Form>
		</>
	);
};

export default ModifyValidation;
