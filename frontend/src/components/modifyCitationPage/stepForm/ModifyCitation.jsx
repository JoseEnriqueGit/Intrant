// Imports
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { useContext, useState } from 'react';
import emailjs from '@emailjs/browser';
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
			window.localStorage.setItem(
				dataApi.Cedula,
				JSON.stringify(dataInStorage)
			);
			setPage(page - 1);
			setFormData((formData.cedula = ''));

			emailjs
				.send(
					'service_ni2w16l',
					'template_vv32ofb',
					dataInStorage,
					'sbYp-g78-UlihhtUM'
				)
				.then(
					result => {},
					error => {
						console.log(error.text);
					}
				);
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
								defaultValue={dataInStorage.correo}
								onChange={e =>
									setDataInStorage({ ...dataInStorage, correo: e.target.value })
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
									defaultValue={dataInStorage.telefono}
									onChange={e => {
										setDataInStorage({
											...dataInStorage,
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
										obj => obj.value === dataInStorage.oficina
									)}
									onChange={e =>
										setDataInStorage({
											...dataInStorage,
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
								defaultValue={dataInStorage.fecha}
								onChange={e =>
									setDataInStorage({ ...dataInStorage, fecha: e.target.value })
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
									options={optionService[dataInStorage.oficina]}
									value={
										dataInStorage.asunto !== ''
											? AllServices.find(
													obj => obj.value === dataInStorage.asunto
											  )
											: ''
									}
									onChange={e =>
										setDataInStorage({ ...dataInStorage, asunto: e.value })
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
										obj => obj.value === dataInStorage.hora
									)}
									onChange={e =>
										setDataInStorage({ ...dataInStorage, hora: e.value })
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
							{dataInStorage.correo !== '' &&
							dataInStorage.telefono !== '' &&
							dataInStorage.asunto !== '' &&
							dataInStorage.oficina !== '' &&
							dataInStorage.fecha !== '' &&
							dataInStorage.hora !== '' ? (
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
