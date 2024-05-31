import { FormEvent } from "react";
import { registrationForm } from "../types/types";
import axios from "axios"
export const registerUser = async (event: FormEvent, form: registrationForm) => {
    event.preventDefault();
    try {
        return axios.post('http://localhost:3000/auth/register', form)
            .then((res) => res)
            .catch((data) => data.response)
    } catch (error) {
        console.log(error);
        return error;
    }
}