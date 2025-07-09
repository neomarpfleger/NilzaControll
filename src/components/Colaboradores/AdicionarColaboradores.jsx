import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import "./AdicionarColaboradores.css";

export default function AdicionarColaboradores() {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [tamanhoCalca, setTamanhoCalca] = useState("");
  const [tamanhoCamiseta, setTamanhoCamiseta] = useState("");
  const [tamanhoBotina, setTamanhoBotina] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioAtual = auth.currentUser;

    if (!usuarioAtual) {
      alert("Usuário não autenticado!");
      return;
    }

    try {
      await addDoc(collection(db, "colaboradores"), {
        nome,
        cargo,
        tamanhoCalca,
        tamanhoCamiseta,
        tamanhoBotina,
        criadoPor: usuarioAtual.uid,
        dataCriacao: serverTimestamp(),
      });

      alert("Colaborador adicionado com sucesso!");
      setNome("");
      setCargo("");
      setTamanhoCalca("");
      setTamanhoCamiseta("");
      setTamanhoBotina("");
    } catch (error) {
      console.error("Erro ao adicionar colaborador:", error);
      alert("Erro ao salvar colaborador.");
    }
  };

  return (
    <div className="containerAdicionarColaboradores">
      <h2>Adicionar Colaboradores</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome:"
          placeholder="Digite o nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Select
          label="Cargo:"
          options={["Almoxarife", "Mestre de obra", "Servente", "Pedreiro", "Carpinteiro", "Engenheiro"]}
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        />
        <Select
          label="Tamanho Camiseta:"
          options={["P", "M", "G", "GG", "EGG"]}
          value={tamanhoCamiseta}
          onChange={(e) => setTamanhoCamiseta(e.target.value)}
        />
        <Select
          label="Tamanho calça:"
          options={["P", "M", "G", "GG", "EGG"]}
          value={tamanhoCalca}
          onChange={(e) => setTamanhoCalca(e.target.value)}
        />
        <Select
          label="Tamanho Botina:"
          options={["38", "39", "40", "41", "42", "43", "44"]}
          value={tamanhoBotina}
          onChange={(e) => setTamanhoBotina(e.target.value)}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
}
