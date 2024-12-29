import React, { useEffect, useState } from "react";

function CelebrityCards(props) {
  const [cardData, setCardData] = useState([]);
  const [cardDataTemp, setCardDataTemp] = useState([]);
  const [cardOpenInd, setCardOpenInd] = useState(-1);
  const [openDelete, setOpenDelete] = useState(-1);
  const [editData, setEditData] = useState(null);
  const [editOpenInd, setEditOpenInd] = useState(-1);

  useEffect(() => {
    setCardData(props.list);
    setCardDataTemp(props.list);
  }, []);

  useEffect(() => {
    const search = props.search.toUpperCase();
    const filterData = cardDataTemp.filter((item) => {
      return (
        (item.first + " " + item.last).toUpperCase().indexOf(search) !== -1
      );
    });
    setCardData(filterData);
  }, [props.search]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
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
    setOpenDelete(-1);
    setEditOpenInd(-1);
  };

  const handelOpenDelete = (index) => {
    setOpenDelete(openDelete === index ? -1 : index);
  };

  const handelDelete = (id) => {
    const updatedList = cardData.filter((item) => item.id !== id);
    setCardData(updatedList);
    setCardDataTemp(updatedList);
    setCardOpenInd(-1);
    setOpenDelete(-1);
    setEditOpenInd(-1);
  };

  const handelOpenEdit = (element, index) => {
    setEditData(element);
    setEditOpenInd(editOpenInd === index ? -1 : index);
  };

  const handelEdit = () => {
    const updatedData = cardData.map((item) =>
      item.id === editData.id ? { ...item, ...editData } : item
    );
    setCardData(updatedData);
    setCardDataTemp(updatedData);
    setOpenDelete(-1);
    setEditOpenInd(-1);
  };
  const handelAgeCalc = (age) =>{
    const ageTodate = calculateNewDob(age, editData.dob)
    setEditData((prevData) => ({
      ...prevData,
      dob: ageTodate,
    }))
  }
  const calculateNewDob = (updatedAge, originalDob) => {
    const today = new Date();
    const originalDate = new Date(originalDob);
    const newYear = today.getFullYear() - updatedAge;

    return new Date(newYear, originalDate.getMonth(), originalDate.getDate())
      .toISOString()
      .split("T")[0]; 
  };
  return (
    <div className="main_Card_container">
      {cardData?.length > 0 ? (
        cardData?.map((ele, ind) => (
          <div key={ind} className="my_card">
            <div className="my_card_head">
              <div className="sec_1">
                <img src={ele.picture} alt="profile" loading="lazy" />
                {editOpenInd === ind ? (
                  <input
                    className="head_edit"
                    type="text"
                    defaultValue={editData.first + " " + editData.last}
                    onChange={(e) => {
                      const [first, last] = e.target.value.split(" ");
                      setEditData((prevData) => ({
                        ...prevData,
                        first: first || prevData.first,
                        last: last || prevData.last,
                      }));
                    }}
                  />
                ) : (
                  <h3>{ele.first + " " + ele.last}</h3>
                )}
              </div>
              <div
                onClick={() => {
                  handelCardOpen(ind);
                }}
              >
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
                      {editOpenInd === ind ? (
                        <div className="outer_age">
                        <input
                          type="number"
                          defaultValue={calculateAge(editData.dob)}
                          onChange={(e) => handelAgeCalc(e.target.value)}
                        />
                        <label>Years</label>
                        </div>
                      ) : (
                        <p className="value">{calculateAge(ele.dob)} Years</p>
                      )}
                    </div>
                  <div className="sec_1_content">
                    <p>Gender</p>
                    {editOpenInd === ind ? (
                      <select
                        value={editData.gender}
                        onChange={(e) =>
                          setEditData((prevData) => ({
                            ...prevData,
                            gender: e.target.value,
                          }))
                        }
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Rather not say">
                          Rather not say
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="value">{ele.gender}</p>
                    )}
                  </div>
                  <div className="sec_1_content">
                    <p>Country</p>
                    {editOpenInd === ind ? (
                      <input
                        type="text"
                        value={editData.country}
                        onChange={(e) =>
                          setEditData((prevData) => ({
                            ...prevData,
                            country: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="value">{ele.country}</p>
                    )}
                  </div>
                </div>
                <div className="content_sec_1">
                  <div className="d-flex flex-column">
                    <p>Description</p>
                    {editOpenInd === ind ? (
                      <textarea
                        className="my_textArea"
                        value={editData.description}
                        rows={5}
                        cols={60}
                        onChange={(e) =>
                          setEditData((prevData) => ({
                            ...prevData,
                            description: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="value">{ele.description}</p>
                    )}
                  </div>
                </div>
                <div className="edit_delete">
                  <div className="delete_me">
                    {openDelete === ind && (
                      <div className="delete_Popup">
                        <div className="d-flex justify-content-between">
                          <p>Are you sure you want to delete?</p>
                          <i
                            onClick={() => {
                              setOpenDelete(-1);
                            }}
                            className="bi bi-x-lg"
                          ></i>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button
                            onClick={() => {
                              setOpenDelete(-1);
                            }}
                            className="mx-2 cancel"
                          >
                            Cancel
                          </button>
                          <button onClick={() => handelDelete(ele.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                    {editOpenInd === ind ? (
                      <i
                        onClick={() => {
                          setEditOpenInd(-1);
                        }}
                        className="bi bi-x-circle mx-4"
                      ></i>
                    ) : (
                      <i
                        onClick={() => handelOpenDelete(ind)}
                        className="bi bi-trash3  mx-4"
                      ></i>
                    )}
                  </div>
                  {editOpenInd === ind ? (
                    <i
                      onClick={handelEdit}
                      className="bi bi-check-circle"
                    ></i>
                  ) : (
                    <i
                      onClick={() => handelOpenEdit(ele, ind)}
                      className="bi bi-pencil"
                    ></i>
                  )}
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No data found !!!</p>
      )}
    </div>
  );
}

export default CelebrityCards;
