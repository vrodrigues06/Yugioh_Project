import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

const Login = () => {
  const { signIn, signInAsVisitor, status } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await signIn(email, password);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Login realizado com sucesso!");
      navigate("/");
    }
  };

  const handleVisitor = () => {
    signInAsVisitor();
    toast.success("Entrando como visitante");
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>Yugioh | Login</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-azul-900 relative overflow-hidden">
        <img
          src="/Bg.jpg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 -z-10"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-azul-950 border border-sky-900 rounded-xl shadow-xl px-8 py-10 max-w-sm w-full"
        >
          <h1 className="text-2xl font-bold text-white mb-2 text-center">
            Antes de Começar
          </h1>
          <p className="text-slate-400 text-sm mb-6 text-center">
            Faça login como admin ou entre como visitante
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-400 mb-1 text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="w-full px-4 py-2 rounded bg-azul-900 border border-sky-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 text-sm">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite admin"
                className="w-full px-4 py-2 rounded bg-azul-900 border border-sky-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-b from-orange-500 to-orange-400 text-black font-bold py-2 rounded hover:brightness-110 transition"
            >
              Entrar como Admin
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={handleVisitor}
              className="w-full border border-sky-800 text-slate-300 hover:border-orange-500 hover:text-orange-400 py-2 rounded transition"
            >
              Entrar como Visitante
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
