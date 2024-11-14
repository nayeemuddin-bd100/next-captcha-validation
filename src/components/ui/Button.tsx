"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    children: React.ReactNode;
}

export default function Button({
    variant = "primary",
    children,
    className = "",
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors";

    const variants = {
        primary:
            "border-transparent text-white bg-indigo-600 hover:bg-indigo-700",
        secondary:
            "border-transparent text-white bg-gray-600 hover:bg-gray-700",
        outline: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
