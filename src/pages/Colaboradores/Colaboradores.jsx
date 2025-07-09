import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Ferramentas from "../../components/Ferramentas/Ferramentas";
import AdicionarColaboradores from "../../components/Colaboradores/AdicionarColaboradores";
import ListaColaboradores from "../../components/Colaboradores/ListaColaboradores";
import "./Colaboradores.css";

export default function Colaboradores() {
  const [acaoAtual, setAcaoAtual] = useState(null); // "adicionar", "colaboradores", "excluir"

  const botoes = [
    { label: "Adicionar", acao: () => setAcaoAtual("adicionar") },
    { label: "Colaboradores", acao: () => setAcaoAtual("colaboradores") },
    { label: "Excluir", acao: () => setAcaoAtual("excluir") },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="containerColaboradores">
          <Ferramentas botoes={botoes} />
        </section>

        <section className="areaTrabalhoColaboadores">
          {acaoAtual === "adicionar" && <AdicionarColaboradores />}
          {acaoAtual === "colaboradores" && <ListaColaboradores />}
          {acaoAtual === "excluir" && <p>Componente de excluir ainda não criado</p>}
        </section>
      </main>
      <Footer />
    </>
  );
}
