import React from 'react';

import { getMovie } from '../../services/fakeMovieService';

const MovieDetail = ({match, history}) => {
    const movie = getMovie(match.params.id);
    if(!movie) {
        history.push('/not-found');
        return null; 
    }
    return ( <div>
        <h4>Title: {movie.title}</h4>
        <h4>Genre: {movie.genre.name}</h4>
        <h4>Stock: {movie.numberInStock}</h4>
        <h4>Rate: {movie.dailyRentalRate}</h4>
        <div>
            <button onClick={() => history.push('/movies')} className="btn btn-primary">Save</button>
        </div>



    </div> );
}
 
export default MovieDetail;