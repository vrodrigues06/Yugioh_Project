import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import supabase from "../api/supabase";

type AuthStatus = "unauthenticated" | "visitor" | "admin";

interface AuthContextType {
  status: AuthStatus;
  user: User | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null }>;
  signOut: () => void;
  signInAsVisitor: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>("unauthenticated");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        setUser(data.session.user);
        setStatus("admin");
      } else {
        setUser(null);
        setStatus("unauthenticated");
      }
      setLoading(false); // 🚩 Carregamento da sessão concluído
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          setStatus("admin");
        } else {
          setUser(null);
          setStatus("unauthenticated");
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setUser(data.session.user);
      setStatus("admin");
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setStatus("unauthenticated");
  };

  const signInAsVisitor = () => {
    setUser(null);
    setStatus("visitor");
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        loading,
        signIn,
        signOut,
        signInAsVisitor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
