import React, { Component } from "react";
import { getMovies, deleteMovie } from "../../services/fakeMovieService";
import FilterTable from "../common/filterTable";
import Pagination from "../common/pagination";
import Table from "../common/table";

class HomeVid extends Component {
  state = {
    allMovies: getMovies(),
    filteredMovie: getMovies(),
    pageSize: 4,
    filterBy: 'allgenre',
    isSorted: false,
    sortBy: null,
    currentPage:  1
  };
  handleDelete = id => {
    deleteMovie(id);
    this.setState({ filteredMovie: getMovies() });
  };
  handeleLike = movie => {
    let index = this.state.allMovies.findIndex(val => val._id === movie._id);
    const updatedMovie = { ...movie, liked: !movie.liked };
    const movies = this.state.allMovies;
    movies[index] = updatedMovie;
    this.setState({ filteredMovie: movies });
  };
  handelPageChange = (page) => {
    this.setState({currentPage: page})
  }
  handleFilter = genre => {
    let movies;
    if (genre === "allgenre") {
      movies = this.state.allMovies
    } else {
      movies = this.state.allMovies.filter(movie => movie.genre.name === genre);
    }
    this.setState({ filteredMovie: movies, filterBy: genre });
  };
  handleSearch = e => {
    let { value } = e.target;
    value = value.toLowerCase();
    const movies = this.state.allMovies.filter(val => val.title.toLowerCase().includes(value) || 
    val.genre.name.toLowerCase().includes(value) || val.dailyRentalRate.toString().toLowerCase().includes(value)
    || val.numberInStock.toString().toLowerCase().includes(value))
    this.setState({filteredMovie: movies})
  }
  handleSort = (value) => {
    const movies = this.state.filteredMovie;
    movies.sort(function (a, b) {
      let ax = a[value];
      let bx = b[value]
      if (value === 'genre') {
        ax = a[value]['name'];
        bx = b[value]['name']
      }
      if (ax > bx) {
        return -1;
      } if (ax < bx) {
        return 1;
      }
      return 0;
    })
    this.setState({ filteredMovie: movies, isSorted: true, sortBy: value })


  }
  handleDecSort = (value) => {
    const movies = this.state.filteredMovie;
    movies.sort(function (a, b) {
      let ax = a[value];
      let bx = b[value]
      if (value === 'genre') {
        ax = a[value]['name'];
        bx = b[value]['name']
      }
      if (ax > bx) {
        return 1;
      } if (ax < bx) {
        return -1;
      }
      return 0;
    })
    this.setState({ filteredMovie: movies, isSorted: false, sortBy: value })
  }
  render() {
    const count = this.state.filteredMovie.length;
    const {pageSize , currentPage} = this.state;
    return (
      <div className="container p-2">
        <div className="row">
          <div className="col-md-4">
            <FilterTable filterBy={this.state.filterBy} onFilter={this.handleFilter} />
          </div>
          <div className="col-md-8">
            <div className="row m-3">
              <div className="col-md-6"> <p>Showing {count} movies in the database</p></div>
              <div className="col-md-6 float-right">
                <input type="search" onChange={this.handleSearch} className="form-control" placeholder="search"/>
              </div>
            </div>
            <Table
              onSort={this.handleSort}
              onDecSort={this.handleDecSort}
              onLike={this.handeleLike}
              data={this.state}
              onDelete={this.handleDelete}
            />         
            <Pagination 
            itemCount={count} 
            pageSize={pageSize} 
            currentPage={currentPage}
            onPageChange={this.handelPageChange} />
          </div>

        </div>
      </div>
    );
  }

}


export default HomeVid;
