import React from 'react';
import { paginate } from '../../utils/paginate';
import LikeCount from './Likes';

const Table = (props) => {
    const { onDelete, onLike, onSort, onDecSort } = props
    const { sortBy, isSorted, filteredMovie, currentPage,  pageSize} = props.data;
      const filtered = paginate(filteredMovie, currentPage, pageSize);
    const Headers = [{ title: "Title", value: 'title' }, { title: 'Genre', value: 'genre' },
    { title: "Stock", value: 'numberInStock' }, { title: "Rate", value: 'dailyRentalRate' }];
  
    return (
      <React.Fragment>
        {!filteredMovie.length ? (
          <div className="text-center p-4">
            <i className="fas fa-film fa-5x" />
            <h6>No Movies</h6>
          </div>
        ) : (
            <table className="table">
              <thead>
                <tr>
                  {Headers.map((header, index) => (
                    <th key={index} onClick={() => { !isSorted ? onSort(header.value) : onDecSort(header.value) }} scope="col">
                      {header.title} <span className={!isSorted && header.value === sortBy ? 'fas fa-arrow-up' : 'fas fa-arrow-down'}></span>
                    </th>
                  ))}
  
                  <th />
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(movie => (
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
                        onClick={() => onDelete(movie._id)}
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

  export default Table;