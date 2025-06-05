import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

const Button = ({
  children,
  disabled = false,
  className = "",
  type = "submit",
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bg-azul-800 text-sky-600 rounded-sm py-1.5 px-2 sm:py-2 sm:px-3 
      uppercase text-sm font-semibold transition-colors flex items-center gap-2
      ${
        disabled
          ? "cursor-not-allowed bg-opacity-50 bg-azul-800"
          : "cursor-pointer hover:bg-blue-950"
      }
      ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
