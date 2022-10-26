import React from "react";
import ProfilePic from "../profile_pic/ProfilePic";
import '../student/Student.css'


const Student = () => {
  const fetchUser = JSON.parse(localStorage.getItem('user'));
  const userData = fetchUser.user;

  return (

    <div className="main-info">
    
        <ProfilePic/>

        <h4>Full Name : <span>{userData.userName}</span></h4>
        <h4>Email : <span>{userData.email}</span></h4>
        <h4>Student ID : <span>{userData.studentID}</span></h4>
        <h4>Contact No : <span>{userData.contactNum}</span></h4>
        <h4>Department : <span>{userData.department}</span></h4>
        <h4>Year : <span>{userData.year}</span></h4>
        </div>
  );
};

export default Student;
