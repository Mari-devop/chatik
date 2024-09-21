export interface SignupProps {
    setIsSignupOpen: (value: boolean) => void;
    setIsLoginOpen: (value: boolean) => void;
    checkAuthentication: () => Promise<boolean>;
    setIsAuthenticated: (value: boolean) => void;
}