export interface Message {
    isUser: boolean;
    text: string;
    smallImage: string;
}

export interface ChatProps {
    isAuthenticated: boolean;
}