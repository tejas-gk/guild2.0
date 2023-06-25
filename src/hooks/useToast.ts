import { create } from 'zustand';

interface ToastStore {
    isOpen: boolean;
    message: string;
    onOpen: (message: string) => void;
    onClose: () => void;
}

const createToastHook = (): (() => ToastStore) => {
    return create<ToastStore>((set) => ({
        isOpen: false,
        message: '',
        onOpen: (message) => set({ isOpen: true, message }),
        onClose: () => set({ isOpen: false, message: '' }),
    }));
};

export const useToast = createToastHook();
