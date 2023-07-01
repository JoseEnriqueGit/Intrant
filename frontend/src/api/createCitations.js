import axios from 'axios';

export const createCitation = async formData => {
	axios
		.post('https://intrantapi.onrender.com/new-citation', formData)
		.then(res => {
			if (res.status === 201) {
				return true;
			}
		})
		.catch(error => {
			console.log(error);
            return false;
		});
};
