import * as Yup from 'yup';

export const signupValidation = Yup.object({
    username: Yup.string().min(2, "Must be greater than 2 letters").matches(/^[A-Za-z]+$/, 'Field must contain only letters').required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least 8 characters, one uppercase letter, one digit, and one special character')
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required')
});
