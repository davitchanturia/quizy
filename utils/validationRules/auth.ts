import * as Yup from "yup";

/*
this comments must be equal to he backend validation rules.
if you change the validation rules here, you must change the validation rules in backend too.
*/

export const userLoginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required.")
    .email("Please enter a valid email address."),
  password: Yup.string()
    .min(3, "Minimum 3 characters.")
    .required("Password is required."),
});
