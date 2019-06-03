import React from "react";
const allGenres = ["Action", "Comedy", "Thriller"];

const FilterTable = ({ onFilter, filterBy }) => {
  return (
    <ul className="list-group">
      <li onClick={() => onFilter("allgenre")}  className={`list-group-item ${filterBy === 'allgenre' ? "active" : ""}`}>
        All Genres
      </li>
      {allGenres.map((genre, index) => (
        <li
          key={index}
          onClick={() => onFilter(genre)}
          className={`list-group-item ${filterBy === genre ? "active" : ""}`}
        >
          {genre}
        </li>
      ))}
    </ul>
  );
};

export default FilterTable;
