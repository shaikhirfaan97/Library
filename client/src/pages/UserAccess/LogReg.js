import React, { useState } from 'react'
import LoginForm from '../../components/loginform/LoginForm'
import RegisterForm from '../../components/regform/RegisterForm'
import StartNav from '../../components/startnav/StartNav'
import '../UserAccess/Logreg.css'

const LogReg = () => {
  const[isRegActive, setRegActive] = useState(false);
  const[isLogActive, setLogActive] = useState(true);
  const[defaultStyleReg, setBtnStyleReg] = useState("default-style")
  const[defaultStyleLogin, setBtnStyleLogin] = useState("active-btn")
  
  function handleRegistration(){
    setRegActive(true);
    setLogActive(false);
    setBtnStyleReg("active-btn")
    setBtnStyleLogin("default-style")
  }

  function handleLogin(){

    setLogActive(true);
    setRegActive(false);
    setBtnStyleLogin("active-btn")
    setBtnStyleReg("default-style")
  }


  return (
    <div>
      <StartNav/>
 

    <div className='access-content'>

    <div className='access-btn'>
        <button onClick={handleRegistration} className={defaultStyleReg}>STUDENT Signup</button>
        <button onClick={handleLogin} className={defaultStyleLogin}>STUDENT LOGIN</button>
      </div>

      <div className='forms'>
        {
          isRegActive ? <RegisterForm/> : null
        }
        {
          isLogActive ?   <LoginForm/> : null
        }
      
      </div>
    </div>
    
    </div>
  )
}

export default LogReg
