import axios from "axios";

const baseUrl = "https://lit-spire-85210.herokuapp.com";

export const getUserInfo = (_id) => {
    return axios.get(`${baseUrl}/api/user/${_id}`);
}

export const userSignUp = (data) => {
    return axios.post(`${baseUrl}/api/auth/users/sign-up`, data);
}

export const userSignIn = (data) => {
    return axios.post(`${baseUrl}/api/auth/users/login`, data);
}