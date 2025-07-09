import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Ferramentas from "../../components/Ferramentas/Ferramentas"
import "./Home.css"

export default function Home() {
  const botoes = [
    { label: "teste01", acao: () => alert("teste01 clicado!") },
    { label: "teste02", acao: () => alert("teste02 clicado!") },
    { label: "teste03", acao: () => alert("teste03 clicado!") },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="containerHome">
          <Ferramentas botoes={botoes} />
        </section>
      </main>
      <Footer />
    </>
  );
}

