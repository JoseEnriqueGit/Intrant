// Imports
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { useContext, useState } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
// Components
import {
	Form,
	TitleHeader,
	Button,
	Input,
	SelectStyle,
	WarningDiv,
	NoOptionsMessage,
} from '../../../components';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Context
import {
	FormDataContext,
	PageContext,
	DataApiContext,
	DataInStorageContext,
} from '../../../hooks/contexts';
// Logic
import { disableBeforeDays, isWorkingDay } from '../../../logic/date.js';
// Options Imports
import {
	AllServices,
	optionService,
	optionsOficinas,
	optionsTimes,
} from '../../InputsTypes/select/option.js';

const ModifyCitation = props => {
	const { formData, setFormData } = useContext(FormDataContext);
	const { page, setPage } = useContext(PageContext);
	const { dataApi } = useContext(DataApiContext);
	const { dataInStorage, setDataInStorage } = useContext(DataInStorageContext);
	const [isNonWorking, setIsNonWorking] = useState(false);
	const [isWeekend, setIsWeekend] = useState(false);

	function changeCitation(e) {
		e.preventDefault();
		const date = new Date(document.getElementById('dateService').value);
		const { isWeekend, isHolyday } = isWorkingDay(date);

		if (isWeekend) {
			setIsWeekend(true);
			setIsNonWorking(false);
		} else if (isHolyday) {
			setIsNonWorking(true);
			setIsWeekend(false);
		} else {
			axios
			.put('http://localhost:4000/modic-citation/' + formData.cedula, formData)
			.then(res => {
				if (res.data.result.modifiedCount >= 1 ) {
					setPage(page - 1);
					setFormData((formData.cedula = ''));

					emailjs
					.send(
						'service_ni2w16l',
						'template_vv32ofb',
						formData,
						'sbYp-g78-UlihhtUM'
					)
					.then(
						result => {},
						error => {
							console.log(error.text);
						}
					);
				}
			})
			.catch(error => {
				console.log(error);
			});



		}
	}

	return (
		<>
			<TitleHeader text='CONFIGURAR CITA' />
			<Form className='ModifyCitationForm' onSubmit={changeCitation}>
				<fieldset lang='es'>
					<legend>Cambiar Datos</legend>

					<ul>
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
									maskChar=' '
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
					</ul>
				</fieldset>
				<fieldset>
					<legend>LUGAR DE SERVICIO</legend>

					<ul>
						<li>
							<label>
								OFICINA:
								<Select
									id='office'
									placeholder={'Seleccione...'}
									styles={SelectStyle}
									options={optionsOficinas}
									components={'NoOptionsMessage'}
									value={optionsOficinas.find(
										obj => obj.value === formData.oficina
									)}
									onChange={e =>
										setFormData({
											...formData,
											oficina: e.value,
											asunto: '',
										})
									}
								/>
							</label>
						</li>
						<li>
							<Input
								label='FECHA:'
								id='dateService'
								type='date'
								name='dateService'
								min={disableBeforeDays()}
								defaultValue={formData.fecha.slice(0, 10)}
								onChange={e =>
									setFormData({ ...formData, fecha: e.target.value })
								}
							/>
						</li>
					</ul>
				</fieldset>
				<fieldset>
					<legend>SERVICIO</legend>

					<ul>
						<li>
							<label>
								SERVICIO:
								<Select
									id='service'
									required
									placeholder={'Seleccione...'}
									styles={SelectStyle}
									options={optionService[formData.oficina]}
									value={
										formData.asunto !== ''
											? AllServices.find(
													obj => obj.value === formData.asunto
											  )
											: ''
									}
									onChange={e =>
										setFormData({ ...formData, asunto: e.value })
									}
									components={{ NoOptionsMessage }}
								/>
							</label>
						</li>
						<li>
							<label>
								HORARIO:
								<Select
									id='time'
									placeholder={'Seleccione...'}
									styles={SelectStyle}
									options={optionsTimes}
									components={'NoOptionsMessage'}
									value={optionsTimes[0].options.find(
										obj => obj.value === formData.hora
									)}
									onChange={e =>
										setFormData({ ...formData, hora: e.value })
									}
								/>
							</label>
						</li>
					</ul>
				</fieldset>
				<fieldset>
					<ul>
						<li>
							<button className='BackBtn' onClick={props.backBtn}>
								<FontAwesomeIcon
									icon={faChevronLeft}
									color='#ff6500'
									size='lg'
								/>
							</button>
							{formData.correo !== '' &&
							formData.telefono !== '' &&
							formData.asunto !== '' &&
							formData.oficina !== '' &&
							formData.fecha !== '' &&
							formData.hora !== '' ? (
								<Button
									className='NextBtn'
									content='GUARDAR'
									disabled={false}
								></Button>
							) : (
								<Button
									title='Ingrese una cedula válida'
									className='NextBtn'
									content='GUARDAR'
									disabled={true}
								></Button>
							)}
						</li>
					</ul>
				</fieldset>
				{isWeekend && (
					<WarningDiv className='Warnig' textContent='FECHA NO LABORABLE' />
				)}
				{isNonWorking && (
					<WarningDiv
						className='Warnig'
						textContent='EL DIA SELECCIONADO ES FERIADO'
					/>
				)}
			</Form>
		</>
	);
};

export default ModifyCitation;
