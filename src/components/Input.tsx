import { motion } from "framer-motion";
import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  register: UseFormRegister<FieldValues>;
  id: string;
  errors: FieldErrors<FieldValues>;
  errorMessage?: string;
}

const Input = ({
  label,
  register,
  id,
  errors,
  errorMessage,
  ...rest
}: InputProps) => {
  return (
    <div className="h-10 sm:h-16">
      <div className="flex gap-2 items-center">
        <label
          className="font-semibold text-sky-300 text-sm xs:text-md "
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className="bg-azul-800 p-1 outline outline-sky-800 text-sky-300 rounded-md text-xs xs:text-md max-w-xs"
          type="text"
          {...rest}
          {...register(id, { required: errorMessage })}
        />
      </div>
      {errors[id] && (
        <motion.span
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-red-500 mt-2 block text-xs xs:text-sm"
        >
          {errorMessage}
        </motion.span>
      )}
    </div>
  );
};

export default Input;
