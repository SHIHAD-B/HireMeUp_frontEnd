import * as yup from 'yup';

export const addJobValidation = yup.object().shape({
    companyId: yup.string().required("Company ID is required"),
    description: yup.string().min(5).required("Description is required"),
    salary_from: yup.number().min(0).max(yup.ref('salary_to')).required("Salary from is required"),
    responsibilities: yup.string().min(5).required("Responsibilities are required"),
    questions: yup.array().of(yup.string()).min(0).optional(),
    required_skills: yup.array().of(yup.string()).min(1).required("At least one skill is required"),
    requirements: yup.string().min(5).required("Requirements are required"),
    category: yup.string().required("Select one category"),
    salary_to: yup.number().min(yup.ref('salary_from')).required("Salary to is required"),
    job_title: yup.string().required("Job title is required"),
    type: yup.string().required("Select one type"),
    location:yup.string().nullable().optional(),
    benefits: yup.array().of(yup.object().shape({
        description: yup.string().nullable().optional(),
        icon: yup.string().nullable().optional(),
        name: yup.string().nullable().optional()
    })).optional(),
    qualification: yup.string().required("Qualification is required"),
    slot: yup.number().min(1).required("Please provide the number of slots"),
    start_date: yup
        .string()
        .required("Start date is required")
        .matches(/^\d{4},\d{2},\d{2}$/, 'Invalid date format (YYYY,MM,DD)')
        .test('is-valid-date', 'Start date must be equal to or greater than today', function(value) {
            const dateParts = value.split(',');
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; 
            const day = parseInt(dateParts[2], 10);
            const startDate = new Date(year, month, day);
            return startDate >= new Date();
        }),
    end_date: yup
        .string()
        .required("End date is required")
        .matches(/^\d{4},\d{2},\d{2}$/, 'Invalid date format (YYYY,MM,DD)')
        .test('is-valid-date', 'End date must be equal to or greater than today', function(value) {
            const dateParts = value.split(',');
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; 
            const day = parseInt(dateParts[2], 10);
            const endDate = new Date(year, month, day);

            return endDate >= new Date();
        })
        .test('is-after-start', 'End date must be after start date', function(value, { parent }) {
            const startDate = parent.start_date;
            if (!startDate) return true;
            const startDateParts = startDate.split(',');
            const endDateParts = value.split(',');
            const start = new Date(parseInt(startDateParts[0], 10), parseInt(startDateParts[1], 10) - 1, parseInt(startDateParts[2], 10));
            const end = new Date(parseInt(endDateParts[0], 10), parseInt(endDateParts[1], 10) - 1, parseInt(endDateParts[2], 10));
            return end >= start;
        })
});
