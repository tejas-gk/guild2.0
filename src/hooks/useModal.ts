import { create } from 'zustand';

interface ModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const createModalHook = (): (() => ModalStore) => {
    return create<ModalStore>((set) => ({
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
    }));
};

export const useEditModal = createModalHook();
export const useRegisterModal = createModalHook();
export const useLoginModal = createModalHook();
