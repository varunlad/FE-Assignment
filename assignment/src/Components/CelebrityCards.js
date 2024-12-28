import React from "react";

function CelebrityCards(props) {
  console.log("props list === ", props.list);
  return (
    <div className="main_Card_container">
      <div className="my_card">
        <div className="my_card_head">
          <div className="sec_1">
            <img
              src="https://randomuser.me/api/portraits/med/women/48.jpg"
              alt="profile"
              loading="lazy"
            />
            <h3>John Doe</h3>
          </div>
          <div>
            <i class="bi bi-chevron-down"></i>
            <i class="bi bi-chevron-up"></i>
          </div>
        </div>
        <div className="content_sec_1 ">
          <div className="sec_1_content">
            <p>Age</p>
            <p className="value">16 Years</p>
          </div>
          <div className="sec_1_content">
            <p>Gender</p>
            <p className="value">Rather not say</p>
          </div>
          <div className="sec_1_content">
            <p>Country</p>
            <p className="value">India</p>
          </div>
        </div>
        <div className="content_sec_1">
          <div className="d-flex flex-column">
            <p>Description</p>
            <p className="value">
              This character description generator will generate a fairly random
              description of a belonging to Anna Horten. However, some aspects
              of the descriptions will remain the same, this is done to keep the
              general structure the same, while still randomizing the important
              details of Anna Horten.
            </p>
          </div>
        </div>
        <div className="edit_delete">
          <i class="bi bi-trash3  mx-4"></i>
          <i class="bi bi-pencil"></i>
        </div>
      </div>
    </div>
  );
}

export default CelebrityCards;
