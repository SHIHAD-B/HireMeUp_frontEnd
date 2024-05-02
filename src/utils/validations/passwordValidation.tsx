import * as Yup from 'yup';

export const passwordValidation = Yup.object({
    password: Yup.string()
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least 8 characters, one uppercase letter, one digit, and one special character')
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required')
});
