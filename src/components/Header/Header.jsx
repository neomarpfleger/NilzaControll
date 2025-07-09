import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRectangleList,
  faBook,
  faNotesMedical,
  faHelmetSafety,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { icon: faHouse, label: "Início", link: "/home" },
  { icon: faRectangleList, label: "EPIs", link: "/EPIs" },
  { icon: faBook, label: "Colaboradores", link: "/colaboradores" },
  { icon: faNotesMedical, label: "Atestados", link: "/atestados" },
  { icon: faHelmetSafety, label: "EPIs", link: "/epis" },
  { icon: faStopwatch, label: "Pontos", link: "/pontos" },
];

export default function Header() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const currentPath = location.pathname;
    const foundIndex = navItems.findIndex((item) => item.link === currentPath);
    if (foundIndex !== -1) setActiveIndex(foundIndex);
  }, [location.pathname]);

  return (
    <div className="navegacao">
      <ul>
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`item ${activeIndex === index ? "ative" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            <Link to={item.link}>
              <span className={index === 0 ? "iconeAjuste" : "icone"}>
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <span className="text">{item.label}</span>
            </Link>
          </li>
        ))}
        <div className="indicador" style={{ transform: `translateX(${70 * activeIndex}px)` }}></div>
      </ul>

      <div className="logoNilzaControll">
        <img className="imgLogo" src="/imagens/logoNilzaControll.png" alt="Logo" />
      </div>
      <div id="usuarioLogado">
        <h1 id="nomeUsuarioLogado">Usuário</h1>
      </div>
    </div>
  );
}