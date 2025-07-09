import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./ListaColaboradores.css";
import CardEdicaoColaborador from "./CardEdicaoColaborador";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";


export default function ListaColaboradores() {
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    buscarColaboradores();
  }, []);

  const buscarColaboradores = async () => {
    try {
      const q = query(
        collection(db, "colaboradores"),
        orderBy("dataCriacao", "desc")
      );
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setColaboradores(lista);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
    }
  };

  const handleAbrirCard = (colaborador) => {
    setColaboradorSelecionado(colaborador);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColaboradorSelecionado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmarEdicao = async () => {
    if (!colaboradorSelecionado) return;
    setCarregando(true);

    try {
      const ref = doc(db, "colaboradores", colaboradorSelecionado.id);
      const { id, ...resto } = colaboradorSelecionado;
      console.log("Colaborador selecionado bruto:", colaboradorSelecionado);

      // Filtra apenas os campos válidos
      const dadosParaSalvar = Object.entries(resto).reduce(
        (acc, [key, value]) => {
          if (key && value !== undefined) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      await updateDoc(ref, dadosParaSalvar);
      
      toast.success("Colaborador atualizado com sucesso!");
      setColaboradorSelecionado(null);
      buscarColaboradores();
    } catch (error) {
      console.error("Erro ao atualizar colaborador:", error);
      toast.error("Erro ao salvar edição.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="containerListaColaboradores">
      <h2>Colaboradores Cadastrados</h2>
      <p>Total: {colaboradores.length}</p>
      <ul className="lista">
        {colaboradores.map((colaborador) => (
          <li key={colaborador.id} className="colaboradorItem">
            <strong
              onClick={() => handleAbrirCard({ ...colaborador })}
              style={{ cursor: "pointer", color: "var(--verde)" }}
            >
              <Pencil size={16} style={{ marginRight: 4 }} />
              {colaborador.nome}
            </strong>
          </li>
        ))}
      </ul>

      {colaboradorSelecionado && (
        <CardEdicaoColaborador
          colaborador={colaboradorSelecionado}
          onChange={handleChange}
          onSalvar={handleConfirmarEdicao}
          onCancelar={() => setColaboradorSelecionado(null)}
          carregando={carregando}
        />
      )}
    </div>
  );
}
