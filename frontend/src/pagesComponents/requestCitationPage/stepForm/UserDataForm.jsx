// imports
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import InputMask from 'react-input-mask';
import { existCitation } from '../../../api/existCitation';
import { sliceDash } from '../../../logic/sliceDash';
import { bornDateUser } from '../../../logic/date';
// components
import { Ring } from '@uiball/loaders';
import {
	Form,
	TitleHeader,
	Input,
	OutPut,
	WarningDiv,
} from '../../../pagesComponents';
// context
import {
	FormDataContext,
	PageContext,
	DataApiContext,
	Loading,
} from '../../../hooks';
import UrlApi from '../../../hooks/useEffects/useDataCedula';

const UserDataForm = () => {
	const { formData, setFormData } = useContext(FormDataContext);
	const { page, setPage } = useContext(PageContext);
	const { dataApi, setDataApi } = useContext(DataApiContext);
	const { isLoading, setIsLoading } = useContext(Loading);
	const { setCedula } = useContext(UrlApi);
	const [hasCitation, setHasCitation] = useState(false);

	async function handleNextPage(e) {
		e.preventDefault();
		setIsLoading(true);
		const isExist = await existCitation(formData.cedula);
		if (isExist) {
			setHasCitation(true);
			setIsLoading(false);
		} else {
			setIsLoading(false);
			setPage(page + 1);
		}
	}

	// Render
	return (
		<>
			<TitleHeader text='CITA PARA EL SERVICIO' />
			<Form className='UserDataForm' onSubmit={handleNextPage}>
				<fieldset lang='es'>
					<legend>DATOS DEL VISITANTE</legend>

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
										setHasCitation(false);
										setCedula(sliceDash(e.target.value));
										setFormData({
											...formData,
											cedula: e.target.value,
										});
										setDataApi({});
									}}
								></InputMask>
							</label>
						</li>
						<li>
							<OutPut
								label='NOMBRE:'
								type='text'
								id='name'
								name='user_name'
								autoComplete='off'
								disabled={true}
								value={dataApi.Nombres}
							/>
						</li>
						<li>
							<OutPut
								label='NACIMIENTO:'
								type='date'
								id='nacimineto'
								name='user_nacimineto'
								autoComplete='off'
								disabled={true}
								value={bornDateUser(dataApi.ok, dataApi)}
							/>
						</li>
						<li>
							<Input
								label='CORREO:'
								type='email'
								id='email'
								name='user_email'
								autoComplete='off'
								focus={false}
								defaultValue={formData.correo}
								onChange={e =>
									setFormData({ ...formData, correo: e.target.value })
								}
							/>
						</li>
						<li>
							<label>
								TELEFONO:
								<InputMask
									id='tel'
									name='user_tel'
									autoComplete='off'
									mask='+1\(999) 999-9999'
									maskChar=''
									defaultValue={formData.telefono}
									onChange={e => {
										setFormData({
											...formData,
											telefono: e.target.value,
										});
									}}
								/>
							</label>
						</li>
						<li>
							<button
								title={
									formData.cedula === '' ||
									formData.correo === '' ||
									formData.telefono === ''
										? 'Llene todos los campos'
										: ''
								}
								className='NextBtn'
								disabled={!dataApi.ok || formData.telefono === ''}
							>
								{isLoading ? (
									<Ring size={34} color='#003876'></Ring>
								) : (
									'SIGUIENTE'
								)}
							</button>
						</li>
					</ul>

					<ul>
						<li>
							<Link to='/Modificar'>MODIFICAR CITA</Link>
						</li>
						<li>
							<Link to='/CancelarCita'>CANCELAR CITA</Link>
						</li>
					</ul>
				</fieldset>
				{hasCitation && (
					<WarningDiv
						className='Warnig'
						textContent='USTED YA TIENE UNA CITA'
					/>
				)}
			</Form>
		</>
	);
};

export default UserDataForm;
