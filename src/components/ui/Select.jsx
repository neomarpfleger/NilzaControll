import React from "react";
import "./Select.css";

export default function SelectPadrao({ label, options, name, value, onChange }) {
  return (
    <div className="select-container">
      {label && <label className="select-label">{label}</label>}
      <select className="select-element" name={name} value={value} onChange={onChange}>
        <option value="">Selecione</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
