import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Ferramentas from "../../components/Ferramentas/Ferramentas";
import "./EPIs.css";

export default function EPIs() {
  const botoes = [
    { label: "Adicionar", acao: () => alert("Adicionar clicado!") },
    { label: "Editar", acao: () => alert("Editar clicado!") },
    { label: "Excluir", acao: () => alert("Excluir clicado!") },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="containerEPIs">
          <Ferramentas botoes={botoes} />
        </section>
      </main>
      <Footer />
    </>
  );
}
