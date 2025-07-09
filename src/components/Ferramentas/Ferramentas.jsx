import { useState } from "react";
import "./Ferramentas.css";

export default function Ferramentas({ botoes = [] }) {
  const [botaoAtivo, setBotaoAtivo] = useState(null);

  const handleClick = (index, acao) => {
    setBotaoAtivo(index);
    acao(); // Executa a ação original do botão
  };

  return (
    <div className="containerFerramentas">
      {botoes.map((botao, index) => (
        <button
          key={index}
          className={botaoAtivo === index ? "botao ativo" : "botao"}
          onClick={() => handleClick(index, botao.acao)}
        >
          {botao.label}
        </button>
      ))}
    </div>
  );
}
