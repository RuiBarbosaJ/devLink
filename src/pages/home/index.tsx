import { HiArrowTurnRightDown } from "react-icons/hi2";
import { Social } from "../../components/social/index";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinkProps {
  facebook: string;
  youtube: string;
  instagram: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinkProps>({
    facebook: "",
    youtube: "",
    instagram: "",
  });

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        const lista = [] as LinkProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });
        setLinks(lista);
      });
    }
    loadLinks();
  }, []);

  useEffect(() => {
    async function loadSocialLinks() {
      try {
        const docRef = doc(db, "social", "link");
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook || "",
            instagram: snapshot.data()?.instagram || "",
            youtube: snapshot.data()?.youtube || "",
          });
        }
      } catch (error) {
        console.error("Erro ao carregar links sociais:", error);
      }
    }

    loadSocialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 justify-center items-center">
      <h1 className="font-bold text-white mt-20 md:text-4xl text-3xl">
        Rui Barbos Dev
      </h1>

      <span className="justify-center items-center w-full flex flex-col mb-5 mt-1 text-white md:text">
        Veja meus Links <HiArrowTurnRightDown />
      </span>

      <main className="flex flex-col w-12/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            style={{ backgroundColor: link.bg }}
            key={link.id}
            className="bg-amber-50 mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105"
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <p className="text-base md:text-lg" style={{ color: link.color }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {(socialLinks.facebook ||
          socialLinks.instagram ||
          socialLinks.youtube) && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks.facebook}>
              <FaLinkedin size={30} color="white" />
            </Social>
            <Social url={socialLinks.instagram}>
              <FaInstagram size={30} color="white" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
