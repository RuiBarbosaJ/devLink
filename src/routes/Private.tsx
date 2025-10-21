import { type ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [signed, setSigned] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };

        localStorage.setItem("@reactlinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setSigned(false);
        setLoading(false);
      }
      setLoading(false);
    });
    // Função de limpeza: quando o componente for desmontado,
    // cancelamos a inscrição no observer
    return () => unsub();
  }, []); // Array vazio = executa apenas quando o componente monta

  if (loading) {
    return (
      <div>
        <h1 className="text-center">Carregando</h1>
      </div>
    );
  }

  if (!signed) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
