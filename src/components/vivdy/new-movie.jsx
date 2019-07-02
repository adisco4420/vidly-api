import React, { Component } from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';
import queryString from 'query-string';
// import { getGenres } from '../../services/fakeGenreService';
// import { saveMovie, getMovie } from '../../services/fakeMovieService';
import { getMovie, allGenres, saveOrUpdateMovie } from '../../services/vivdly-backend'



class NewMovie extends Form {
    state = {
        data: {title: '', genre: '', number_in_stock: '', rate: ''},
        errors: {}, 
        genres: [{name: 'select genre', value: ''}]
    };
   async componentDidMount() {
      const data = {...this.state.data};
      const result = queryString.parse(this.props.location.search)
    if (result && result.id) {
      try {
        const {data:movieDetail} = await getMovie(result.id); 
        data.title = movieDetail.title; data.number_in_stock = movieDetail.numberInStock;
        data.rate = movieDetail.dailyRentalRate; data.genre = movieDetail.genre._id;
        data._id = movieDetail._id;
      this.setState({data})       
      } catch (error) {
        this.props.history.replace('/not-found')  
      }
    }
      this.genreOption();
    }
    schema = {
        title: Joi.string().required().min(5),
        genre: Joi.string().required(),
        number_in_stock: Joi.number().required().integer().min(1).max(100).label('number in stock'),
        rate: Joi.number().required().min(1).max(10),
        _id: Joi.string()
    }

    genreOption = async () => { 
     const allgenres = await allGenres();
     const genres = [...this.state.genres];
     allgenres.map(genre => genres.push({name: genre.name, value: genre._id}))
     this.setState({genres})
    }
    doSubmit = async () => {
      //server call
      const data = this.state.data;
      const body = {title:  data.title, genreId: data.genre, numberInStock: data.number_in_stock, dailyRentalRate: data.rate}
     if (data._id) {
      await saveOrUpdateMovie(body, data._id);
     } else {
      await saveOrUpdateMovie(body);
     }
      this.props.history.push('/movies');
    }
  
    render() {   
      const {data, genres} = this.state;
      return (
        <React.Fragment>
          <header><h2>New Movie</h2></header>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              {this.renderInput('title', null, null, data.title)}
              {this.renderSelect('genre', 'Genre', genres, data.genre)}
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