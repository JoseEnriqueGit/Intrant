import emailjs from '@emailjs/browser';

// Citation created 'template_9r54z9a'
// Citation modified 'template_vv32ofb'

export const sendEmail = async (formData, dataApi, template) => {
    emailjs
    .send(
        'service_ni2w16l',
        template,
        { ...formData, ...dataApi },
        'sbYp-g78-UlihhtUM'
    )
    .then(
        result => {},
        error => {
            console.log(error.text);
        }
    );
};

