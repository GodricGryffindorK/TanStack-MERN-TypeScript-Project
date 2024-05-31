import { FormEvent } from "react";
import { loginForm } from "../types/types";
import axios from "axios"

export const loginUser = async (event: FormEvent, form: loginForm) => {
    event.preventDefault();
    try {
        return axios.post('http://localhost:3000/auth/login', form)
            .then((res) => res)
            .catch((data) => data.response)
    } catch (error) {
        console.log(error);
        return error;
    }
}