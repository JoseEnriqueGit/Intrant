// Imports
import { useState, useContext } from 'react';
import { createCitation } from '../../../api/createCitations';
// components
import { Form, TitleHeader } from '../../../pagesComponents';
import { faChevronLeft, faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Ring } from '@uiball/loaders';
// Context
import {
	FormDataContext,
	DataApiContext,
	Loading,
} from '../../../hooks/contexts';
import { sendEmail } from '../../../logic/sendEmail';

const ConfirmCitation = props => {
	const { formData } = useContext(FormDataContext);
	const { dataApi } = useContext(DataApiContext);
	const { isLoading, setIsLoading } = useContext(Loading);
	const [isSend, setIsSend] = useState(false);

	async function handleSendData(e) {
		e.preventDefault();
		setIsLoading(true);
		if (createCitation(formData)) {
			sendEmail(formData, dataApi, 'template_9r54z9a');
			setIsSend(true);
			setIsLoading(false);
		} else {
			setIsSend(false);
		}
	}

	return (
		<>
			<TitleHeader text='CONFIRMAR CITA' />
			<Form onSubmit={handleSendData} className='FormConfirmCitation'>
				<fieldset lang='es'>
					<legend>
						CITA DE {dataApi.Nombres} {dataApi.Apellido1} {dataApi.Apellido2}
					</legend>

					<ul>
						<div>
							<li>
								<strong>ASUNTO: </strong>
								<span>{formData.asunto}</span>
							</li>
							<li>
								<strong>OFICINA: </strong>
								<span>{formData.oficina}</span>
							</li>
							<li>
								<strong>FECHA: </strong>
								<span>{formData.fecha}</span>
							</li>
							<li>
								<strong>HORA: </strong>
								<span>{formData.hora}</span>
							</li>
							<li>
								<strong>TEL&Eacute;FONO: </strong>
								<span>{formData.telefono}</span>
							</li>
							<li>
								<strong>CORREO: </strong>
								<span>{formData.correo}</span>
							</li>
						</div>

						<li>
							<button
								className='BackBtn'
								onClick={isSend ? props.backHome : props.backBtn}
							>
								<FontAwesomeIcon
									icon={isSend ? faHomeAlt : faChevronLeft}
									color='#ff6500'
									size='lg'
								/>
							</button>
							{!isSend && (
								<button className='NextBtn' disabled={false}>
									{isLoading ? (
										<Ring size={34} color='#003876'></Ring>
									) : (
										'CONFIRMAR'
									)}
								</button>
							)}
						</li>

						{isSend && (
							<>
								<li>
									<a
										href='https://ov.intrant.gob.do/#/login'
										target='_blank'
										rel='noreferrer'
									>
										Pagos en l&iacute;nea
									</a>
								</li>
								<li>
									<span className='sendSpan'>
										Hemos enviado un correo de tu cita
									</span>
								</li>
							</>
						)}
					</ul>
				</fieldset>
			</Form>
		</>
	);
};

export default ConfirmCitation;
