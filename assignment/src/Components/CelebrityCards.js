import React, { useEffect, useState } from "react";

function CelebrityCards(props) {
  const [cardData, setCardData] = useState([]);
  const [cardOpenInd, setCardOpenInd] = useState(-1);

  useEffect(() => {
    setCardData(props.list);
  }, []);

  const calculateAge = (dob) => {
    // Parse the date of birth string into a Date object
    const birthDate = new Date(dob);

    // Get today's date
    const today = new Date();

    // Calculate the age
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust if the birth date hasn't occurred yet this year
    const hasNotHadBirthday =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate());

    if (hasNotHadBirthday) {
      age--;
    }

    return age;
  };
  const handelCardOpen = (id) => {
    setCardOpenInd(cardOpenInd === id ? -1 : id);
  };
  return (
    <div className="main_Card_container">
      {cardData?.map((ele, ind) => {
        return (
          <div key={ind} className="my_card">
            <div
              className="my_card_head"
              onClick={() => {
                handelCardOpen(ind);
              }}
            >
              <div className="sec_1">
                <img src={ele.picture} alt="profile" loading="lazy" />
                <h3>{ele.first + " " + ele.last}</h3>
              </div>
              <div>
                {cardOpenInd === ind ? (
                  <i className="bi bi-chevron-up"></i>
                ) : (
                  <i className="bi bi-chevron-down"></i>
                )}
              </div>
            </div>
            {cardOpenInd === ind && (
              <>
                <div className="content_sec_1 ">
                  <div className="sec_1_content">
                    <p>Age</p>
                    <p className="value">{calculateAge(ele.dob)} Years</p>
                  </div>
                  <div className="sec_1_content">
                    <p>Gender</p>
                    <p className="value">{ele.gender}</p>
                  </div>
                  <div className="sec_1_content">
                    <p>Country</p>
                    <p className="value">{ele.country}</p>
                  </div>
                </div>
                <div className="content_sec_1">
                  <div className="d-flex flex-column">
                    <p>Description</p>
                    <p className="value">{ele.description}</p>
                  </div>
                </div>
                <div className="edit_delete">
                  <i className="bi bi-trash3  mx-4"></i>
                  <i className="bi bi-pencil"></i>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CelebrityCards;
