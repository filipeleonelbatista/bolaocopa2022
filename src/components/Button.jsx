import "../styles/Button.css";

export default function Button({
  id,
  children,
  variant = "Primary",
  disabled = false,
  onClick,
  type,
  ...rest
}) {
  return (
    <button
      className={`Button ${variant}`}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}


