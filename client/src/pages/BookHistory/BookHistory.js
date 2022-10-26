import React, { useEffect } from 'react'
import BookHistoryDetails from '../../components/bookHistoryComp/BookHistoryDetails';
import Navbar from '../../components/navbar/Navbar'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useBookContext } from '../../hooks/useBookContext';
import '../BookHistory/BookHistory.css'


const BookHistory = () => {

  
  const {books, dispatch} = useBookContext();
  const {user} = useAuthContext();
  // const {user, dispatch: userDispatch} = useAuthContext();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/history', {
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_BOOKS', payload: json})
      }
    }

    if(user){

      fetchBooks()
      // fetchuser()
    }

   
  }, [dispatch, user])



  return (
    <div>
      <Navbar/>

    <div className='history-title-container'>
      <div className='history-title'>
        <h2>Book Name</h2>
        <h2>Book Author</h2>
        <h2>Issue Date</h2>
      </div>
    </div>
      
      <div className='book-history-template'>
        {books && books.map((book) =>(

          <BookHistoryDetails book={book} key={book._id}/>
        ))

        }
      </div>
    </div>
  )
}

export default BookHistory
