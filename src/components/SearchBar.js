import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <>
      <input
        type="text"
        className="search-bar"
        placeholder="Search by name, email or role"
      />
    </>
  );
};

export default SearchBar;
