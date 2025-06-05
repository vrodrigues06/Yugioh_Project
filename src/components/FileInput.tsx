import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetValue,
  PathValue,
} from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";

interface FileInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  clearErrors: UseFormClearErrors<T>;
  errorMessage?: string;
  setValue: UseFormSetValue<T>;
}

const FileInput = <T extends FieldValues>({
  register,
  name,
  errors,
  clearErrors,
  setValue,
  errorMessage = "Imagem obrigatória",
}: FileInputProps<T>) => {
  const [fileName, setFileName] = useState<string>(
    "Definir a imagem do Perfil",
  );

  return (
    <div className="flex flex-col gap-1 h-10 sm:h-16">
      {/* Label personalizado como botão */}
      <label
        htmlFor={name}
        className="flex items-center gap-1.5 font-semibold text-sky-300 text-sm xs:text-md cursor-pointer transition-all hover:underline hover:text-orange-500"
      >
        <MdAddPhotoAlternate className="text-xl" /> {fileName}
      </label>

      <input
        type="file"
        accept="image/*"
        id={name}
        className="text-slate-400 text-xs"
        {...register(name, { required: errorMessage })}
      />

      {/* Exibição do erro */}
      {errors[name] && (
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

export default FileInput;
