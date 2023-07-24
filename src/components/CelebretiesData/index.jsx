import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import celebrities from "../../data/celebrities.json";
import "./style.css";
import Confirmation from "../Confirmation";
import SearchBar from "../SearchBar/SearchBar";

const CelebretiesData = () => {
  const [confirm, setConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [buttonhide, setButtonhide] = useState(false);
  const [isShow, setIsShow] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [queryCelebrities, setQueryCelebrities] = useState("");
  const [celebritiesList, setCelebritiesList] = useState([]);
  const [newdata, setNewdata] = useState(celebritiesList[editIndex]);

  useEffect(() => {
    celebrities && setCelebritiesList(celebrities);
  }, []);

  const openAccordian = (i) => {
    setIsShow((prev) => (prev === i ? null : i));
  };

  const handleDelete = () => {
    setConfirm(true);
  };

  const handleCancel = () => {
    console.log("cancelled");
    setConfirm(false);
  };

  const deleteCelebrity = (id, i) => {
    console.log("delete data", id, i);
    setCelebritiesList(celebritiesList.filter((delId) => delId.id !== id));
    setConfirm(false);
  };
  const ageCoverter = (date) => {
    let dob = new Date(date);
    let monthDeff = Date.now() - dob.getTime();
    let ageDate = new Date(monthDeff);
    let year = ageDate.getUTCFullYear();
    var age = Math.abs(year - 1970);
    return age;
  };

  const handlchange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "country") {
      if (e.target.value === "number") {
        console.log("true");
      }
    }
    setNewdata({ ...newdata, [name]: [value] });
    setButtonhide(true);
  };

  const handleEdit = (index) => {
    setNewdata(celebritiesList[index]);
    setEditIndex(index);
    setIsEdit(false);
  };

  const handleSave = (e) => {
    if (newdata.first.length === 0) {
      alert("You can not keep the blank");
      setIsEdit(false);
    } else {
      setIsEdit(true);
      setButtonhide(false);
    }
    if (newdata.country.length === 0) {
      alert("You can not keep the blank");
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }

    celebritiesList.splice(editIndex, 1, newdata);
  };

  const searchChangeHandle = (e) => {
    setQueryCelebrities(e.target.value);
  };

  const checkType = (data) => {
    if (isNaN(data)) {
      return data;
    } else {
      return "";
    }
  };
  return (
    <div className="container">
      <div>
       <SearchBar/>
        {celebritiesList
          .filter((user) => user.first.toLowerCase().includes(queryCelebrities))
          .map((data, i) => (
            <div className="accordian " key={data.id} >
              <div className="celebrity-detail" onClick={() => openAccordian(i)}>
                <div className="celebrity" >
                  <img
                    src={data.picture}
                    alt={data.picture}
                    className="celebrity-picture"
                  />
                  {isEdit ? (
                    <p>{data.first + " " + data.last}</p>
                  ) : editIndex !== i ? (
                    <p>{data.first + " " + data.last}</p>
                  ) : (
                    <div className="InputNameFiled">
                      <input
                        name="first"
                        type="text"
                        className="edit_Name"
                        value={newdata.first}
                        onChange={handlchange}
                      />
                      <input
                        name="last"
                        type="text"
                        className="edit_Name"
                        value={newdata.last}
                        onChange={handlchange}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <span className="plus-minus" onClick={() => openAccordian(i)}>
                  {isShow !== i ? "+" : "-"}
                  </span>
                </div>
              </div>
              {i === isShow && (
                <div>
                  <div className="celebrities-dob-gen-country">
                    <div>
                      <p>Age</p>
                      {isEdit ? (
                        <p>{ageCoverter(data.dob)}</p>
                      ) : editIndex !== i ? (
                        <p>{ageCoverter(data.dob)}</p>
                      ) : (
                        <input
                          name="dob"
                          type="date"
                          className="edit_age"
                          value={newdata.dob || ageCoverter(data.dob)}
                          onChange={handlchange}
                        />
                      )}
                    </div>
                    <div>
                      <p> Gender</p>
                      {isEdit ? (
                        <p className="gendar">{data.gender}</p>
                      ) : editIndex !== i ? (
                        <p className="gendar">{data.gender}</p>
                      ) : (
                        <select
                          name="gender"
                          value={newdata.gender}
                          className="edit_gendar"
                          onChange={handlchange}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                          <option value="Rather Not Say">Rather Not Say</option>
                        </select>
                      )}
                    </div>

                    <div>
                      <p>Counter</p>

                      {isEdit ? (
                        <p>{data.country}</p>
                      ) : editIndex !== i ? (
                        <p>{data.country}</p>
                      ) : (
                        <input
                          type="text"
                          name="country"
                          className="edit_country"
                          value={checkType(newdata.country)}
                          onChange={handlchange}
                        />
                      )}
                    </div>
                  </div>
                  <div className="description">
                    <p>Description</p>
                    {isEdit ? (
                      <p>{data.description}</p>
                    ) : editIndex !== i ? (
                      <p>{data.description}</p>
                    ) : (
                      <textarea
                        rows="9"
                        cols="53"
                        name="description"
                        className="edit_description"
                        value={newdata.description}
                        onChange={handlchange}
                      ></textarea>
                    )}
                  </div>
                  {isEdit ? (
                    <div>
                      <div className="icons">
                        <RiDeleteBin6Line
                          className="delete"
                          onClick={handleDelete}
                        />
                        <MdOutlineEdit
                          className="edit"
                          onClick={() => handleEdit(i)}
                        />
                      </div>
                      <div>
                        {confirm && (
                          <Confirmation
                            onCancled={handleCancel}
                            onDelete={() => deleteCelebrity(data.id, i)}
                          />
                        )}
                      </div>
                    </div>
                  ) : editIndex !== i ? (
                    <div>
                      <div className="icons">
                        <RiDeleteBin6Line
                          className="delete"
                          onClick={handleDelete}
                        />
                        <MdOutlineEdit
                          className="edit"
                          onClick={() => handleEdit(i)}
                        />
                      </div>
                      <div>
                        {confirm && (
                          <Confirmation
                            onCancled={handleCancel}
                            onDelete={() => deleteCelebrity(data.id, i)}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => setIsEdit(true)}>cancel</button>
                      {buttonhide && <button onClick={handleSave}>save</button>}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CelebretiesData;
