import React, { Component } from 'react';
import Joi from 'joi-browser';
import InputField from './input';
import SelectField from './select';

class Form extends Component {
    validate = () => {
      const result = Joi.validate(this.state.data, this.schema, {abortEarly: false})
      if(!result.error) return null;
      const errors = {};
      for (const item of result.error.details) {
          errors[item.path[0]] = item.message;
      }
      return errors
    }
    validateProperty = ({name, value}) => {
      const obj = { [name]: value};
      const schema = { [name]: this.schema[name]};
      const {error} = Joi.validate(obj, schema);
      return error ?  error.details[0].message : null;
    }
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
    
        const data = { ...this.state.data };
        data[input.name] = input.value;
    
        this.setState({ data, errors });
      };
    handleSubmit = e => {
        e.preventDefault();
          const errors = this.validate();

          this.setState({errors : errors ||  {}});
          if(errors) return null;
    
          this.doSubmit();
      }
      renderInput = (name, type = 'text', label, value) => {
        const { errors } = this.state;
        return (
            <InputField onChangeField={this.handleChange} error={errors[name]} 
            meta={{name: [name], label: [label || name], value, type: [type]}} />
        );
      }
      renderSelect = (name,  label, options, value) => {
        const { errors } = this.state;
        return (
            <SelectField onChangeField={this.handleChange} error={errors[name]} 
            meta={{name: [name], label: [label || name], value,  options: options}} />
        );
      }
      renderButton = (label) => {
        return (
            <button type="submit" className="btn btn-primary">
            {label}
          </button>
        )
      }
}
 
export default Form;