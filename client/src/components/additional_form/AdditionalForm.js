import React, { useState } from "react";
import { useEffect } from "react";
import "../additional_form/AdditionalForm.css";
import axios from "axios";

const AdditionalForm = () => {
  const fetchUser = JSON.parse(localStorage.getItem("user"));
  const userid = fetchUser.user._id;
  
  const [readInput, setReadInput] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [extraDetails, setExtraDetails] = useState("");

  const getExtraDetails = async () => {
       await axios
      .get(`http://localhost:4500/api/user/login/${userid}`)
      .then((res) =>{
        setExtraDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  useEffect(() => {

    getExtraDetails();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------UPDATE INFO --------------
  const [newDetails, setNewDetails] = useState({
    _id: null,
    admission:"",
    gender:"",
    bloodGroup:"",
    emergencyContact:"",
    address:""
  });

  // console.log(newDetails);

  const sendNewDetails = (e) => {
    const { name, value } = e.target;
    setNewDetails({
      ...newDetails,
      [name]: value,
    });
    setExtraDetails(e.target.value)
  };
  // Handling of form input state
  const handleSubmit = () => {

    setTimeout(() => {
      setReadInput(true);
      setIsDisabled(true)
    }, 200);
  };

  const handleUpdate = () => {
    if (readInput === true) {
      setReadInput(false);
    }
    setIsDisabled(false)
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    await axios
      .patch(`http://localhost:4500/api/user/login/${userid}`, newDetails)
      .then((res) => {
        console.log(res.data.message);
        console.log(newDetails);
      });

    getExtraDetails();
    // console.log(newDetails)
  };

  return (
    <div className="update-user-form">
      <h2 className="add-head">Addition Information</h2>
      <form action="" className="extra-form-data" onSubmit={formSubmit}>
        <input
          type="text"
          name="admission"
          placeholder="Admission"
          value={extraDetails.admission || newDetails.admission}
          onChange={sendNewDetails}
          readOnly={readInput}
        />
        <br />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={extraDetails.gender || newDetails.gender}
          onChange={sendNewDetails}
          readOnly={readInput}
        />
        <br />

        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={extraDetails.bloodGroup || newDetails.bloodGroup}
          onChange={sendNewDetails}
          readOnly={readInput}
        />
        <br />
        <input
          type="number"
          name="emergencyContact"
          placeholder="Emergency Contact No"
          value={extraDetails.emergencyContact || newDetails.emergencyContact}
          onChange={sendNewDetails}
          readOnly={readInput}
        />
        <br />
        <textarea
          type="address"
          name="address"
          rows="3"
          placeholder="Student Address"
          value={extraDetails.address || newDetails.address}
          onChange={sendNewDetails}
          readOnly={readInput}
        ></textarea>
        <br />

        <div className="update-btn">
          <button className="form-btn" type="" onClick={handleUpdate}>
            EDIT
          </button>
          <button className="form-btn" type="submit" disabled={isDisabled} onClick={handleSubmit}>
            SAVE
          </button>
        </div>
      </form>
      <div className="extra-form--error"></div>
    </div>
  );
};

export default AdditionalForm;
