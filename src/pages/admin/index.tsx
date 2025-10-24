import { useState, type FormEvent, useEffect } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { FiTrash } from "react-icons/fi";

import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nomeInput, setNomeInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");

  // Pegamos os links do banco e agr add no useState para manipular:
  const [links, setLinks] = useState<LinkProps[]>([]);

  // Pegando links que estiverem no banco de dados!
  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista: LinkProps[] = [];

      snapshot.forEach((docItem) => {
        lista.push({
          id: docItem.id,
          name: docItem.data().name,
          url: docItem.data().url,
          bg: docItem.data().bg,
          color: docItem.data().color,
        });
      });

      setLinks(lista);
    });

    return () => {
      console.log("Removendo listener do Firestore...");
      unsub();
    };
  }, []);
  function handleCadastrarUrl(e: FormEvent) {
    e.preventDefault();

    if (nomeInput === "" || urlInput === "") {
      alert("preencha todos os campos!");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nomeInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNomeInput("");
        setUrlInput("");
        console.log("CADASTRADO COM SUCESSO");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco: " + error);
      });
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form className="mt-8 flex flex-col mb-3 w-full max-w-xl">
        <label className="text-white font-medium">Nome do Link</label>
        <Input
          className="mt-2 bg-amber-100 text-black w-400"
          placeholder="Digite o nome do link..."
          value={nomeInput}
          onChange={(e) => setNomeInput(e.target.value)}
        />
      </form>

      <form
        className="flex flex-col mb-3 w-full max-w-xl"
        onSubmit={handleCadastrarUrl}
      >
        <label className="text-white font-medium">URL do Link</label>
        <Input
          className="mt-2 bg-amber-100 text-black w-400"
          placeholder="Digite a Url..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          type="url"
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2 items-center">
            <label className="text-white font-medium mt-2 mb-2">
              Fundo do link:
            </label>

            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />

            <label className="text-white font-medium mt-2 mb-2 ">
              Cor do link:
            </label>

            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
        </section>

        {nomeInput !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-3 border-amber-100 border rounded-md">
            <label className="text-white font-mehandleCadastroLinkdium mt-2 mb-2 ">
              Veja como está ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between border rounded border-amber-100 px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nomeInput}
              </p>
            </article>
          </div>
        )}

        <Button type="submit" className="mb-7">
          Cadastrar
        </Button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>

      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p>{link.name}</p>

          <div>
            <button
              onClick={() => handleDeleteLink(link.id)}
              className="border border-dashed cursor-pointer bg-black"
            >
              <FiTrash size={18} color="white" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
