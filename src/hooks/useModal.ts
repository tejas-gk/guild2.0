import create from 'zustand';

interface ModalStore<T> {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: T; // additional data property specific to the modal
}

export function useModalStore<T>(initialData: T): ModalStore<T> {
    return create<ModalStore<T>>((set) => ({
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
        data: initialData,
    }));
}
