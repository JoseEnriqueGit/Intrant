// Import
import axios from 'axios';

export const modifyCitation = async (cedula, formData) => {
    axios
    .put(
        'https://intrant-api.onrender.com/modic-citation/' + cedula,
        formData
    )
    .then(res => {
        if (res.data.result.modifiedCount >= 1) {
            return true
        }
        else {
            return false
        }
    })
    .catch(error => {
        console.log(error);
    });
};