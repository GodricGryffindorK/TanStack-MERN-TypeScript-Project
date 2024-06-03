import { FormEvent } from "react";
import { loginForm } from "../types/types";
import axios from "axios"

export const loginUser = async (form: loginForm) => {
    try {
        return axios.post('http://localhost:3000/auth/login', form)
            .then((res) => res)
            .catch((data) => data.response)
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}