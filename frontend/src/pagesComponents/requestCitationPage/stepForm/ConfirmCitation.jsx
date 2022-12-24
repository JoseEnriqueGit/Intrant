// Imports
import { useState, useContext } from 'react';
import { createCitation } from '../../../api/createCitations';
// components
import { Form, TitleHeader, Button } from '../../../pagesComponents';
import { faChevronLeft, faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Context
import { FormDataContext, DataApiContext } from '../../../hooks/contexts';
import { sendEmail } from '../../../logic/sendEmail';

const ConfirmCitation = props => {
	const { formData } = useContext(FormDataContext);
	const { dataApi } = useContext(DataApiContext);
	const [isSend, setIsSend] = useState(false);

	async function handleSendData(e) {
		e.preventDefault();

		if(createCitation(formData)){
			sendEmail(formData, dataApi, 'template_9r54z9a');
			setIsSend(true);
		}
		else{
			setIsSend(false)
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
								<strong>TELEFONO: </strong>
								<span>{formData.telefono}</span>
							</li>
							<li>
								<strong>CORREO: </strong>
								<span>{formData.correo}</span>
							</li>
						</div>

						{isSend ? (
							<>
								<li>
									<button className='BackBtn' onClick={props.backHome}>
										<FontAwesomeIcon
											icon={faHomeAlt}
											color='#ff6500'
											size='lg'
										/>
									</button>
								</li>
								<li>
									<a
										href='https://ov.intrant.gob.do/#/login'
										target='_blank'
										rel='noreferrer'
									>
										Pagos en linea
									</a>
								</li>
								<li>
									<span className='sendSpan'>
										Hemos enviado un correo de tu cita
									</span>
								</li>
							</>
						) : (
							<li>
								<button className='BackBtn' onClick={props.backBtn}>
									<FontAwesomeIcon
										icon={faChevronLeft}
										color='#ff6500'
										size='lg'
									/>
								</button>
								<Button
									className='NextBtn'
									content='CONFIRMAR'
									disabled={false}
								/>
							</li>
						)}
					</ul>
				</fieldset>
			</Form>
		</>
	);
};

export default ConfirmCitation;
