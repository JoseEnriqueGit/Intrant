// imports
import Select from 'react-select';
import { useState, useContext } from 'react';
// components
import {
	Form,
	TitleHeader,
	Button,
	Input,
	NoOptionsMessage,
	WarningDiv,
	SelectStyle,
} from '../../../pagesComponents';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Context
import { FormDataContext, PageContext } from '../../../hooks/contexts';
// Logic
import { disableBeforeDays, isWorkingDay } from '../../../logic/date.js';
// Options Imports
import {
	AllServices,
	optionService,
	optionsOficinas,
	optionsTimes,
} from '../../InputsTypes';

const DateServiceForm = props => {
	const { formData, setFormData } = useContext(FormDataContext);
	const { page, setPage } = useContext(PageContext);
	const [isNonWorking, setIsNonWorking] = useState(false);
	const [isWeekend, setIsWeekend] = useState(false);

	function datePickerValidation(e) {
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
			setPage(page + 1);
		}
	}

	return (
		<>
			<TitleHeader text='CONFIGURAR CITA ' />
			<Form className='FormDateService' onSubmit={datePickerValidation}>
				<fieldset lang='es'>
					<legend>LUGAR DEL SERVICIO</legend>

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
								defaultValue={formData.fecha}
								onChange={e =>
									setFormData({ ...formData, fecha: e.target.value })
								}
							/>
						</li>
					</ul>
				</fieldset>
				<fieldset>
					<legend>SELECCIONE EL SERVICIO</legend>
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
											? AllServices.find(obj => obj.value === formData.asunto)
											: ''
									}
									onChange={e => setFormData({ ...formData, asunto: e.value })}
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
									onChange={e => setFormData({ ...formData, hora: e.value })}
								/>
							</label>
						</li>
						<li>
							<button className='BackBtn' onClick={props.backBtn}>
								<FontAwesomeIcon
									icon={faChevronLeft}
									color='#ff6500'
									size='lg'
								/>
							</button>

							{formData.oficina !== '' &&
							formData.asunto !== '' &&
							formData.hora !== '' ? (
								<Button
									className='NextBtn'
									content='SIGUIENTE'
									disabled={false}
								/>
							) : (
								<Button
									className='NextBtn'
									content='SIGUIENTE'
									disabled={true}
								/>
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

export default DateServiceForm;
