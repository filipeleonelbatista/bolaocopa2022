import "../styles/Input.css";

function Input({
  id,
  label,
  disabled,
  required,
  placeholder,
  helpText,
  ...rest
}) {
  return (
    <div className="Input">
      {label && (
        <label htmlFor={id}>
          {label}
          {required && "*"}
        </label>
      )}
      <input
        id={id}
        placeholder={`${placeholder && required ? placeholder + "*" : ""}`}
        disabled={disabled}
        required={required}
        {...rest}
      />
      {
        helpText && (
          <span>
            {helpText}
          </span>
        )
      }
    </div>
  );
}

export default Input;
