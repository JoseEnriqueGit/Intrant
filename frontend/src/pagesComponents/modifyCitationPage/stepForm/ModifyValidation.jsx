// Imports
import InputMask from 'react-input-mask';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { existCitation } from '../../../api/existCitation';
// Components
import {
	Form,
	TitleHeader,
	Button,
	WarningDiv,
} from '../../../pagesComponents';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Context
import {
	FormDataContext,
	PageContext,
	DataApiContext,
} from '../../../hooks/contexts';
import useDataCedula from '../../../hooks/useEffects/useDataCedula';

 const ModifyValidation = () => {
	const { formData, setFormData } = useContext(FormDataContext);
	const { page, setPage } = useContext(PageContext);
	const { dataApi } = useContext(DataApiContext);
	const { setCedula } = useContext(useDataCedula);
	const [hasCitation, setHasCitation] = useState(true);

	async function handleCitationValidation(e) {
		e.preventDefault();
		const { isExist, getCitation } = await existCitation(formData.cedula);
		if (isExist) {
			setFormData(getCitation);
			setPage(page + 1);
		} else {
			setHasCitation(false);
		}
	}

	return (
		<>
			<TitleHeader text='CONFIGURAR CITA ' />
			<Form className='ModifyCitationForm' onSubmit={handleCitationValidation}>
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
									maskChar=''
									autoFocus={true}
									defaultValue={formData.cedula}
									onChange={e => {
										setCedula(e.target.value.replaceAll('-', ''));
										setFormData({
											...formData,
											cedula: e.target.value,
										});
										setHasCitation(true);
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
							{dataApi.ok && formData.cedula !== '' ? (
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
				{!hasCitation && (
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
