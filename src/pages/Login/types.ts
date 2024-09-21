export interface LoginProps {
    setIsLoginOpen: (value: boolean) => void;
    setIsSignupOpen: (value: boolean) => void;
    checkAuthentication: () => Promise<boolean>;
    setIsAuthenticated: (value: boolean) => void;
    emailFromReset?: string;
}