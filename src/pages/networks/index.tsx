import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FaLink } from "react-icons/fa";

import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
        }
      });
    }

    loadLinks();
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (!facebook.trim() || !instagram.trim() || !youtube.trim()) {
      alert("preencha todos os campos!");
      return;
    }

    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
      create: new Date(),
    })
      .then(() => {
        setFacebook("");
        setInstagram("");
        setYoutube("");
        console.log("CADASTRADO COM SUCESSO");
      })
      .catch((error) => {
        console.log("Erro ao salvar: " + error);
      });
  }

  return (
    <div className="flex items-center flex-col min-h-screen px-2 pb-7 max-w-2xl mx-auto">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas Redes Sociais
      </h1>

      <form className="text-white w-full max-w-md" onSubmit={handleRegister}>
        <label>Link do facebook</label>
        <Input
          type="url"
          placeholder="Digite a url do facebook..."
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          className="w-full"
        />

        <label>Link do instagram</label>
        <Input
          type="url"
          placeholder="Digite a url do instagram..."
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full"
        />

        <label>Link do youtube</label>
        <Input
          type="url"
          placeholder="Digite a url do youtube..."
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          className="w-full"
        />

        <button
          type="submit"
          className="text-white bg-amber-600 h-9 rounded-md px-2 flex items-center mb-7 justify-center w-full cursor-pointer font-medium mt-2.5"
        >
          Salvar Links <FaLink className="ml-1" />
        </button>
      </form>
    </div>
  );
}
