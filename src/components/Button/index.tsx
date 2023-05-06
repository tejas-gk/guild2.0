interface ButtonProps {
    title: string;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: string;
    sizing?: 'sm' | 'md' | 'lg';
    colors?:
        | 'primary'
        | 'secondary'
        | 'danger'
        | 'warning'
        | 'success'
        | 'info'
        | 'borderOnly'
        | 'none';
}
interface SubClasses {
    [key: string]: string;
}
const sizingClasses: SubClasses = {
    lg: 'w-full text-lg px-5 py-3',
    md: 'w-full text-base px-4 py-2',
    sm: 'w-fit text-sm px-3 py-1',
};

const colorsClasses: SubClasses = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800',
    secondary: 'bg-blue-500 text-white hover:bg-blue-800',
    borderOnly: 'border border-black text-black hover:bg-gray-200',
    danger: 'bg-red-500 text-white hover:bg-red-800',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-800',
    success: 'bg-green-500 text-white hover:bg-green-800',
    info: 'bg-blue-500 text-white hover:bg-blue-800',
    none: 'bg-transparent text-black hover:bg-gray-200',
};

export default function Index({
    title,
    type = 'button',
    className = '',
    onClick,
    disabled = false,
    sizing,
    colors,
    icon,
}: ButtonProps) {
    return (
        <button
            title={title}
            type={type}
            className={`
                  disabled:opacity-70 disabled:cursor-not-allowed
                  transition duration-200 ease-in-out
                flex-1
                font-bold
                rounded-md
                ${sizing ? sizingClasses[sizing] : sizingClasses['md']}
                ${colors ? colorsClasses[colors] : colorsClasses['primary']}
                ${className}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
            {title}
        </button>
    );
}
