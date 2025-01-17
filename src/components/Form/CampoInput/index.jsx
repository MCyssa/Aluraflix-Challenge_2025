import React from 'react';

function CampoInput(props) {
  return (
    <div className={props.className}>
      <label className={props.error ? props.labelErrorClass : ''}>{props.label}</label>
      {props.isTextArea ? (
        <textarea
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          rows={props.rows || 4} 
          cols={props.cols || 50} 
          className={`campo ${props.error ? props.inputErrorClass : ''}`}
        />
      ) : (
        <input
          type="text" 
          placeholder={props.placeholder}
          className={`campo ${props.error ? props.inputErrorClass : ''}`}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
        />
      )}
      {props.error && <span className={props.errorMessageClass}>{props.error}</span>}
    </div>
  );
}

export default CampoInput;
