import "./Input.css";

export default function Input({ label, type = "text", name, value, onChange, placeholder, ...rest }) {
  return (
    <div className="inputGroup">
      {label && <label className="inputLabel">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="inputField"
        {...rest}
      />
    </div>
  );
}

