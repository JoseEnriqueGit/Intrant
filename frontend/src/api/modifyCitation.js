// Import
import axios from 'axios';

export const modifyCitation = async (cedula, formData) => {
	const res = await axios.put(
		'https://intrant-api.onrender.com/modic-citation/' + cedula,
		formData
	);
	
	if (res.status === 200 && res.data.result.modifiedCount === 1) {
		return true;
	} else {
		return false;
	}
};
