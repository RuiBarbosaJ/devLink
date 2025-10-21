import { HiArrowTurnRightDown } from "react-icons/hi2";
import { Social } from "../../components/social/index";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export function Home() {
  return (
    <div className="flex flex-col w-full py-4 justify-center items-center">
      <h1 className="font-bold text-white mt-20 md:text-4xl text-3xl">
        Rui Barbos Dev
      </h1>
      <span className="justify-center items-center w-full flex flex-col mb-5 mt-1 text-white md:text">
        Veja meus Links <HiArrowTurnRightDown />
      </span>

      <main className="flex flex-col w-12/12 max-w-xl text-center">
        <section className="bg-amber-50 mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 ">
          <a href="">
            <p className="text-base md:text-lg">Instagram</p>
          </a>
        </section>
        <section className="bg-amber-50 mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 ">
          <a href="">
            <p className="text-base md:text-lg">Linkedin</p>
          </a>
        </section>
        <section className="bg-amber-50 mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 ">
          <a href="">
            <p className="text-base md:text-lg">GitHub</p>
          </a>
        </section>

        <footer className="flex justify-center gap-3 my-4">
          <Social url="https://www.linkedin.com/in/rui-barbosa-295abb290/">
            <FaLinkedin size={30} color="white" />
          </Social>
          <Social url="https://www.instagram.com/rrui.barbosa/">
            <FaInstagram size={30} color="white" />
          </Social>
        </footer>
      </main>
    </div>
  );
}
