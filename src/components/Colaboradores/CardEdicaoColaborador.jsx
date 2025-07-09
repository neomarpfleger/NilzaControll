import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { Pencil } from "lucide-react";
import "./CardEdicaoColaborador.css";

export default function CardEdicaoColaborador({ colaborador, onChange, onSalvar, onCancelar, carregando }) {
  if (!colaborador) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h3>Editar Colaborador</h3>

        <Input
          label="Nome"
          value={colaborador.nome || ""}
          name="nome"
          onChange={onChange}
        />
        <Select
          label="Cargo"
          name="cargo"
          value={colaborador.cargo || ""}
          options={[
            "Almoxarife",
            "Mestre de obra",
            "Servente",
            "Pedreiro",
            "Carpinteiro",
            "Engenheiro",
          ]}
          onChange={onChange}
        />
        <Select
          label="Tamanho Camiseta"
          name="tamanhoCamiseta"
          value={colaborador.tamanhoCamiseta || ""}
          options={["P", "M", "G", "GG", "EGG"]}
          onChange={onChange}
        />
        <Select
          label="Tamanho Calça"
          name="tamanhoCalca"
          value={colaborador.tamanhoCalca || ""}
          options={["P", "M", "G", "GG", "EGG"]}
          onChange={onChange}
        />
        <Select
          label="Tamanho Botina"
          name="tamanhoBotina"
          value={colaborador.tamanhoBotina || ""}
          options={["38", "39", "40", "41", "42", "43", "44"]}
          onChange={onChange}
        />

        <div className="modalButtons">
          <Button onClick={onSalvar} disabled={carregando}>
            {carregando ? "Salvando..." : "Confirmar Edição"}
          </Button>
          <Button onClick={onCancelar} variant="secondary">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

