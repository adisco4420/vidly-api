import React, { Component } from "react";
// import { getMovies, deleteMovie } from "../../services/fakeMovieService";
import { allGenres, allMovies, deleteMovie } from '../../services/vivdly-backend';
import FilterTable from "../common/filterTable";
import Pagination from "../common/pagination";
import Table from "../common/table";
import { paginate } from "../../utils/paginate";
import _ from 'lodash'

import { Link } from 'react-router-dom';

class HomeVid extends Component {  
  state = {
    allMovies: [],
    filteredMovie: [],
    pageSize: 4,
    filterBy: 'allgenre',
    searchBy: '',
    sortColumn: { path: "title", order: "asc" },
    currentPage:  1,
    genres: null
  };
  getGenres = async () => {
    const genres = await allGenres();
    this.setState({genres})
  }
  getMovie = async () => {
    const movies = await allMovies();
    this.setState({allMovies: movies, filteredMovie: movies})
  }
  componentDidMount() {
    this.getGenres();
    this.getMovie();
  }
  handleDelete = async id => {
    await deleteMovie(id)
    this.getMovie();
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
      movies = this.state.allMovies.filter(movie => movie.genre._id === genre);      
    }
    this.setState({ filteredMovie: movies, filterBy: genre , searchBy: ''});
  };
  handleSearch = e => {
    let { value } = e.target;
    value = value.toLowerCase();
    const movies = this.state.allMovies.filter(val => val.title.toLowerCase().includes(value) || 
    val.genre.name.toLowerCase().includes(value) || val.dailyRentalRate.toString().toLowerCase().includes(value)
    || val.numberInStock.toString().toLowerCase().includes(value))
    this.setState({filteredMovie: movies, filterBy: 'allgenre', searchBy: value})
  }
  handleSort = sortColumn =>  this.setState({ sortColumn })

  render() {
    const { filteredMovie, searchBy, genres } = this.state;
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
            <FilterTable allGenres={genres} filterBy={this.state.filterBy} onFilter={this.handleFilter} />
          </div>
          <div className="col-md-8">
            <div className="row m-3">
              <div className="col-md-12 mb-2">
                <Link to="/movies/new" className="btn btn-primary">New Movie</Link>
              </div>
              <div className="col-md-6"> <p>Showing {count} movies in the database</p></div>
              <div className="col-md-6 float-right">
                <input value={searchBy} type="search" onChange={this.handleSearch} className="form-control" placeholder="search"/>
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
