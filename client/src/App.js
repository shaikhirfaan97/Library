import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import BookHistory from './pages/BookHistory/BookHistory';
import Books from './pages/BookSection/Books';

import Home from './pages/Home/Home';
import LogReg from './pages/UserAccess/LogReg';

function App() {
  const {user} = useAuthContext();

  const [loggedIn, setLoggedIn] = useState(null);

useEffect(() => {
  const loggedUser = localStorage.getItem('user');
  setLoggedIn(Boolean(loggedUser));
  }, []);
  
  return (
    <div className="App">
        { loggedIn !== null &&
        <Router>
          <Routes>
            <Route path='/' element={user ? <Home/> : <Navigate to="/login" />}/>
            <Route path='login' element={!user ? <LogReg/> : <Navigate to="/" />}/>
            <Route path='books' element={user ? <Books/> : <Navigate to="/login"/>}/>
            <Route path='history' element={user ? <BookHistory/> : <Navigate to="/login"/>}/>
       
          </Routes>
        </Router>
}
    </div>
  );
}

export default App;
