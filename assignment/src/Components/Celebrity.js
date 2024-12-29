import React, { useEffect, useState } from "react";
import CelebrityCards from "./CelebrityCards";
import { data } from "../Utilities/celebrities";
import "./common.scss";

function Celebrity(props) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(' ');

  // Debounce logic: Update `debouncedSearch` after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler); // Clear timeout on component unmount or before a new timeout is set
    };
  }, [search]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <div className="celebrity mt-2">
      <div className="search_me">
        <i className="bi bi-search"></i>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search User"
          className="search_user"
        />
      </div>
      <CelebrityCards list={data.list} search={debouncedSearch} />
    </div>
  );
}

export default Celebrity;
