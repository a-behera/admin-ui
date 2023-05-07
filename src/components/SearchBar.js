import React,{useState} from "react";
import "./SearchBar.css";

const SearchBar = ({users, setUsers}) => {
  const [input, setInput] = useState("");

  const filterData = (value) => {
    const result = users.filter((user) => {
      return value && user && user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value) || user.role.toLowerCase().includes(value)
    })

    setUsers(result)
  }

  const onInputChange = (value) => {
    setInput(value)
    filterData(value)
    
  }

  const inputChangeHandler = (event) => {
    onInputChange(event.target.value)
  }

  return (
    <>
      <input
        type="text"
        className="search-bar"
        placeholder="Search by name, email or role"
        value={input}
        onChange={inputChangeHandler}
      />
    </>
  );
};

export default SearchBar;
