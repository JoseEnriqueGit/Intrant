// Imports
import InputMask from 'react-input-mask';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { existCitation } from '../../../api/existCitation';
// Components
import { Ring } from '@uiball/loaders';
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
	Loading,
} from '../../../hooks/contexts';
import useDataCedula from '../../../hooks/useEffects/useDataCedula';

const ModifyValidation = () => {
	const { formData, setFormData } = useContext(FormDataContext);
	const { page, setPage } = useContext(PageContext);
	const { dataApi } = useContext(DataApiContext);
	const { setCedula } = useContext(useDataCedula);
	const { isLoading, setIsLoading } = useContext(Loading);
	const [hasCitation, setHasCitation] = useState(true);

	async function handleCitationValidation(e) {
		e.preventDefault();
		setIsLoading(true);
		const { isExist, getCitation } = await existCitation(formData.cedula);
		if (isExist) {
			setFormData(getCitation);
			setPage(page + 1);
			setIsLoading(false);
		} else {
			setHasCitation(false);
			setIsLoading(false);
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

							<button
								title={!dataApi.ok ? 'Ingrese una cédula válida' : ''}
								className='NextBtn'
								disabled={!dataApi.ok}
							>
								{isLoading ? (
									<Ring size={34} color='#003876'></Ring>
								) : (
									'SIGUIENTE'
								)}
							</button>
							{/* 
							{dataApi.ok || formData.cedula !== '' ? (
								<button className='NextBtn' disabled={false}>
									{isLoading ? (
										<Ring size={34} color='#003876'></Ring>
									) : (
										'SIGUIENTE'
									)}
								</button>
							) : (
								<button
									title='Ingrese una cedula válida'
									className='NextBtn'
									disabled={true}
								>
									SIGUIENTE
								</button>
							)} */}
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
