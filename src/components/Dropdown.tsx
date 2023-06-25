import React, { useState, useEffect, useRef } from 'react';

export default function Dropdown({ children, className, setIsOpen }: any) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [dropdownRef, setIsOpen]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [setIsOpen]);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 0);

        return () => clearTimeout(timeout);
    }, []);

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
        transition-opacity duration-300
      `}
        >
            {children}
        </div>
    );
}
