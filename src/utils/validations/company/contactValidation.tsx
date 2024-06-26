import * as Yup from 'yup';

export const contactValidation = Yup.object({
    instagram: Yup.string()
        .url("Must be a valid URL")
        .nullable(),
    linkedIn: Yup.string()
        .url("Must be a valid URL")
        .nullable(),
    twitter: Yup.string()
        .url("Must be a valid URL")
        .nullable(),
});