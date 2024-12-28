import React from "react";
import CelebrityCards from "./CelebrityCards";
import { data } from "../Utilities/celebrities";
import "./common.scss";

function Celebrity(props) {
  return (
    <div className="celebrity">
      <div className="search_me">
        <i class="bi bi-search"></i>
        <input type="text" placeholder="Search User" className="search_user" />
      </div>
      <CelebrityCards list={data.list} />
    </div>
  );
}

export default Celebrity;
