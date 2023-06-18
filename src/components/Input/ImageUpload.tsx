import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
    onChange: (base64: string | null) => void;
    label: string;
    value?: string | File | null | undefined;
    disabled?: boolean;
    variants?: string;
}

interface SubClasses {
    [key: string]: string;
}

const variants: SubClasses = {
    profile: 'rounded-full w-[100px] h-[100px]',
    banner: 'rounded-md w-full p h-20',
};

const ImageUpload: React.FC<DropzoneProps> = ({
    onChange,
    label,
    value,
    disabled,
    variants: variantName = 'banner',
}) => {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback(
        (base64: string) => {
            onChange(base64);
        },
        [onChange]
    );

    const handleDrop = useCallback(
        (files: File[]) => {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                setBase64(base64String);
                handleChange(base64String);
            };
            reader.readAsDataURL(file);
        },
        [handleChange]
    );

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
    });

    const variantClass = variants[variantName] || '';

    return (
        <div
            {...getRootProps({
                className: `text-white text-center border-2 border-dotted border-neutral-700 ${variantClass}`,
            })}
        >
            <input {...getInputProps()} />
            {base64 ? (
                <div
                    className='
                flex
                items-center
                justify-center
                h-inherit w-inherit
                '
                >
                    <Image
                        src={typeof base64 === 'string' ? base64 : ''}
                        height='100'
                        width='100'
                        alt='Uploaded image'
                        className={`
                        object-cover
                        ${variantClass}
                        `}
                    />
                </div>
            ) : (
                <p className='text-white'>{label}</p>
            )}
        </div>
    );
};

export default ImageUpload;
