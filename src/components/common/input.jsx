import React from 'react';

const InputField = ({meta, onChangeField, error}) => {
    return (          
    <div className="form-group">
    <label className="text-capitalize" htmlFor={meta.name}>{meta.label}</label>
    <input
      type={meta.type}
      name={meta.name}
      onChange={onChangeField}
      className="form-control"
      id={meta.name}
      value={meta.value || ''}
      placeholder={`Enter ${meta.label}`}
    />
    {error && <div className="alert alert-danger">{error}</div>}
  </div> );
}
 
export default InputField;