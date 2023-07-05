import { create } from 'zustand';

interface ToastStore {
    isOpen: boolean;
    message: string;
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
    onClose: () => void;
    type?: 'success' | 'error' | 'warning' | 'info';
}

const createToastHook = (): (() => ToastStore) => {
    return create<ToastStore>((set) => ({
        isOpen: false,
        message: '',
        type: 'success',
        success: (message) => set({ isOpen: true, message, type: 'success' }),
        error: (message) => set({ isOpen: true, message, type: 'error' }),
        warning: (message) => set({ isOpen: true, message, type: 'warning' }),
        info: (message) => set({ isOpen: true, message, type: 'info' }),
        onClose: () => set({ isOpen: false, message: '' }),
    }));
};

export const useToast = createToastHook();
