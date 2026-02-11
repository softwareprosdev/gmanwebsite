"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function NeonButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-bold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-[#1e3a5f] text-white hover:bg-[#2a5080] hover:shadow-lg hover:shadow-blue-900/20 hover:scale-105",
    secondary: "bg-[#d4a017] text-white hover:bg-[#b8860b] hover:shadow-lg hover:shadow-amber-500/20",
    outline: "bg-transparent text-[#1e3a5f] border-2 border-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white",
    ghost: "bg-transparent text-gray-600 hover:text-[#1e3a5f] hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
