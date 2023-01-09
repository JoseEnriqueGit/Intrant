// Imports
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { useContext, useState } from 'react';
import { modifyCitation } from '../../../api/modifyCitation';
import { sendEmail } from '../../../logic/sendEmail';
// Components
import { Ring } from '@uiball/loaders';
import {
	Form,
	TitleHeader,
	Input,
	SelectStyle,
	WarningDiv,
	NoOptionsMessage,
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
// Logic
import { disableBeforeDays, isWorkingDay } from '../../../logic/date.js';
// Options Imports
import {
	AllServices,
	optionService,
	optionsOficinas,
	optionsTimes,
} from '../../InputsTypes';

const ModifyCitation = props => {
	const { formData, setFormData } = useContext(FormDataContext);
	const { setDataApi } = useContext(DataApiContext);
	const { page, setPage } = useContext(PageContext);
	const { isLoading, setIsLoading } = useContext(Loading);
	const [isNonWorking, setIsNonWorking] = useState(false);
	const [isWeekend, setIsWeekend] = useState(false);
	const [isModify, setIsModify] = useState(true);

	async function handleChangeCitation(e) {
		e.preventDefault();
		setIsLoading(true);
		const date = new Date(document.getElementById('dateService').value);
		const { isWeekend, isHolyday } = isWorkingDay(date);
		const isModify = await modifyCitation(formData.cedula, formData);

		if (isWeekend) {
			setIsWeekend(true);
			setIsNonWorking(false);
		} else if (isHolyday) {
			setIsNonWorking(true);
			setIsWeekend(false);
		} else {
			if (isModify) {
				setPage(page - 1);
				sendEmail(formData, null, 'template_vv32ofb');
				setFormData({});
				setDataApi({});
				setIsLoading(false);
			} else {
				setIsModify(false);
				setIsLoading(false);
			}
		}
	}

	return (
		<>
			<TitleHeader text='CONFIGURAR CITA' />
			<Form className='ModifyCitationForm' onSubmit={handleChangeCitation}>
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
							{
								<button
									title={
										formData.correo === '' ||
										formData.telefono === '' ||
										formData.asunto === '' ||
										formData.oficina === '' ||
										formData.fecha === '' ||
										formData.hora === ''
											? 'Llene todos los campos'
											: ''
									}
									className='NextBtn'
									disabled={
										formData.correo === '' ||
										formData.telefono === '' ||
										formData.asunto === '' ||
										formData.oficina === '' ||
										formData.fecha === '' ||
										formData.hora === ''
									}
								>
									{isLoading ? (
										<Ring size={34} color='#003876'></Ring>
									) : (
										'GUARDAR'
									)}
								</button>
							}
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
				{!isModify && (
					<WarningDiv
						className='Warnig'
						textContent='NO SE HA DECTETADO CAMBIOS'
					/>
				)}
			</Form>
		</>
	);
};

export default ModifyCitation;
