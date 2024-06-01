import * as Yup from 'yup';

export const profileOneValidation = Yup.object({
    profile:Yup.string().min(3,"field is required").required("image is required"),
    username: Yup.string().min(2, "Must be greater than 2 letters").matches(/^[A-Za-z]+$/, 'Field must contain only letters').required("Username is required"),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required("Phone number is required"),
    dob: Yup.date().required("date of birth is required"),
    gender: Yup.string()
        .required('gender is required')
});
