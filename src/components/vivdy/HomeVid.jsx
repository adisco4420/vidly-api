import React, { Component } from "react";
import { getMovies, deleteMovie } from "../../services/fakeMovieService";
import FilterTable from "../common/filterTable";
import Pagination from "../common/pagination";
import Table from "../common/table";
import { paginate } from "../../utils/paginate";
import _ from 'lodash'

class HomeVid extends Component {
  state = {
    allMovies: getMovies(),
    filteredMovie: getMovies(),
    pageSize: 4,
    filterBy: 'allgenre',
    sortColumn: { path: "title", order: "asc" },
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
  handleSort = sortColumn =>  this.setState({ sortColumn })

  render() {
    const { filteredMovie } = this.state;
    const count = filteredMovie.length;
    const {pageSize , currentPage, sortColumn} = this.state;
    const sorted = _.orderBy(
      filteredMovie,
      [sortColumn.path],
      [sortColumn.order]
    );
    const filtered = paginate(sorted, currentPage, pageSize);
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
              onLike={this.handeleLike}
              filtered={filtered}
              sortColumn={sortColumn}
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
