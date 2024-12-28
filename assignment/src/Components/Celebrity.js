import React, { useEffect, useState } from "react";
import CelebrityCards from "./CelebrityCards";
import { data } from "../Utilities/celebrities";
import "./common.scss";

function Celebrity(props) {
  return (
    <div className="celebrity mt-2">
      <div className="search_me">
        <i className="bi bi-search"></i>
        <input type="text" placeholder="Search User" className="search_user" />
      </div>
      <CelebrityCards list={data.list} />
    </div>
  );
}

export default Celebrity;
