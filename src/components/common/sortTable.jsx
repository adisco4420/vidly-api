import React from "react";
const allGenres = ["Action", "Comedy", "Thriller"];

const SortTable = ({ onSort, filterBy }) => {
  return (
    <ul className="list-group">
      <li onClick={() => onSort("allgenre")}  className={`list-group-item ${filterBy === 'allgenre' ? "active" : ""}`}>
        All Genres
      </li>
      {allGenres.map((genre, index) => (
        <li
          key={index}
          onClick={() => onSort(genre)}
          className={`list-group-item ${filterBy === genre ? "active" : ""}`}
        >
          {genre}
        </li>
      ))}
    </ul>
  );
};

export default SortTable;
