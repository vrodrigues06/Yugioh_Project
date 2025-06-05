import { motion } from "framer-motion";
import { MdError } from "react-icons/md";

interface IError {
  message: string;
}

const Error = ({ message }: IError) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-azul-950 p-4 text-white flex flex-col items-center rounded-md"
    >
      <div className="bg-azul-800 rounded-sm w-fit mx-auto mb-4 p-2">
        <MdError className="text-orange-500  text-4xl" />
      </div>
      <span className="text-slate-400">{message}</span>
    </motion.div>
  );
};

export default Error;
