import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useToast } from '@/hooks/useToast';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface ToastProps {}

const Toast: React.FC<ToastProps> = () => {
    const toast = useToast();
    const toastRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                toastRef.current &&
                !toastRef.current.contains(e.target as Node)
            ) {
                toast.onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toastRef, toast.onClose]);

    useEffect(() => {
        if (toast.isOpen) {
            const timer = setTimeout(() => {
                toast.onClose();
            }, 5000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [toast.isOpen, toast.onClose]);

    const handleDrag = (_: DraggableEvent, { deltaY }: DraggableData) => {};

    return (
        <div
        // axis='y'
        // bounds={{
        //     top: 0,
        //     bottom: 100,
        // }}
        // onDrag={handleDrag}
        >
            <div
                className={`
                fixed
                bottom-4 right-0
                px-5 py-2
                text-black
                bg-white
                shadow-lg
                border border-gray-200
                rounded-md
                flex    
                items-center
                justify-between
                gap-2
                transition-all duration-300
                transform
                group
                z-50
                ${
                    toast.isOpen
                        ? 'translate-y-0  opacity-100'
                        : 'translate-y-full opacity-0'
                }
            `}
                ref={toastRef}
            >
                <p>
                    <span
                        className='font-bold 
                    capitalize
                    '
                    >
                        {toast.type}
                    </span>
                </p>
                <p>{toast.message}</p>
                <XIcon
                    onClick={() => {
                        toast.onClose();
                    }}
                    className='w-5 h-5 cursor-pointer opacity-0 group-hover:opacity-100
                    hover:scale-110 transform text-gray-400
                     transition-all duration-300 hover:text-black'
                />
            </div>
        </div>
    );
};

export default Toast;
