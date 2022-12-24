// Import
import axios from 'axios';

export const deleteCitation = async cedula => {
	axios
		.delete('https://intrant-api.onrender.com/delete-citation/' + cedula)
		.then(res => {
			if (res.status === 200 && res.data.result.deletedCount === 1) {
				return true;
			} else {
				return false;
			}
		})
		.catch(error => console.log(error));
};
