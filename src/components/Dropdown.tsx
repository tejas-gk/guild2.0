import React, { useState, useEffect, useRef } from 'react';

export default function Dropdown({ children, className, setIsOpen }: any) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 0);

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
            clearTimeout(timeout);
        };
    }, [dropdownRef, setIsOpen]);

    return (
        <div
            ref={dropdownRef}
            className={`
        bg-white
        shadow-md
        absolute
        left-0 top-10
        w-full
        flex
        flex-col
        rounded-md
        border border-gray-200
        py-5 px-4
        ${className}
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        transition-all duration-300
        ${
            isVisible
                ? 'transform translate-y-0'
                : 'transform translate-y-[-10px]'
        }
      `}
        >
            {children}
        </div>
    );
}
