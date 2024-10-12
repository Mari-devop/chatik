import axios from "axios";
import { dbInstance } from "../db";

export const register = async (email: string, password: string ) => {
    const users = await dbInstance.getData("users");
    const shareToken: string = users?.[0]?.shareToken;

    const requestBody = {
        email,
        password,
        shareToken,
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

export const googleSignUp = async (googleToken: string) => {
    const profileResponse = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleToken}`
    );

    const userProfile = profileResponse.data;
    const { email, name, picture } = userProfile;

    const users = await dbInstance.getData("users");
    const shareToken = users?.[0]?.shareToken;

    const response = await axios.post('https://eternalai.fly.dev/user/register', {
        googleToken,
        email,
        name,
        shareToken,
    });

    const { token } = response.data;

    await dbInstance.addData('users', { email, token, name, picture });
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

    const { token, hasAcceptedPolicy } = response.data;

    await dbInstance.addData('users', { email, password, token, hasAcceptedPolicy });
    return response.data;
};

export const googleLogin = async (googleToken: string) => {
    const profileResponse = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleToken}`
    );

    const userProfile = profileResponse.data;
    const { email, name } = userProfile;

    const response = await axios.post('https://eternalai.fly.dev/user/login', {
        googleToken,
        email,
        name,
    });

    const { token } = response.data;

    await dbInstance.addData('users', { email, token, name });
    return response.data;
};