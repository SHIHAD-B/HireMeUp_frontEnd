import * as Yup from 'yup';

export const addressValidation = Yup.object({
    houseNumber: Yup.string().required('House Number is required'),
    locality: Yup.string().required('Locality is required'),
    pin: Yup.string()
        .matches(/^\d{6}$/, 'Pin should be a 6-digit number')
        .required('Pin is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required')
});
