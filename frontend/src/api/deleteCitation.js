// Import
import axios from 'axios';

export const deleteCitation = async cedula => {
	const res = await axios.delete(
		'https://intrant-api.onrender.com/delete-citation/' + cedula
	);

	if (res.status === 200 && res.data.result.deletedCount === 1) {
		return true;
	} else {
		return false;
	}
};
