import * as Yup from 'yup';

const websiteRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/.*)?$/;

export const setProfileOneValidation = Yup.object().shape({
  company_name: Yup.string().required('Company name is required'),
  employees: Yup.string().matches(/^\d+-\d+$/, 'Employees should be in the format "50-100"').required('Employees range is required'),
  industry: Yup.string().required('Industry is required'),
  founded: Yup.date().required('Founded date is required'),
  website: Yup.string().matches(websiteRegex, 'Invalid website URL').required('Website is required'),
  location: Yup.array().of(Yup.string().required('Location is required')).min(1, 'At least one location is required'),
  tech_stack: Yup.array().of(Yup.string().required('Tech stack item is required')).min(1, 'At least one tech stack item is required'),
  description: Yup.string().required('Description is required')
});
