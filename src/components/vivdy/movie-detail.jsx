import React, {Component} from 'react';

import { getMovie } from '../../services/fakeMovieService';
import Form from '../common/form';

class MovieDetail extends Form {
    state = {  }
  
    movie = getMovie(this.props.match.params.id);
    render() { 
            if(!this.movie) {
                this.props.history.replace('/not-found');
                return null; 
            }
        return ( <div>
            <h4>Title: {this.movie.title}</h4>
            <h4>Genre: {this.movie.genre.name}</h4>
            <h4>Stock: {this.movie.numberInStock}</h4>
            <h4>Rate: {this.movie.dailyRentalRate}</h4>
            <div>
                <button onClick={() => this.props.history.push('/movies')} className="btn btn-primary">Go Back</button>
                <button onClick={() => this.props.history.push(`/movies/new?id=${this.movie._id}`)} className="btn btn-info ml-2">Edit</button>
            </div>
    
    
    
        </div> );
      
    }
}
 
export default MovieDetail;
