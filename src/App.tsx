import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Mundial from "./pages/Mundial";
import Personagens from "./pages/Personagens";
import PersonagensGeracao from "./pages/PersonagensGeracao";
import Regras from "./pages/Regras";
import TorneioGeracao from "./pages/TorneioGeracao";
import Torneios from "./pages/Torneios";
import PersonagemDetalhe from "./pages/PersonagemDetalhe";
import GerenciadorTorneio from "./pages/PainelTorneio";
import GerenciadorMundial from "./pages/PainelMundial";
import PainelTorneio from "./pages/PainelTorneio";
import PainelMundial from "./pages/PainelMundial";
import Torneio from "./features/torneios-chaves/Torneio";
import MundialChavesPage from "./features/mundial-chaves/MundialChavesPage";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <Header />
        <HelmetProvider>
          <div className="bg-azul-900 relative backdrop-blur-3xl min-h-screen overflow-hidden">
            <img
              src="/Bg.jpg"
              alt=""
              className="absolute inset-0 -z-10 opacity-10 w-full h-full object-cover mix-blend-multiply select-none"
            />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/torneios" element={<Torneios />} />
                <Route path="/torneios/:geracao" element={<TorneioGeracao />} />
                <Route
                  path="/torneios/:geracao/:ano"
                  element={<TorneioGeracao />}
                />
                <Route
                  path="/torneios/painel-torneio"
                  element={<PainelTorneio />}
                />
                <Route
                  path="/torneios/painel-torneio/:torneio"
                  element={<Torneio />}
                />

                <Route path="/personagens" element={<Personagens />} />
                <Route
                  path="/personagens/:geracao"
                  element={<PersonagensGeracao />}
                />
                <Route
                  path="/personagens/:geracao/:id"
                  element={<PersonagensGeracao />}
                />

                <Route path="/mundial/" element={<Mundial />} />
                <Route
                  path="/mundial/painel-mundial/"
                  element={<PainelMundial />}
                />
                <Route
                  path="/mundial/painel-mundial/:ano"
                  element={<MundialChavesPage />}
                />
                <Route path="/mundial/:ano" element={<Mundial />} />
                <Route path="/regras/*" element={<Regras />} />
              </Route>
            </Routes>
          </div>
        </HelmetProvider>

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            success: {
              duration: 3000,
              iconTheme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
