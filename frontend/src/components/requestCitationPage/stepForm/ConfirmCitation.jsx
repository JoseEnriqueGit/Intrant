// Imports
import { useState, useContext } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import emailjs from '@emailjs/browser';
// components
import { Form, TitleHeader, Button, DatePdf } from '../../../components';
import { faChevronLeft, faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Context
import { FormDataContext, DataApiContext } from '../../../hooks/contexts';
import axios from 'axios';

const ConfirmCitation = props => {
	const { formData } = useContext(FormDataContext);
	const { dataApi } = useContext(DataApiContext);
	const [isSend, setIsSend] = useState(false);

	async function sendData(e) {
		e.preventDefault();
		axios
			.post('http://localhost:4000/new-citation', formData)
			.then(res => {
				if (res.status === 201) {
					setIsSend(true);
					emailjs
						.send(
							'service_ni2w16l',
							'template_9r54z9a',
							{ ...formData, ...dataApi },
							'sbYp-g78-UlihhtUM'
						)
						.then(
							result => {
								setIsSend(true);
							},
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

	return (
		<>
			<TitleHeader text='CONFIRMAR CITA' />
			<Form onSubmit={sendData} className='FormConfirmCitation'>
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
									{/* <PDFDownloadLink
										className='linkBtn'
										document={
											<DatePdf
												Nombres={dataApi.Nombres}
												Apellido1={dataApi.Apellido1}
												Apellido2={dataApi.Apellido2}
												asunto={formData.asunto}
												oficina={formData.oficina}
												fecha={formData.fecha}
												hora={formData.hora}
												telefono={formData.telefono}
												correo={formData.correo}
											/>
										}
										fileName='INTRANT-CITA.pdf'
									>
										DESCARGAR
									</PDFDownloadLink> */}
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
