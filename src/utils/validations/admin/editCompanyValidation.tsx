import * as Yup from 'yup';

export const editCompanyValidation = Yup.object({
    _id: Yup.string().min(5).required("id is required"),
    email: Yup.string()
        .email('Email must be a valid email address')
        .optional()
        .nullable()
        .max(255)
        .trim(),
    company_name: Yup.string()
        .min(1, 'Company name must be at least 1 character long')
        .max(50, 'Company name cannot be longer than 50 characters')
        .optional()
        .nullable()
        .trim(),
    password: Yup.string()
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least 8 characters, one uppercase letter, one digit, and one special character')
        .optional()
        .nullable()
        .trim(),
});
