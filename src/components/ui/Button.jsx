
import "./Button.css";

export default function Button({ children, onClick, type = "button", variant = "primary", ...rest }) {
  return (
    <button onClick={onClick} type={type} className={`btn ${variant}`} {...rest}>
      {children}
    </button>
  );
}
