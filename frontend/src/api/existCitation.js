// Import
import axios from 'axios';

export const existCitation = async cedula => {
	const res = await axios.get('https://intrant-api.onrender.com/all-citations');

	const existCitation = res.data.result.find(
		element => element.cedula === cedula
	);

	if (!existCitation) {
		return false;
	} else {
		return { isExist: true, getCitation: existCitation };
	}
};
