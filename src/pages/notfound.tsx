import { Link } from "react-router-dom";
import { Button } from "../components/button";

export function NotDefound() {
  return (
    <>
      <div className="flex items-center flex-col w-full justify-center h-screen text-white gap-2">
        <h1 className="font-extrabold text-7xl">404</h1>
        <h3 className="text-3xl">Pagina não encontrada!</h3>
        <nav>
          <Link to={"/"}>
            <Button className="px-10 h-7">Volte</Button>
          </Link>
        </nav>
      </div>
    </>
  );
}
