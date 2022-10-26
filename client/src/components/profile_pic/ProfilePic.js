import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import '../profile_pic/ProfilePic.css'
import {Buffer} from 'buffer';
import axios from 'axios'

const ProfilePic = () => {
    const fetchUser = JSON.parse(localStorage.getItem("user"));
    const userid = fetchUser.user._id;
    const {user} = useAuthContext();
    const [userProfilePic, setUserProfilePic] = useState(); // post
    const [newProfilePic, setNewProfilePic] = useState({}); // post

    const [error, setError] = useState(null);
    // console.log(fetchUser.user.testImage.data.data);

    //------------------------- get image function --------------------------------
    const getImageData = async () => {
      await axios
        .get(`http://localhost:4500/api/user/login/upload/${userid}`)
        .then((res) => {
          const userPhoto = res.data.testImage;
          const bufferString = `data:${userPhoto.contentType};base64, ${Buffer.from(userPhoto.data).toString("base64")}`;
          setNewProfilePic(bufferString);
          // localStorage.setItem("testImage", JSON.stringify(bufferString));
          console.table(bufferString)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // ----------UPLOAD ---------------
    const uploadImage = (e) => {
      setUserProfilePic(e.target.files[0]);
    };

    const headConfig = {
      "Content-type": "multipart/form-data",
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!user) {
        setError("You need to be logged in to see this page!");
        return;
      }

      const formData = new FormData();
      formData.append("photo", userProfilePic);

      axios
        .patch(
          `http://localhost:4500/api/user/login/upload/${userid}`,
          formData,
          headConfig
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

  // ----------------------- GET IMAGE -----------------------------

useEffect(() =>{
  getImageData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[])


  return (
    <div className='image-container'>
      <div className="user-image">
        <img src={newProfilePic} alt="profile pic" />
       
      </div>
      {error && <div className='img-error'>{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="photo"
          onChange={uploadImage}
        />

        <input className="img-btn" type="submit" />
      </form>
    </div>
  );
}

export default ProfilePic
