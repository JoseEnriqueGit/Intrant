// Imports
import InputMask from 'react-input-mask';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { deleteCitation } from '../../api/deleteCitation';
// Components
import { Form, TitleHeader, Button, WarningDiv } from '../../pagesComponents';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Context
import { FormDataContext, DataApiContext } from '../../hooks/contexts';
import UrlApi from '../../hooks/useEffects/useDataCedula';

const CancelForm = () => {
	const { formData, setFormData } = useContext(FormDataContext);
	const { dataApi } = useContext(DataApiContext);
	const { setCedula } = useContext(UrlApi);
	const [hasCitation, setHasCitation] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	async function handleDeleteCitation(e) {
		e.preventDefault();
		const isDeleted = await deleteCitation(formData.cedula)
		
		if (isDeleted){
			setIsDeleted(true);
			setHasCitation(false);
		}
		else{
			setIsDeleted(false);
			setHasCitation(true)
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
