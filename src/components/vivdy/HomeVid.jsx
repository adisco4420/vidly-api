import React, { Component } from "react";
import { getMovies, deleteMovie } from "../../services/fakeMovieService";
import LikeCount from "../common/Likes";
import SortTable from "../common/sortTable";
import Pagination from "../common/pagination";

class HomeVid extends Component {
  state = {
    allMovies: getMovies(),
    filteredMovie: getMovies(),
    pageSize: 4,
    filterBy: null,
    sortBy: false,
    sortValue: null
  };
  handleDelete = id => {
    deleteMovie(id);
    this.setState({ allMovies: getMovies() });
  };
  handelPageChange =(page) => {
      console.log('page change', page);
      
  }
  handleSort = genre => {
    let movies;
    if (genre === "allgenre") {
      movies = this.state.allMovies
    } else {
      movies = this.state.allMovies.filter(movie => movie.genre.name === genre);
    }
    this.setState({ filteredMovie: movies , filterBy: genre});
  };
  handleFilter = (value) => {
      const movies = this.state.filteredMovie;
    movies.sort(function (a, b) {
        let ax = a[value];
        let bx = b[value]
        if (value === 'genre') {
            ax  = a[value]['name'];
             bx = b[value]['name']
        }
        if (ax > bx) {
            return -1;
          } if (ax < bx) {
            return 1;
          }
          return 0;
    })
    this.setState({filteredMovie: movies, sortBy: true, sortValue: value})


  }
  handleDecSort = (value) => {    
    const movies = this.state.filteredMovie;
  movies.sort(function (a, b) {
      let ax = a[value];
      let bx = b[value]
      if (value === 'genre') {
          ax  = a[value]['name'];
           bx = b[value]['name']
      }
      if (ax > bx) {
          return 1;
        } if (ax < bx) {
          return -1;
        }
        return 0;
  })
  this.setState({filteredMovie: movies, sortBy: false, sortValue: value})
}
  render() {
      const count = this.state.filteredMovie.length;
    return (
      <div className="container p-2">
        <div className="row">
          <div className="col-md-4">
            <SortTable filterBy={this.state.filterBy} onSort={this.handleSort} />
          </div>
          <div className="col-md-8">
            <p>Showing {count} movies in the database</p>
            <DisplayMovies
              onFilter={this.handleFilter}
              onDecSort={this.handleDecSort}
              sortValue={this.state.sortValue}
              onLike={this.handeleLike}
              sortBy={this.state.sortBy}
              allMovies={this.state.filteredMovie}
              handleDelete={this.handleDelete}
            />         <Pagination itemCount={count} pageSize={this.state.pageSize} onPageChange={this.handelPageChange}  />
          </div>
 
        </div>
      </div>
    );
  }
  handeleLike = movie => {
    let index = this.state.allMovies.findIndex(val => val._id === movie._id);
    const updatedMovie = { ...movie, liked: !movie.liked };
    const movies = this.state.allMovies;
    movies[index] = updatedMovie;
    this.setState({ filteredMovie: movies });
  };
}
const DisplayMovies = ({ allMovies, handleDelete, onLike, onFilter , sortBy, onDecSort, sortValue}) => {
  console.log(sortValue);
  
  const Headers = [{title: "Title", value: 'title'}, {title: 'Genre', value: 'genre'},
                    {title: "Stock", value: 'numberInStock'},{title: "Rate", value: 'dailyRentalRate'}];
  return (
    <React.Fragment>
      {!allMovies.length ? (
        <div className="text-center p-4">
          <i className="fas fa-film fa-5x" />
          <h6>No Movies</h6>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              {Headers.map((header, index) => (
                <th  key={index} onClick={() => {!sortBy ? onFilter(header.value) : onDecSort(header.value) } } scope="col">
                  {header.title} <span className={!sortBy && header.value === sortValue ? 'fas fa-arrow-up': 'fas fa-arrow-down'}></span>
                </th>
              ))}

              <th />
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allMovies.slice(3, allMovies.length).map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <LikeCount
                    movie={movie}
                    liked={movie.liked}
                    onLike={onLike}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};

export default HomeVid;
