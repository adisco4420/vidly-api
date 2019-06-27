import React, { Component } from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';
import { getGenres } from '../../services/fakeGenreService';
import { saveMovie } from '../../services/fakeMovieService';

class NewMovie extends Form {
    state = {
        data: {title: '', genre: '', number_in_stock: '', rate: ''},
        errors: {}
    };
    schema = {
        title: Joi.string().required(),
        genre: Joi.string().required(),
        number_in_stock: Joi.number().required().integer().min(1).max(100).label('number in stock'),
        rate: Joi.number().required().integer().min(1).max(10),
    }

    genreOption = () => {
        const datas = getGenres();
        let data = [];
        datas.map(item => data.push({value: item._id, name: item.name}))
        return data;
    }
    doSubmit = () => {
      //server call
      const data = this.state.data;
      const body = {title:  data.title, genreId: data.genre, numberInStock: data.number_in_stock, dailyRentalRate: data.rate}
      console.log(body, 'submitted');
      saveMovie(body);
      this.props.history.push('/movies');
    }
  
    render() {
      return (
        <React.Fragment>
          <header><h2>New Movie</h2></header>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              {this.renderInput('title')}
              {this.renderSelect('genre', 'Genre', this.genreOption())}
              {this.renderInput('number_in_stock', 'number', 'Number in Stock')}
              {this.renderInput('rate', 'number')}
            </div>
              {this.renderButton('Save')}
          </form>
        </React.Fragment>
      );
    }
}
 
export default NewMovie;