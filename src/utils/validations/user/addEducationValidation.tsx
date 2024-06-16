import * as Yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const educationValidation = Yup.object({
  _id:Yup.string().min(5).optional(),
  course: Yup.string()
    .min(3, "Length must be greater than 3")
    .required("course is required"),
    university: Yup.string()
    .min(5, "Must be greater than 5 letters")
    .max(25, "Must be 25 characters or less")
    .matches(/^[A-Za-z ]+$/, "Field must contain only letters and spaces")
    .required("university is required"),
    grade: Yup.string()
    .min(3, "Length must be greater than 3")
    .required("grade is required"),
  from: Yup.date()
    .max(today, "From date cannot be in the future")
    .required("From date is required"),
  to: Yup.date()
    .min(Yup.ref('from'), "To date cannot be before the from date")
    .max(today, "To date cannot be in the future")
    .required("To date is required"),
    description:Yup.string()
    .min(5, "Must be at least 5 characters")
    .max(500, "Must be 500 characters or less")
    .required("Description is required")
  
});
