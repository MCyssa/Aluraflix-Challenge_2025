function Categoria({ label, itens, value, onChange, name, className, error, labelErrorClass, inputErrorClass, errorMessageClass }) {
  return (
    <div className={className}>
      <label className={error ? labelErrorClass : ''}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`campo ${error ? inputErrorClass : ''}`}
      >
        <option disabled value="">Selecione uma categoria</option>
        {itens.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {error && <span className={errorMessageClass}>{error}</span>}
    </div>
  );
}

export default Categoria;
