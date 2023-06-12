import React, { useState } from 'react';

interface InputProps {
    value?: string;
    type?: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const Input: React.FC<InputProps> = ({
    value,
    type = 'text',
    onChange,
    disabled,
    label,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!value) {
            setIsFocused(false);
        }
    };

    return (
        <div>
            <label
                title={label}
                className={`
                text-sm
                relative
                '
                `}
            >
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className='
                    h-20 w-full
                    text-4xl
                    bg-white
                    border-2
                    rounded-lg
                    border-gray-300/50
                    focus:outline-blue-500 outline-none
                    transition 
                    duration-200
                    ease-in-out
                    px-4 py-2

                    '
                />
                <span
                    className='input-text
                    px-6
                    text-4xl
                    text-gray-400/80
                    absolute
                    -top-4 left-0
                    transition
                    duration-200
                    ease-in-out
                '
                >
                    {label}
                </span>
            </label>
        </div>
    );
};

export default Input;
