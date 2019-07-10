import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';
import { register } from '../../services/auth';
import { toast } from 'react-toastify';


class Register extends Form {
    state = {
        data: {name: '', email: '', password: ''},
        errors: {}
    };
    schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    }
    goHome(msg, token) {
      localStorage['currentUser'] = token
      toast.success(msg || 'success')
      setTimeout(() => {
        this.props.history.push('/');
      }, 2000);
    }
     register = async () =>{
      try {
        const {headers} = await register(this.state.data)
        const authHeader = headers['x-auth-token'];
        console.log(authHeader);
        this.goHome('register successful', authHeader)   
        // console.log(res.d);
      } catch (error) {
        if (error.status === 400) {
          const errors = {...this.state.errors};
          errors.email = error.message;
          console.log(errors);
          this.setState({errors})
        } else {
        toast.error(error.message);        
        }
        
      }
    }
    doSubmit = () => {
      //server call
      this.register();
      console.log('submitted');
    }
  
    render() {
      const { data } = this.state;
      return (
        <React.Fragment>
          <header><h2>Register</h2></header>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              {this.renderInput('name', null, null, data.name)}
              {this.renderInput('email', 'email', null, data.email)}
              {this.renderInput('password', 'password', null, data.password)}
            </div>
              {this.renderButton('Login')}
          </form>
        </React.Fragment>
      );
    }
}
 
export default Register;