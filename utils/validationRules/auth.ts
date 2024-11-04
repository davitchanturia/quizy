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

export const userRegisterSchema = Yup.object({
  name: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores and hyphens"
    ),

  email: Yup.string()
    .required("Email is required")
    .email("Must be a valid email address")
    .trim(),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),

  password_confirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
