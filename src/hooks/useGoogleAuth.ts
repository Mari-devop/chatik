import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { dbInstance } from "../db";

type UseGoogleAuthParams = {
    setModalType: React.Dispatch<React.SetStateAction<"success" | "failure">>;
    setModalMessage: React.Dispatch<React.SetStateAction<string>>;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAuthenticated: (value: boolean) => void;  
    setIsOpen: (value: boolean) => void;     
    isLogin?: boolean;
};

export const useGoogleAuth = ({
    setModalType,
    setModalMessage,
    setIsModalVisible,
    setIsAuthenticated,
    setIsOpen,
    isLogin = false,
  }: UseGoogleAuthParams) => {

    const navigate = useNavigate();

    const googleSignInOrSignUp = useGoogleLogin({
        flow: "implicit",
        scope: "openid email profile",
        onSuccess: async (tokenResponse) => {
            try {
                
                const googleAccessToken = tokenResponse.access_token;

                const profileResponse = await axios.get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`
                );

                const userProfile = profileResponse.data;
                const userEmail = userProfile.email;
                const userName = userProfile.name;
                const userImage = userProfile.picture;

                const users = await dbInstance.getData("users");
                const shareToken = users?.[0]?.shareToken;

                const url = isLogin 
                ? "https://eternalai.fly.dev/user/login" 
                : "https://eternalai.fly.dev/user/register";

                const requestBody = {
                    googleToken: googleAccessToken,
                    email: userEmail,
                    name: userName,
                    shareToken,
                };

                const res = await axios.post(url, requestBody);

                const token = res.data.token;

                if (token) {
                    await dbInstance.addData("users", {
                        email: userEmail,
                        token,
                        name: userName,
                        image: userImage,
                    });
                    setModalType("success");
                    setModalMessage(isLogin ? "Google Login Successful!" : "Google Registration Successful! Please, check your email box to verify email!");
                    setIsModalVisible(true);
                    setIsAuthenticated(true);
                    setIsOpen(false);

                    setTimeout(() => {
                        setIsModalVisible(false);
                        navigate(isLogin ? "/" : "/about");
                    }, 3000);
                }
            } catch (error) {
                setModalType("failure");
                setModalMessage(isLogin ? "Google Login Failed. Please try again." : "Google Registration Failed. Please try again.");
                setIsModalVisible(true);
            }
        },
        onError: () => {
            setModalType("failure");
            setModalMessage(isLogin ? "Google Login Failed. Please try again." : "Google Registration Failed. Please try again.");
            setIsModalVisible(true);
        },
    });

    return {
        googleSignInOrSignUp,
    };
};