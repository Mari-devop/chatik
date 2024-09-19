import axios, { AxiosError } from "axios";
import { dbInstance } from "../db";

export const register = async (email: string, password: string) => {
    // try {
        const response = await axios.post('https://eternalai.fly.dev/user/register', {
            email,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { token } = response.data;
        await dbInstance.addData('users', { email, password, token });
        return response.data;

    // } catch (error: unknown) {
    //     if(axios.isAxiosError(error)) {
    //         if(error.response && error.response.status === 401) {
    //             window.location.href = '/';
    //         } else {
    //             console.error('Registration Error:', error);
    //         }
    //     } else {
    //         console.error('Registration Error:', error);
    //     } 
    // }
};

export const login = async (email: string, password: string) => {
    // try {
        const response = await axios.post('https://eternalai.fly.dev/user/login', {
            email,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { token } = response.data;
        await dbInstance.addData('users', { email, password, token });
        return response.data;

    // } catch (error) {
    //     if(axios.isAxiosError(error)) {
    //         if(error.response && error.response.status === 401) {
    //             window.location.href = '/';
    //         } else {
    //             console.error('Registration Error:', error);
    //         }
    //     } else {
    //         console.error('Registration Error:', error);
    //     } 
    // }
};
