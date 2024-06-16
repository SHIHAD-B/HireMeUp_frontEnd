import * as Yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const experienceValidation = Yup.object({
  _id:Yup.string().min(5).optional(),
  company: Yup.string()
    .min(3, "Length must be greater than 3")
    .required("Field is required"),
  designation: Yup.string()
    .min(5, "Must be greater than 5 letters")
    .max(25, "Must be 25 characters or less")
    .matches(/^[A-Za-z ]+$/, "Field must contain only letters and spaces")
    .required("Designation is required"),
  location: Yup.string()
    .required("Field is required"),
  from: Yup.date()
    .max(today, "From date cannot be in the future")
    .required("From date is required"),
  to: Yup.date()
    .min(Yup.ref('from'), "To date cannot be before the from date")
    .max(today, "To date cannot be in the future")
    .required("To date is required")
});
