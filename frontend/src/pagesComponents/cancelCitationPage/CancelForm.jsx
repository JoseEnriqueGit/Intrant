// Imports
import InputMask from 'react-input-mask';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { deleteCitation } from '../../api/deleteCitation';
// Components
import { Ring } from '@uiball/loaders';
import { Form, TitleHeader, WarningDiv } from '../../pagesComponents';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Context
import { FormDataContext, DataApiContext, Loading } from '../../hooks/contexts';
import UrlApi from '../../hooks/useEffects/useDataCedula';

const CancelForm = () => {
	const { formData, setFormData } = useContext(FormDataContext);
	const { dataApi } = useContext(DataApiContext);
	const { setCedula } = useContext(UrlApi);
	const { isLoading, setIsLoading } = useContext(Loading);
	const [hasCitation, setHasCitation] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	async function handleDeleteCitation(e) {
		e.preventDefault();
		setIsLoading(true);
		const isDeleted = await deleteCitation(formData.cedula);

		if (isDeleted) {
			setIsDeleted(true);
			setHasCitation(false);
			setIsLoading(false);
		} else {
			setIsDeleted(false);
			setHasCitation(true);
			setIsLoading(false);
		}
	}

	return (
		<>
			<TitleHeader text='CANCELAR CITA' />
			<Form className='CancelCitation' onSubmit={handleDeleteCitation}>
				<fieldset lang='es'>
					<legend>DATO DEL VISITANTE</legend>

					<ul>
						<li>
							<label>
								C&Eacute;DULA:
								<InputMask
									id='cedula'
									name='userCedula'
									autoComplete='off'
									mask='999-9999999-9'
									maskChar=''
									autoFocus={true}
									defaultValue={formData.cedula}
									onChange={e => {
										setCedula(e.target.value.replaceAll('-', ''));
										setFormData({
											...formData,
											cedula: e.target.value,
										});
										setHasCitation(false);
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
							<button
								title={!dataApi.ok ? 'Ingrese una cédula válida' : ''}
								className='NextBtn'
								disabled={!dataApi.ok}
							>
								{isLoading ? (
									<Ring size={34} color='#003876'></Ring>
								) : (
									'CANCELAR'
								)}
							</button>
						</li>
					</ul>
				</fieldset>
				{isDeleted ? (
					<WarningDiv
						className='Correct'
						textContent='CITA CANCELADA CORRECTAMENTE'
					/>
				) : (
					<></>
				)}
				{hasCitation && (
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
