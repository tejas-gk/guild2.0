import React, { useCallback, useRef, useEffect } from 'react';
import Button from './Button';
import { XIcon } from '@heroicons/react/outline';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    body: string | JSX.Element;
    footer?: string | JSX.Element;
    actionLabel: string;
    disabled: boolean;
}

export default function Modal({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
        if (disabled) return;
        onClose();
    }, [disabled, onClose]);

    const handleSend = useCallback(() => {
        if (disabled) return;
        onSubmit();
    }, [disabled, onSubmit]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            ) {
                handleClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef, handleClose]);

    return (
        <div
            className={`fixed 
            inset-0
            flex
            items-center
            justify-center
            z-50
          bg-neutral-800/60
            ${
                isOpen
                    ? 'transition-opacity duration-300 opacity-100'
                    : 'transition-opacity duration-300 opacity-0 pointer-events-none'
            }`}
        >
            <div
                className={`relative
                 w-full md:w-4/6 lg:w-3/6 xl:w-2/5
                 my-6 mx-auto
                 ${
                     isOpen
                         ? 'transition-transform duration-300 translate-y-0'
                         : 'transition-transform duration-300 -translate-y-full'
                 }`}
                ref={modalRef}
            >
                <div
                    className='
                border-0
                rounded-lg
                shadow-lg
                relative
                flex flex-col
                bg-white
                outline-none
                focus:outline-none
                     '
                >
                    <div
                        className='flex
                     items-center
                     justify-between
                     px-10 pt-10
                     rounded-t'
                    >
                        <h3
                            className='text-3xl 
                        font-semibold
                        text-black'
                        >
                            {title}
                        </h3>
                        <button
                            title='modal'
                            className='
                            p-1
                            ml-auto
                            border-0
                          text-black
                            hover:opacity-70 
                            hover:bg-gray-200
                            rounded-full
                            hover:p-1
                            transition'
                            onClick={handleClose}
                        >
                            <XIcon className='h-6 w-6' />
                        </button>
                    </div>
                    <div
                        className='relative 
                    px-10 pt-7
                    flex-auto
                    '
                    >
                        {body}
                    </div>
                    <div
                        className='
                    flex
                     flex-col
                      gap-2
                      px-10 pt-7 pb-7
                      '
                    >
                        <Button
                            title='Send'
                            colors='primary'
                            onClick={handleSend}
                            disabled={disabled}
                        >
                            {actionLabel}
                        </Button>
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    );
}
