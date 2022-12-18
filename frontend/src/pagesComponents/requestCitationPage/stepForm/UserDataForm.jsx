// imports
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import InputMask from 'react-input-mask';
import axios from 'axios';
// components
import {
	Form,
	TitleHeader,
	Button,
	Input,
	OutPut,
	WarningDiv,
} from '../../../components';
import { bornDateUser } from '../../../logic/date';
// context
import {
	FormDataContext,
	PageContext,
	DataApiContext,
} from '../../../hooks';
import UrlApi from '../../../hooks/useEffects/useDataCedula';

const UserDataForm = () => {
	const { formData, setFormData } = useContext(FormDataContext);
	const { page, setPage } = useContext(PageContext);
	const { dataApi } = useContext(DataApiContext);
	const { setCedula } = useContext(UrlApi);
	const [hasCitation, setHasCitation] = useState(false);

	function nextPage(e) {
		e.preventDefault();
		axios
		.get('https://intrant-api.onrender.com/citation/' + formData.cedula)
		.then(res => {
			if (res.status === 200) {
				setHasCitation(true)
			}
		})
		.catch(error => {
			if (error.response.status === 404) {
				setHasCitation(false)
				setPage(page + 1);
			}
			else{
				console.log(error);
			}
		});
	}

	// Render
	return (
		<>
			<TitleHeader text='CITA PARA EL SERVICIO' />
			<Form className='UserDataForm' onSubmit={nextPage}>
				<fieldset lang='es'>
					<legend>DATOS DEL VISITANTE</legend>

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
										setHasCitation(false);
										setCedula(e.target.value.replaceAll('-', ''));
										setFormData({
											...formData,
											cedula: e.target.value,
										});
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
