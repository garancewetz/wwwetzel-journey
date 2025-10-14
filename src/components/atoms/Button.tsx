interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="px-3 py-1 text-white border border-gray-600 rounded hover:bg-gray-700 transition-colors"
        >
            {children}
        </button>
    );
}

