import * as Yup from 'yup';

export const employeeValidation = Yup.object({
    firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .matches(/^[\w]+( [\w]+)*$/, 'First name must contain only letters and a single space between words')
        .required("First name is required"),
    lastName: Yup.string()
        .min(1, "Last name must be at least 1 characters")
        .matches(/^[\w]+( [\w]+)*$/, 'Last name must contain only letters and a single space between words')
        .required("Last name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    position: Yup.string()
        .required("Position is required"),
    department: Yup.string()
        .required("Department is required"),
});
