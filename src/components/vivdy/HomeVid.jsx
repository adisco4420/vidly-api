import React, { Component } from 'react';
import { getMovies , deleteMovie } from '../../services/fakeMovieService';

class HomeVid extends Component {
    state = {
        allMovies: getMovies()
    }
    handleDelete = (id) => {
        deleteMovie(id);
        this.setState({allMovies: getMovies()})
        }
    render() {
        return (
            <div className="container p-2">
                <p>Showing {this.state.allMovies.length} movies in the database</p>
                <DisplayMovies allMovies={this.state.allMovies} handleDelete={this.handleDelete}/>
            </div>
        );
    }
}
const DisplayMovies = ({ allMovies , handleDelete}) => {
    return (<React.Fragment>
        {
            !allMovies.length ?
                <div className="text-center p-4">
             <i className="fas fa-film fa-5x"></i>
                    <h6>No Movies</h6>
                </div> :
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allMovies.map(movie => (
                                <tr key={movie._id}>
                                        <td>{movie.title}</td>
                                        <td>{movie.genre.name}</td>
                                        <td>{movie.numberInStock}</td>
                                        <td>{movie.dailyRentalRate}</td>
                                        <td><button onClick={() => handleDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button></td>
                                    </tr>
                            ))
                        }
                    </tbody>
                </table>
        }
    </React.Fragment>
    );
}


export default HomeVid;