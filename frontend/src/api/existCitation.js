// Import
import axios from 'axios';

export const existCitation = async cedula => {
	const res = await axios.get('https://intrant-api.onrender.com/all-citations');

	const existCitation = res.data.result.filter(
		element => element.cedula === cedula
	);

	if (existCitation.length === 0) {
		return false;
	} else {
		return true;
	}
};
