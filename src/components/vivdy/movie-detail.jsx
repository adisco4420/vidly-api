import React, {Component} from 'react';

// import { getMovie } from '../../services/fakeMovieService';
import { getMovie } from '../../services/vivdly-backend'
import Form from '../common/form';

class MovieDetail extends Form {
    state = { 
        movie: null
     }
    async componentDidMount() {
      try {
        const { data: movie} = await getMovie(this.props.match.params.id);
        console.log(movie);
        this.setState({movie});
      } catch (error) {
        this.props.history.replace('/not-found');          
      }
     }
    render() { 
        const { movie } = this.state;
        if(!movie) return <h6>Loading...</h6>
        return ( <div>
            <h4>Title: {movie.title}</h4>
            <h4>Genre: {movie.genre.name}</h4>
            <h4>Stock: {movie.numberInStock}</h4>
            <h4>Rate: {movie.dailyRentalRate}</h4>
            <div>
                <button onClick={() => this.props.history.push('/movies')} className="btn btn-primary">Go Back</button>
                <button onClick={() => this.props.history.push(`/movies/new?id=${movie._id}`)} className="btn btn-info ml-2">Edit</button>
            </div>
    
    
    
        </div> );
      
    }
}
 
export default MovieDetail;
