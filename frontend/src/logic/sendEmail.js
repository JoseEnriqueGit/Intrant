import emailjs from '@emailjs/browser';

export const sendEmail = async (formData, dataApi) => {
    emailjs
    .send(
        'service_ni2w16l',
        'template_9r54z9a',
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

