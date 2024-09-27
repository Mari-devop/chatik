export interface MenuProps {
    setIsMenuOpen: (value: boolean) => void;
    isMenuOpen?: boolean;
    checkAuthentication: () => Promise<boolean>;
    setIsAuthenticated: (value: boolean) => void;
};

export interface User {
    id: number;
    email: string;
    password: string;
    token?: string;
}