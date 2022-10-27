import "../styles/Select.css";

export default function Select({
  id,
  label,
  placeholder,
  options,
  required,
  helpText,
  ...rest
}) {
  return (
    <div className="Select">
      {label && (
        <label htmlFor={id}>
          {label}
          {required && "*"}
        </label>
      )}
      <select
        id={id}
        placeholder={placeholder}
        {...rest}
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.key} - {opt.value}
          </option>
        ))}
      </select>
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

