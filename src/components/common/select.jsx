import React from 'react';

const SelectField = ({meta, onChangeField, error}) => {  
    return (   <div className="form-group">
    <label htmlFor={meta.name}>{meta.label}</label>
  {meta.options &&  <select value={meta.value || ''} name={meta.name} onChange={onChangeField} className="form-control" id={meta.name}>
        {meta.options.map((option, index) =>  <option value={option.value} key={index}>{option.name}</option>)}
    </select>}
    {error && <div className="alert alert-danger">{error}</div>}
  </div> );
}
 
export default SelectField;