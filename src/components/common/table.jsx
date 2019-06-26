import React from "react";
import LikeCount from "./Likes";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { Link } from "react-router-dom";
const Table = props => {
  const { onDelete, onLike, onSort, filtered, sortColumn } = props;

  const columns = [
    {
      title: "Title",
      value: "title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { title: "Genre", value: "genre.name" },
    { title: "Stock", value: "numberInStock" },
    { title: "Rate", value: "dailyRentalRate" },
    {
      key: "like",
      content: movie => (
        <LikeCount movie={movie} liked={movie.liked} onLike={onLike} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => onDelete(movie._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];
  return (
    <React.Fragment>
      {!filtered.length ? (
        <div className="text-center p-4">
          <i className="fas fa-film fa-5x" />
          <h6>No Movies</h6>
        </div>
      ) : (
        <table className="table">
          <TableHeader
            columns={columns}
            onSort={onSort}
            sortColumn={sortColumn}
          />
          <TableBody columns={columns} data={filtered} />
        </table>
      )}
    </React.Fragment>
  );
};

export default Table;
