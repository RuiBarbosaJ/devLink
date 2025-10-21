import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input/index";
import { Button } from "../../components/button";
import { useState, type FormEvent } from "react";
import { CgEye, CgEyeAlt } from "react-icons/cg";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleEyePassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (eye === true) return setEye(false);
    return setEye(true);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("preencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Logado com sucesso!");
        navigate("/admin", { replace: true });
      })
      .catch((error: unknown) => {
        alert(`Erro ao fazer o login!`);
        console.log(`Erro ao tentar login ${error}`);
      });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl ">
          Dev<span className="bg-gradient-to-r from-yellow-600">Link</span>
        </h1>
      </Link>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          children={undefined}
        />
        <Input
          placeholder="Digite sua senha..."
          type={eye ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleEyePassword(e);
            }}
          >
            {eye ? <CgEye /> : <CgEyeAlt />}
          </button>
        </Input>

        <Button type="submit">Acessar</Button>
      </form>
    </div>
  );
}
