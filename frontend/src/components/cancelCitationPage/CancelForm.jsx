// Imports
import InputMask from 'react-input-mask';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Form, TitleHeader, Button, WarningDiv } from '../../components';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Context
import { FormDataContext, DataApiContext } from '../../hooks/contexts';
import UrlApi from '../../hooks/useEffects/useDataCedula';

const CancelForm = props => {
	const { formData, setFormData } = useContext(FormDataContext);
	const { dataApi } = useContext(DataApiContext);
	const { setCedula } = useContext(UrlApi);
	const [cedulaIsNull, setCedulaIsNull] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	function deleteCitation(e) {
		e.preventDefault();
		if (JSON.parse(window.localStorage.getItem(dataApi.Cedula)) != null) {
			localStorage.removeItem(dataApi.Cedula);
			setIsDeleted(true);
		} else {
			if (dataApi.Cedula.length === 11) {
				setCedulaIsNull(true);
				setIsDeleted(false);
			}
		}
	}

	return (
		<>
			<TitleHeader text='CANCELAR CITA' />
			<Form className='CancelCitation' onSubmit={deleteCitation}>
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
									content='CANCELAR'
									disabled={false}
								></Button>
							) : (
								<Button
									title='Ingrese una cedula válida'
									className='NextBtn'
									content='CANCELAR'
									disabled={true}
								></Button>
							)}
						</li>
					</ul>
				</fieldset>
				{isDeleted && (
					<WarningDiv
						className='Correct'
						textContent='CITA CANCELADA CORRECTAMENTE'
					/>
				)}
				{cedulaIsNull && (
					<WarningDiv
						className='Warnig'
						textContent='USTED NO TIENE NINGUNA CITA PARA CANCELAR'
					/>
				)}
			</Form>
		</>
	);
};

export default CancelForm;
