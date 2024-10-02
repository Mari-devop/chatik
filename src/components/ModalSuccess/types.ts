export interface ModalSuccessProps {
    isVisible: boolean;
    modalType: "success" | "failure" | "share" | "confirm";
    message: string;
    shareLink?: string;
    onClose: () => void;
    children?: React.ReactNode;
}