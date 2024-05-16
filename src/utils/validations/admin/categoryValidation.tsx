import * as Yup from 'yup';

export const categoryValidation = Yup.object({
    category: Yup.string()
        .min(2, "Must be greater than 2 letters")
        .matches(/^[\w]+( [\w]+)*$/, 'Field must contain only letters and a single space between words')
        .required("Name is required"),
    description: Yup.string()
        .required("Description is required"),

});
