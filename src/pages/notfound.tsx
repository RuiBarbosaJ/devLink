import { Link } from "react-router-dom";
import { Button } from "../components/button";

export function NotDefound() {
  return (
    <>
      <div className="flex items-center w-full justify-center h-screen text-white">
        Pagina não encontrada!
        <Link to={"/"} className="px-3">
          <Button className="">Volte</Button>
        </Link>
      </div>
    </>
  );
}
