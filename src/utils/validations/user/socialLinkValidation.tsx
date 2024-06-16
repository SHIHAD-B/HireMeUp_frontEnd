import * as Yup from 'yup';

export const socialLinkValidation = Yup.object({
    instagram: Yup.string()
    .url("Must be a valid URL")
    .nullable(),
  linkedin: Yup.string()
    .url("Must be a valid URL")
    .nullable(),
  portfolio: Yup.string()
    .url("Must be a valid URL")
    .nullable(),
  twitter: Yup.string()
    .url("Must be a valid URL")
    .nullable(),
});