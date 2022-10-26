import React from 'react'
import '../navbar/Navbar.css'
import { Link } from "react-router-dom";
import { useLogout } from '../../hooks/useLogout';


const Navbar = () => {

  
  const {logout} = useLogout();
  // const {user} = useAuthContext();

  const handleClick = () => {

    logout();
  }

  return (
    <nav>
      <Link to="/"><h1>Library</h1></Link>
      <div className='nav-links'>
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/history">History</Link>
        <div>
          
          {/* <span>{user.email}</span> */}
         <Link to="/login" onClick={handleClick}>Log Out</Link>
 
        </div>
      </div>
    </nav>
  )
}

export default Navbar
