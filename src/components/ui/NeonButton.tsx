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
  const baseStyles = "relative inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";

  const variants = {
    primary: "bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 border border-cyan-500/30",
    secondary: "bg-slate-800 text-white hover:bg-slate-700 border border-cyan-500/20 hover:border-cyan-400",
    outline: "bg-transparent text-cyan-400 border border-cyan-500 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]",
    ghost: "bg-transparent text-gray-300 hover:text-cyan-400 hover:bg-white/5",
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

      {/* Decorative corner accents */}
      {variant === "primary" && (
        <>
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-purple-400 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-purple-400 rounded-br-lg" />
        </>
      )}
    </button>
  );
}
