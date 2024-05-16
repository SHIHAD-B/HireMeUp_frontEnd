import * as Yup from 'yup';

export const planValidation = Yup.object({
    name: Yup.string()
        .min(2, "Must be greater than 2 letters")
        .matches(/^[A-Za-z]+$/, 'Field must contain only letters')
        .required("Name is required"),
    duration: Yup.number()
        .min(1, "Duration must be at least 1")
        .required("Duration is required")
        .max(365,"must not greater than 365"),
    description: Yup.string()
        .required("Description is required"),
    price: Yup.number()
        .min(1, "Price must be a positive number")
        .required("Price is required"),
    discount: Yup.number()
        .min(0, "Discount must be a positive number")
        .max(100, "Discount cannot be greater than 100")
        .required("Discount is required"),
});
