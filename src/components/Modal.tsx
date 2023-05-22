import React, { useCallback, useRef, useEffect } from 'react';
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

    if (!isOpen) return null;
    return (
        <div
            className='
          justify-center 
          items-center 
          flex 
          overflow-x-hidden overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800 bg-opacity-70
        '
        >
            <div
                className='
            relative 
             w-full lg:w-3/6 lg:max-w-3xl h-full lg:h-auto
             my-6 mx-auto
              '
                ref={modalRef}
            >
                {/*content*/}
                <div
                    className='
            w-full h-full lg:h-auto  
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            bg-white
            outline-none  focus:outline-none
            '
                >
                    {/*header*/}
                    <div
                        className='
              flex 
              items-center 
              justify-between 
              p-10 
              rounded-t
              '
                    >
                        <h3
                            className='
                        text-3xl
                         font-semibold
                          text-black
                          '
                        >
                            {title}
                        </h3>
                        <button
                            className='
                  p-1 
                  ml-auto
                  border-0 
                  text-black
                  hover:opacity-70
                  transition
                '
                            onClick={handleClose}
                        >
                            X
                        </button>
                    </div>
                    {/*body*/}
                    <div
                        className='
                    relative
                     p-10
                     flex-auto
                     '
                    >
                        {body}
                    </div>
                    {/*footer*/}
                    <div
                        className='
                    flex
                    flex-col
                    gap-2
                    p-10'
                    >
                        {/* 
                        todo make this buttom a separate component
                        */}
                        <button
                            className='
                    bg-primary-500
                    text-white
                    active:bg-primary-600
                    font-bold
                    uppercase
                    text-sm
                    px-6 py-3
                    rounded
                    shadow
                    hover:shadow-lg
                    bg-black
                    outline-none focus:outline-none
                    ease-linear
                    transition-all
                    duration-150
                    '
                            type='button'
                            onClick={handleSend}
                        >
                            {actionLabel}
                        </button>

                        {footer}
                    </div>
                </div>
            </div>
        </div>
    );
}
