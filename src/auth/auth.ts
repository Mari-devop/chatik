import axios from "axios";
import { dbInstance } from "../db";

export const register = async (email: string, password: string) => {
    const shareTokens = await dbInstance.getData("shareTokens");
    const shareToken = shareTokens?.[0]?.token;
    const requestBody = {
        email,
        password,
        ...(shareToken && { shareToken })
    };
    const response = await axios.post('https://eternalai.fly.dev/user/register', requestBody, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const { token } = response.data;
    await dbInstance.addData('users', { email, password, token });
    return response.data;
};

export const login = async (email: string, password: string) => {
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
};
