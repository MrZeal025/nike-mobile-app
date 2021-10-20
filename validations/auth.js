import * as yup from "yup";

// this will be the sign up validations
export const signUpValidationSchema = yup.object().shape({
    fullName: yup.string().required("Fullname is required"),
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email address is required'),
    password: yup
        .string()
        .required('Password is required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    confirmPassword: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Confirm Password is required'),
    })

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required("Email address is requried"),
    password: yup
        .string()
        .required('Password is required')
})