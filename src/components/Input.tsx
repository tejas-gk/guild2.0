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
        <div className='w-full relative'>
            {label && (
                <label
                    className={`text-xl
            text-black
            font-semibold
            mt-2
            ml-4
            absolute
            transition-all
            ${isFocused || value ? 'text-sky-500' : 'text-neutral-800'}
            ${
                isFocused || value
                    ? 'transform scale-75 -translate-y-5'
                    : 'translate-y-2'
            }
          `}
                >
                    {label}
                </label>
            )}
            <input
                title={label}
                disabled={disabled}
                onChange={onChange}
                value={value}
                placeholder=''
                type={type}
                className={`
          w-full
          p-4 
          text-lg 
          bg-white
          border-2 border-neutral-800 
          rounded-md
          outline-none
          text-black
          focus:border-sky-500
          focus:border-2
          transition
          disabled:bg-neutral-900
          disabled:opacity-70
          disabled:cursor-not-allowed

           ${isFocused || value ? 'pt-8 pb-2 border-b-2' : 'pt-4 pb-2'}
        `}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {isFocused || value ? null : (
                <div className='absolute w-full h-px bg-neutral-800 bottom-0 left-0'></div>
            )}
        </div>
    );
};

export default Input;
