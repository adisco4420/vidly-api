import React, { Component } from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';
import queryString from 'query-string';
import { getGenres } from '../../services/fakeGenreService';
import { saveMovie, getMovie } from '../../services/fakeMovieService';


class NewMovie extends Form {
    state = {
        data: {title: '', genre: '', number_in_stock: '', rate: ''},
        errors: {}
    };
    componentDidMount() {
      const data = {...this.state.data};
      const result = queryString.parse(this.props.location.search)
      const movieDetail = getMovie(result.id);
      if (result && result.id && !movieDetail) {
        this.props.history.replace('/not-found')        
      }
      if(movieDetail) {
        data.title = movieDetail.title; data.number_in_stock = movieDetail.numberInStock;
        data.rate = movieDetail.dailyRentalRate; data.genre = movieDetail.genre._id;
        data._id = movieDetail._id;
        this.setState({data})
      } 
    }
    schema = {
        title: Joi.string().required(),
        genre: Joi.string().required(),
        number_in_stock: Joi.number().required().integer().min(1).max(100).label('number in stock'),
        rate: Joi.number().required().min(1).max(10),
        _id: Joi.string()
    }

    genreOption = () => { 
        const datas = getGenres();
        let data = [{name: 'select genre', value: ''}];
        datas.map(item => data.push({value: item._id, name: item.name}))
        return data;
    }
    doSubmit = () => {
      //server call
      const data = this.state.data;
      const body = {title:  data.title, genreId: data.genre, numberInStock: data.number_in_stock, dailyRentalRate: data.rate}
     if (data._id) body._id = data._id;
      saveMovie(body);
      this.props.history.push('/movies');
    }
  
    render() {   
      const data = this.state.data;
      return (
        <React.Fragment>
          <header><h2>New Movie</h2></header>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              {this.renderInput('title', null, null, data.title)}
              {this.renderSelect('genre', 'Genre', this.genreOption(), data.genre)}
              {this.renderInput('number_in_stock', 'number', 'Number in Stock', data.number_in_stock)}
              {this.renderInput('rate', 'number', null, data.rate)}
            </div>
              {this.renderButton('Save')}
          </form>
        </React.Fragment>
      );
    }
}
 
export default NewMovie;