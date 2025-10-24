import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConnection";

export function Header() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <header className="w-full max-w-2xl mt-8 px-1">
      <nav className="w-full bg-amber-100 h-12 flex items-center justify-between rounded-md px-3">
        <div className="flex gap-4 font-bold">
          <Link to={"/"}>Home</Link>
          <Link to={"/admin"}>Links</Link>
          <Link to={"/admin/social"}>Social media</Link>
        </div>
        <button onClick={handleLogout} className="cursor-pointer">
          <BiLogOut size={28} color="ret" />
        </button>
      </nav>
    </header>
  );
}
