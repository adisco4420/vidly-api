import React from "react";
const allGenres = ["Action", "Comedy", "Thriller"];

const FilterTable = ({ onFilter, filterBy, allGenres: genre }) => {
  return (
    <ul className="list-group">
      {!genre && <li>loading...</li>}
      {genre && <li onClick={() => onFilter("allgenre")}  className={`list-group-item ${filterBy === 'allgenre' ? "active" : ""}`}>
        All Genres
      </li>}
      {genre && genre.map((genre, index) => (
       
       <li
          key={index}
          onClick={() => onFilter(genre._id)}
          className={`list-group-item ${filterBy === genre._id ? "active" : ""}`}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default FilterTable;
